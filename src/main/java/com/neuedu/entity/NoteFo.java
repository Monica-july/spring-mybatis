package com.neuedu.entity;

public class NoteFo {
    private String userId;//用户id
    private String noteId;//id
    private String noteParent; //父节点
    private String noteName;//名称
    private String noteOldName;//原名称
    private String noteType;//类别   1文件  2文件夹

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

    public String getNoteParent() {
        return noteParent;
    }

    public void setNoteParent(String noteParent) {
        this.noteParent = noteParent;
    }

    public String getNoteName() {
        return noteName;
    }

    public void setNoteName(String noteName) {
        this.noteName = noteName;
    }

    public String getNoteType() {
        return noteType;
    }

    public void setNoteType(String noteType) {
        this.noteType = noteType;
    }

    public String getNoteOldName() {
        return noteOldName;
    }

    public void setNoteOldName(String noteOldName) {
        this.noteOldName = noteOldName;
    }
}
