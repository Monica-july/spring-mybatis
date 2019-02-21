package com.neuedu.entity;

public class NoteVo {
    private String user_id;//用户id
    private String note_id;//笔记id
    private String note_status;//笔记状态
    private String note_type;//笔记类别
    private String note_path;//笔记存储路径
    private String note_title;//笔记标题
    private String note_create_time;//笔记创建时间
    private String note_modify_time;//笔记修改时间

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getNote_id() {
        return note_id;
    }

    public void setNote_id(String note_id) {
        this.note_id = note_id;
    }

    public String getNote_status() {
        return note_status;
    }

    public void setNote_status(String note_status) {
        this.note_status = note_status;
    }

    public String getNote_type() {
        return note_type;
    }

    public void setNote_type(String note_type) {
        this.note_type = note_type;
    }

    public String getNote_path() {
        return note_path;
    }

    public void setNote_path(String note_path) {
        this.note_path = note_path;
    }

    public String getNote_title() {
        return note_title;
    }

    public void setNote_title(String note_title) {
        this.note_title = note_title;
    }

    public String getNote_create_time() {
        return note_create_time;
    }

    public void setNote_create_time(String note_create_time) {
        this.note_create_time = note_create_time;
    }

    public String getNote_modify_time() {
        return note_modify_time;
    }

    public void setNote_modify_time(String note_modify_time) {
        this.note_modify_time = note_modify_time;
    }
}
