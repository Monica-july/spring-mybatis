package com.neuedu.entity;

/**
 * 文件夹
 * */
public class Folder {
    private String folderId; //文件夹id
    private String folderName;//文件夹名称
    private String folderStatus;//文件夹状态  1有效 0无效
    private String folderParent;//文件夹所在父文件夹
    private String folderRoot;//是否为根文件夹
    private String folderCreateTime;//文件夹创建时间

    public String getFolderId() {
        return folderId;
    }

    public void setFolderId(String folderId) {
        this.folderId = folderId;
    }

    public String getFolderName() {
        return folderName;
    }

    public void setFolderName(String folderName) {
        this.folderName = folderName;
    }

    public String getFolderStatus() {
        return folderStatus;
    }

    public void setFolderStatus(String folderStatus) {
        this.folderStatus = folderStatus;
    }

    public String getFolderParent() {
        return folderParent;
    }

    public void setFolderParent(String folderParent) {
        this.folderParent = folderParent;
    }

    public String getFolderRoot() {
        return folderRoot;
    }

    public void setFolderRoot(String folderRoot) {
        this.folderRoot = folderRoot;
    }

    public String getFolderCreateTime() {
        return folderCreateTime;
    }

    public void setFolderCreateTime(String folderCreateTime) {
        this.folderCreateTime = folderCreateTime;
    }
}
