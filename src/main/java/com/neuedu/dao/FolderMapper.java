package com.neuedu.dao;

import com.neuedu.entity.Folder;

import java.util.List;

public interface FolderMapper {
    /**
     * 创建文件夹
     * */
    void createFolder(Folder folder);

    /**
     * 获取根目录下的文件夹、文件
     * */
    List<Folder> getRootKids(String userId);
}
