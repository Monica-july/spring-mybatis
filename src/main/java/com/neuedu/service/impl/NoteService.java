package com.neuedu.service.impl;

import com.neuedu.common.JsonResponse;
import com.neuedu.dao.NoteMapper;
import com.neuedu.entity.NoteVo;
import com.neuedu.entity.UserVo;
import com.neuedu.service.inter.INoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class NoteService implements INoteService{

    @Autowired
    private NoteMapper noteMapper;

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

    public JsonResponse createNote(NoteVo note) {
        note.setNoteId(UUID.randomUUID().toString().replaceAll("-",""));
        note.setNoteStatus("1");
//        note.setNotePath();
        return null;
    }
}
