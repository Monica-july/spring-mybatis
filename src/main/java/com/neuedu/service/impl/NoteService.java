package com.neuedu.service.impl;

import com.neuedu.common.JsonResponse;
import com.neuedu.dao.NoteMapper;
import com.neuedu.entity.NoteFo;
import com.neuedu.entity.NoteVo;
import com.neuedu.entity.UserVo;
import com.neuedu.service.inter.INoteService;
import com.neuedu.util.StringUtil;
import org.apache.poi.EmptyFileException;
import org.apache.poi.POIXMLDocument;
import org.apache.poi.POIXMLTextExtractor;
import org.apache.poi.hwpf.extractor.WordExtractor;
import org.apache.poi.openxml4j.exceptions.OpenXML4JException;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.xmlbeans.XmlException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.lang.reflect.Field;
import java.util.*;

@Service
public class NoteService implements INoteService{

    @Autowired
    private NoteMapper noteMapper;

    /**
     * 左侧加载
     * */
    public JsonResponse getRootKids(String userId) {
        JsonResponse jsonResponse = new JsonResponse();
        List<NoteVo> notes = noteMapper.getRootKids(userId);
        jsonResponse.setData(notes);
        jsonResponse.setStatus("1");
        return jsonResponse;
    }

    /**
     * 新建
     * */
    public JsonResponse createNote(NoteFo fo) {
        JsonResponse jsonResponse = new JsonResponse();
        NoteVo note = new NoteVo();
        try {
            note.setNoteName(new String(fo.getNoteName().getBytes("utf-8"),"ISO-8859-1"));
            note.setNoteType(fo.getNoteType());
            note.setUserId(fo.getUserId());
            note.setNoteStatus("1");
            note.setNoteCreateTime(StringUtil.getNow());
            note.setNoteModifyTime(StringUtil.getNow());
            note.setNoteRoot("0");
            String noteid = fo.getNoteParent();
            //如果父节点为空  则默认创建根节点下的文件
            if (StringUtil.isEmpty(fo.getNoteParent())){
                noteid = noteMapper.getRootNoteId(note.getUserId());
            }
            int idindex = 0;
            for (int i=0 ; i<noteid.length() ; i=i+3){
                if (noteid.substring(i,i+3).equals("000")){
                    noteid = noteid.substring(0,i)+"___";
                    for(int j=0 ; j<18-i-3 ; j=j+3){
                        noteid = noteid+"000";
                    }
                    idindex = i;
                    break;
                }
            }
            //查询父节点下的最大值
            String max = noteMapper.getMaxNoteId(note.getUserId(),noteid);
            String id = String.valueOf(Integer.valueOf(max.substring(idindex,idindex+3))+1);
            String a1 = max.substring(0,idindex);
            String a2 = max.substring(idindex+3,max.length());
            if (id.length()==1){
                id = "00"+id;
            }else if (id.length()==2){
                id = "0"+id;
            }
            max = a1+ id + a2;
            note.setNoteId(max);
            //创建文件、文件夹
            noteMapper.createNote(note);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        jsonResponse.setMsg("创建成功");
        jsonResponse.setStatus("1");
        jsonResponse.setData(note);
        return jsonResponse;
    }

    /**
     * 最近文档
     * */
    public JsonResponse getNotes(String userid) {
        JsonResponse jsonResponse = new JsonResponse();
        List<NoteVo> notes = noteMapper.getNotes(userid);
        jsonResponse.setStatus("1");
        jsonResponse.setMsg("查询成功");
        jsonResponse.setData(notes);
        return jsonResponse;
    }

    /**
     * 最近打开的一篇文档
     * */
    public JsonResponse getContent(String userid){
        JsonResponse jsonResponse = new JsonResponse();
        NoteVo note = noteMapper.getContent(userid);
        jsonResponse.setStatus("1");
        jsonResponse.setMsg("查询成功");
        jsonResponse.setData(note);
        return jsonResponse;
    }

    /**
     * 重命名
     * */
    public JsonResponse reName(NoteFo fo) {
        JsonResponse jsonResponse = new JsonResponse();
        noteMapper.reName(fo.getNoteId(),fo.getNoteName());
        jsonResponse.setStatus("1");
        jsonResponse.setMsg("修改成功");
        return jsonResponse;
    }

    /**
     * 加载下一层
     * */
    public JsonResponse getTree(NoteFo fo){
        JsonResponse jsonResponse = new JsonResponse();
        String noteid = fo.getNoteParent();
        for (int i=0 ; i<noteid.length() ; i=i+3){
            if (noteid.substring(i,i+3).equals("000")){
                noteid = noteid.substring(0,i)+"___";
                for(int j=0 ; j<18-i-3 ; j=j+3){
                    noteid = noteid+"000";
                }
                break;
            }
        }
        List<NoteVo> notes = noteMapper.getTree(fo.getUserId(),noteid,fo.getNoteParent());
        jsonResponse.setStatus("1");
        jsonResponse.setMsg("查询成功");
        jsonResponse.setData(notes);
        return jsonResponse;
    }

    /**
     * 点击文档展示内容
     * @param fo
     * @return
     */
    public JsonResponse getNote(NoteFo fo) {
        JsonResponse jsonResponse = new JsonResponse();
        NoteVo noteVo = noteMapper.getNote(fo.getUserId(),fo.getNoteId());
        jsonResponse.setStatus("1");
        jsonResponse.setMsg("查询成功");
        jsonResponse.setData(noteVo);
        return jsonResponse;
    }

    /**
     * 置为无效
     * @param fo
     */
    public JsonResponse invalid(NoteFo fo) {
        JsonResponse jsonResponse = new JsonResponse();
        //将数据状态修改未无效
        noteMapper.invalid(fo.getUserId(),fo.getNoteId(),StringUtil.getNow());
        jsonResponse.setStatus("1");
        jsonResponse.setMsg("删除成功");
        return jsonResponse;
    }

    /**
     * 回收站
     * @param userid
     * @return
     */
    public JsonResponse recycleBin(String userid) {
        JsonResponse jsonResponse = new JsonResponse();
        List<NoteVo> noteVos = noteMapper.recycleBin(userid);
        jsonResponse.setMsg("查询成功");
        jsonResponse.setStatus("1");
        jsonResponse.setData(noteVos);
        return jsonResponse;
    }

    /**
     * 保存
     * @param fo
     * @return
     */
    public JsonResponse save(NoteFo fo) {
        JsonResponse jsonResponse = new JsonResponse();
        try {
            fo.setNoteContent(new String(fo.getNoteContent().getBytes("utf-8"),"iso-8859-1"));
            noteMapper.saveContent(fo.getUserId(),fo.getNoteId(),fo.getNoteContent());
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        jsonResponse.setMsg("保存成功");
        jsonResponse.setStatus("1");
        return jsonResponse;
    }

    /**
     * 删除文档
     * @param file
     */
    public void deleteFile(File file){
        if (file.isDirectory()){
            File[] files = file.listFiles();
            if (files.length == 0){
                file.delete();
            }
            for (int i=0 ; i<files.length ; i++){
                deleteFile(files[i]);
            }
        }else {
            file.delete();
        }
    }
}
