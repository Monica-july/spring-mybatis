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
import java.util.List;
import java.util.UUID;

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
        if (notes == null && notes.size() == 0){
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
        StringUtil.sourceToTarget(fo,note);
        note.setNoteId(UUID.randomUUID().toString().replaceAll("-",""));
        note.setNoteStatus("1");
        note.setNoteCreateTime(StringUtil.getNow());
        note.setNoteRoot("0");
        //查询父节点路径
        String parentpath = noteMapper.getParentPath(note.getNoteParent());
        if (StringUtil.isEmpty(parentpath)){
            jsonResponse.setStatus("31");
            jsonResponse.setMsg("父节点不存在");
            return jsonResponse;
        }
        note.setNotePath(parentpath+ File.separator+note.getNoteName());
        //创建文件、文件夹
        noteMapper.createNote(note);
        String path = "";
        if (note.getNoteType() == "1"){
            path = parentpath+File.separator+note.getNoteName()+".docx";
        }else {
            path = parentpath+File.separator+note.getNoteName();
        }
        File file = new File(path);
        if (!file.exists()){
            file.getParentFile().mkdirs();
            file.createNewFile();
        }
        jsonResponse.setMsg("创建成功");
        jsonResponse.setStatus("1");
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
        if (note == null){
            jsonResponse.setStatus("31");
            jsonResponse.setMsg("无文档");
        }else {
            jsonResponse.setStatus("1");
            jsonResponse.setMsg("查询成功");
            jsonResponse.setData(note);
        }
        return jsonResponse;
    }

    /**
     * 重命名
     * */
    public JsonResponse reName(NoteFo fo) {
        JsonResponse jsonResponse = new JsonResponse();
        noteMapper.reName(fo.getNoteId(),fo.getNoteNewName());
        jsonResponse.setStatus("1");
        jsonResponse.setMsg("修改成功");
        return jsonResponse;
    }


    public JsonResponse getTree(NoteFo fo){
        JsonResponse jsonResponse = new JsonResponse();
        List<NoteVo> notes = noteMapper.getTree(fo.getUserId(),fo.getNoteParent());
        if (notes == null && notes.size() == 0){
            jsonResponse.setStatus("31");
            jsonResponse.setMsg("无数据");
        }else {
            jsonResponse.setStatus("1");
            jsonResponse.setMsg("查询成功");
            jsonResponse.setData(notes);
        }
        return jsonResponse;
    }
}
