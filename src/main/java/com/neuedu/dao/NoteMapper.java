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
     * 最近文件
     * */
    List<NoteVo> getNotes(String userid);

    /**
     * 最近修改的文档
     * */
    NoteVo getContent(String userid);

    NoteVo getNote(@Param("userid") String userid,@Param("noteid")String noteid);

    /**
     * 重命名
     * */
    void reName(String noteid,String notename);

    /**
     * 加载左侧下一层
     * */
    List<NoteVo> getTree(@Param("userid") String userid, @Param("noteparent") String noteparent, @Param("noteid") String noteid);

    /**
     * 查询当前用户根文件夹的note id
     * */
    String getRootNoteId(String userid);

    /**
     * 查询最大值
     * @param userid
     * @param noteparent
     * @return
     */
    String getMaxNoteId(@Param("userid") String userid,@Param("noteparent")String noteparent);

    /**
     * 置为无效
     * @param userid 用户
     * @param noteid 笔记
     */
    void invalid(@Param("userid") String userid,@Param("noteid")String noteid,@Param("now")String now);

    /**
     * 回收站
     * @param user_id
     * @return
     */
    List<NoteVo> recycleBin(String user_id);

    /**
     * 笔记内容存储
     * @param userid
     * @param noteid
     * @param notecontent
     */
    void saveContent(@Param("userid")String userid,@Param("noteid")String noteid,@Param("notecontent")String notecontent);

    /**
     * 查看文件名是否已存在
     * @param userid
     * @param noteid
     * @return
     */
    NoteVo getExist(@Param("userid")String userid,@Param("noteid")String noteid,
                    @Param("notename")String notename,@Param("notetype")String notetype);
}
