package com.neuedu.dao;

import com.neuedu.entity.NoteVo;

import java.util.List;

public interface NoteMapper {
    /**
     * 加载左侧边栏
     * */
    List<NoteVo> getRootKids(String userId);

    void createNote(NoteVo note);
}
