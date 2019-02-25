package com.neuedu.controller;

import com.neuedu.common.Const;
import com.neuedu.common.JsonResponse;
import com.neuedu.entity.NoteFo;
import com.neuedu.entity.NoteVo;
import com.neuedu.entity.UserVo;
import com.neuedu.service.inter.INoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Controller
@RequestMapping("/note")
public class NoteController {

    @Autowired
    private INoteService noteService;

    @RequestMapping("/index")
    public String index(){
        return "note/note";
    }

    /**
     * 加载左侧
     * */
    @RequestMapping("/left")
    @ResponseBody
    public JsonResponse getRootKids(HttpServletRequest request){
        JsonResponse jsonResponse = new JsonResponse();
        UserVo user = (UserVo)request.getSession().getAttribute(Const.USERSESSION);
        if (user == null){
            jsonResponse.setMsg("未检测到登录状态");
            jsonResponse.setStatus("31");
            return jsonResponse;
        }
        jsonResponse = noteService.getRootKids(user.getUserId());
        return jsonResponse;
    }


    /**
     * 最近打开的文档
     * */
    @RequestMapping("/notes")
    @ResponseBody
    public JsonResponse getNotes(HttpServletRequest request){
        JsonResponse jsonResponse = new JsonResponse();
        UserVo user = (UserVo)request.getSession().getAttribute(Const.USERSESSION);
        if (user == null){
            jsonResponse.setMsg("未检测到登录状态");
            jsonResponse.setStatus("31");
            return jsonResponse;
        }
        jsonResponse = noteService.getNotes(user.getUserId());
        return jsonResponse;
    }

    /**
     * 最近一篇文档
     * */
    public JsonResponse getContent(HttpServletRequest request){
        JsonResponse jsonResponse = new JsonResponse();
        UserVo user = (UserVo)request.getSession().getAttribute(Const.USERSESSION);
        if (user == null){
            jsonResponse.setMsg("未检测到登录状态");
            jsonResponse.setStatus("31");
            return jsonResponse;
        }
        jsonResponse = noteService.getContent(user.getUserId());
        return jsonResponse;
    }

    /**
     * 新建
     * */
    @RequestMapping("/create")
    @ResponseBody
    public JsonResponse createNote(HttpServletRequest request, NoteFo fo){
        JsonResponse jsonResponse = new JsonResponse();
        UserVo user = (UserVo)request.getSession().getAttribute(Const.USERSESSION);
        if (user == null){
            jsonResponse.setMsg("未检测到登录状态");
            jsonResponse.setStatus("31");
            return jsonResponse;
        }
        //新建文档、文件夹
        try {
            jsonResponse = noteService.createNote(fo);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return jsonResponse;
    }

    /**
     * 重命名
     * */
    @RequestMapping("/rename")
    @ResponseBody
    public JsonResponse reName(HttpServletRequest request,NoteFo fo){
        JsonResponse jsonResponse = new JsonResponse();
        UserVo user = (UserVo)request.getSession().getAttribute(Const.USERSESSION);
        if (user == null){
            jsonResponse.setMsg("未检测到登录状态");
            jsonResponse.setStatus("31");
            return jsonResponse;
        }
        jsonResponse = noteService.reName(fo);
        return jsonResponse;
    }

    /**
     * 加载左侧下一层
     * */
    @RequestMapping("/gettree")
    @ResponseBody
    public JsonResponse getTree(HttpServletRequest request,NoteFo fo){
        JsonResponse jsonResponse = new JsonResponse();
        UserVo user = (UserVo)request.getSession().getAttribute(Const.USERSESSION);
        if (user == null){
            jsonResponse.setMsg("未检测到登录状态");
            jsonResponse.setStatus("31");
            return jsonResponse;
        }
        jsonResponse = noteService.getTree(fo);
        return jsonResponse;
    }
}
