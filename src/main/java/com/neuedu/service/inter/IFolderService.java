package com.neuedu.service.inter;

import com.neuedu.common.JsonResponse;
import com.neuedu.entity.Folder;
import com.neuedu.entity.UserVo;

public interface IFolderService {

    String createFolder(Folder folder);

    JsonResponse getRootKids(String userid);
}
