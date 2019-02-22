package com.neuedu.controller;

import com.neuedu.common.Const;
import com.neuedu.common.JsonResponse;
import com.neuedu.entity.Folder;
import com.neuedu.entity.UserVo;
import com.neuedu.service.inter.IFolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/folder")
public class FolderController {

    @Autowired
    private IFolderService folderService;

    /**
     * 左侧边栏 文件夹目录加载
     * */
    public JsonResponse getRootKids(HttpServletRequest request){
        JsonResponse jsonResponse = new JsonResponse();
        UserVo user = (UserVo)request.getSession().getAttribute(Const.USERSESSION);
        if (user == null){
            jsonResponse.setStatus("31");
            jsonResponse.setMsg("未检测到登录状态!请登录!");
            return jsonResponse;
        }
        jsonResponse = folderService.getRootKids(user.getUserId());
        return jsonResponse;
    }

    /**
     * 创建文件夹
     * */
    @RequestMapping("/cref")
    public JsonResponse createFolder(HttpServletRequest request,Folder folder){
        JsonResponse jsonResponse = new JsonResponse();
        UserVo user = (UserVo)request.getSession().getAttribute(Const.USERSESSION);
        if (user == null){
            jsonResponse.setStatus("31");
            jsonResponse.setMsg("未检测到登录状态!请登录!");
            return jsonResponse;
        }
        folderService.createFolder(folder);
        return jsonResponse;
    }


}
