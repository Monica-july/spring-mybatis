package com.neuedu.service.impl;

import com.neuedu.common.JsonResponse;
import com.neuedu.dao.FolderMapper;
import com.neuedu.entity.Folder;
import com.neuedu.service.inter.IFolderService;
import com.neuedu.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
public class FolderService implements IFolderService {
    @Autowired
    private FolderMapper folderMapper;
    /**
     * 创建文件夹
     * */
    public String createFolder(Folder folder) {
        JsonResponse jsonResponse = new JsonResponse();
        folder.setFolderId(UUID.randomUUID().toString().replaceAll("-",""));
        folder.setFolderRoot("0");
        folder.setFolderStatus("1");
        folder.setFolderCreateTime(StringUtil.getNow());
        //创建文件夹
        folderMapper.createFolder(folder);
        return folder.getFolderId();
    }

    public JsonResponse getRootKids(String userid) {
        return null;
    }
}
