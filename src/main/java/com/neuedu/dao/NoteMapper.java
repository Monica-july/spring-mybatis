package com.neuedu.dao;

import com.neuedu.entity.NoteVo;

import java.util.List;

public interface NoteMapper {
    /**
     * 加载左侧边栏根和第一层
     * */
    List<NoteVo> getRootKids(String userId);

    /**
     * 创建文件、文件夹
     * */
    void createNote(NoteVo note);

    /**
     * 查询父节点路径
     * */
    String getParentPath(String parentid);

    /**
     * 最近文件
     * */
    List<NoteVo> getNotes(String userid);

    /**
     * 最近修改的文档
     * */
    NoteVo getContent(String userid);

    /**
     * 重命名
     * */
    void reName(String noteid,String notename);

    /**
     * 加载左侧下一层
     * */
    List<NoteVo> getTree(String userid,String noteparent);

    NoteVo getDetails(String userid,String noteid);
}
