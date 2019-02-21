package com.neuedu.entity;

public class UserVo {
    private String userId;//用户id
    private String userName;//用户名
    private String userPassword;//用户密码
    private String userPhone;//联系方式
    private String userEmail;//用户邮箱
    private String userSex;//用户性别
    private String userIndros;//用户信息简介

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserSex() {
        return userSex;
    }

    public void setUserSex(String userSex) {
        this.userSex = userSex;
    }

    public String getUserIndros() {
        return userIndros;
    }

    public void setUserIndros(String userIndros) {
        this.userIndros = userIndros;
    }
}
