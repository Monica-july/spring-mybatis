package com.neuedu.dao;

import com.neuedu.entity.NoteVo;
import org.apache.ibatis.annotations.Param;

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
    String getParentPath(@Param("userid") String userid,@Param("parentid") String parentid);

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
    List<NoteVo> getTree(@Param("userid") String userid, @Param("noteparent") String noteparent, @Param("noteid") String noteid);

    NoteVo getDetails(@Param("userid") String userid,@Param("noteid") String noteid);

    /**
     * 查询当前用户根文件夹的note id
     * */
    String getRootNoteId(String userid);


    String getMaxNoteId(@Param("userid") String userid,@Param("noteparent")String noteparent);

    /**
     * 置为无效
     * @param userid 用户
     * @param noteid 笔记
     */
    void delete(@Param("userid") String userid,@Param("noteid")String noteid,@Param("now")String now);

    /**
     * 回收站
     * @param user_id
     * @return
     */
    List<NoteVo> recycleBin(String user_id);
}
