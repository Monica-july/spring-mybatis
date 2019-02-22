package com.neuedu.entity;

public class NoteVo {
    private String userId;//用户id
    private String noteId;//笔记id
    private String noteStatus;//笔记状态
    private String noteType;//类型    1文件   2文件夹
    private String noteParent; //笔记所在文件夹
    private String notePath;//笔记存储路径
    private String noteTitle;//笔记标题
    private String noteCreateTime;//笔记创建时间
    private String noteModifyTime;//笔记修改时间

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getNoteId() {
        return noteId;
    }

    public void setNoteId(String noteId) {
        this.noteId = noteId;
    }

    public String getNoteStatus() {
        return noteStatus;
    }

    public void setNoteStatus(String noteStatus) {
        this.noteStatus = noteStatus;
    }

    public String getNoteType() {
        return noteType;
    }

    public void setNoteType(String noteType) {
        this.noteType = noteType;
    }

    public String getNoteParent() {
        return noteParent;
    }

    public void setNoteParent(String noteParent) {
        this.noteParent = noteParent;
    }

    public String getNotePath() {
        return notePath;
    }

    public void setNotePath(String notePath) {
        this.notePath = notePath;
    }

    public String getNoteTitle() {
        return noteTitle;
    }

    public void setNoteTitle(String noteTitle) {
        this.noteTitle = noteTitle;
    }

    public String getNoteCreateTime() {
        return noteCreateTime;
    }

    public void setNoteCreateTime(String noteCreateTime) {
        this.noteCreateTime = noteCreateTime;
    }

    public String getNoteModifyTime() {
        return noteModifyTime;
    }

    public void setNoteModifyTime(String noteModifyTime) {
        this.noteModifyTime = noteModifyTime;
    }
}
