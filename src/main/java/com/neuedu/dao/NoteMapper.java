package com.neuedu.dao;

import com.neuedu.entity.NoteVo;

import java.util.List;

public interface NoteMapper {
    List<NoteVo> getRootKids(String userId);
}
