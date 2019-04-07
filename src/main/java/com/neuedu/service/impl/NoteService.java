package com.neuedu.service.impl;

import com.neuedu.common.JsonResponse;
import com.neuedu.dao.NoteMapper;
import com.neuedu.entity.NoteFo;
import com.neuedu.entity.NoteVo;
import com.neuedu.entity.UserVo;
import com.neuedu.service.inter.INoteService;
import com.neuedu.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
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
        if (notes == null || notes.size() == 0){
            jsonResponse.setMsg("未查询到数据");
        }else {
            jsonResponse.setData(notes);
        }
        jsonResponse.setStatus("1");
        return jsonResponse;
    }

    /**
     * 新建
     * */
    public JsonResponse createNote(NoteFo fo) throws IOException {
        JsonResponse jsonResponse = new JsonResponse();
        NoteVo note = new NoteVo();
        note.setNoteName(fo.getNoteName());
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
        max = max.substring(0,idindex)+(Integer.valueOf(max.substring(idindex,idindex+3))+1)+max.substring(idindex+3,max.length());
        note.setNoteId(max);
        //查询父节点路径
        String parentpath = noteMapper.getParentPath(fo.getNoteId());
        if (StringUtil.isEmpty(parentpath)){
            jsonResponse.setStatus("31");
            jsonResponse.setMsg("父节点不存在");
            return jsonResponse;
        }
        note.setNotePath(parentpath+ File.separator+note.getNoteName());
        //创建文件、文件夹
        noteMapper.createNote(note);
        String path = "";
        if (note.getNoteType().equals("1")){
            path = parentpath+File.separator+note.getNoteName()+".docx";
        }else {
            path = parentpath+File.separator+note.getNoteName();
        }
        File file = new File(path);
        if (!file.exists()){
            file.getParentFile().mkdirs();
        }
        if (note.getNoteType().equals("1")){
            file.createNewFile();
        }else {
            file.mkdirs();
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
        if (notes == null && notes.size()==0){
            jsonResponse.setStatus("31");
            jsonResponse.setMsg("无数据");
        }else {
            jsonResponse.setStatus("1");
            jsonResponse.setMsg("查询成功");
            jsonResponse.setData(notes);
        }
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
        List<NoteVo> notes = noteMapper.getTree(fo.getUserId(),fo.getNoteParent());
        jsonResponse.setStatus("1");
        jsonResponse.setMsg("查询成功");
        jsonResponse.setData(notes);
        return jsonResponse;
    }

    /**
     * 展示笔记内容
     * */
    public NoteVo getDetails(NoteFo fo) {
        NoteVo noteVo = noteMapper.getDetails(fo.getUserId(),fo.getNoteId());
        return noteVo;
    }

}
