package com.neuedu.controller;

import com.neuedu.common.Const;
import com.neuedu.common.JsonResponse;
import com.neuedu.entity.NoteFo;
import com.neuedu.entity.NoteVo;
import com.neuedu.entity.UserVo;
import com.neuedu.service.inter.INoteService;
import com.neuedu.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.*;

@Controller
@RequestMapping("/note")
public class NoteController {

    @Autowired
    private INoteService noteService;

    private Logger logger = LoggerFactory.getLogger(NoteController.class);
    @RequestMapping("/index")
    public String index(){
        return "note/note2";
    }

    /**
     * 加载左侧树
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
    @RequestMapping("/content")
    @ResponseBody
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
    public JsonResponse createNote(HttpServletRequest request,@ModelAttribute NoteFo fo){
        JsonResponse jsonResponse = new JsonResponse();
        UserVo user = (UserVo)request.getSession().getAttribute(Const.USERSESSION);
        if (user == null){
            jsonResponse.setMsg("未检测到登录状态");
            jsonResponse.setStatus("31");
            return jsonResponse;
        }
        //新建文档、文件夹
        try {
            fo.setUserId(user.getUserId());
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
        fo.setUserId(user.getUserId());
        jsonResponse = noteService.getTree(fo);
        return jsonResponse;
    }


    /**
     * 点击文档展示内容
     * */
    public JsonResponse getDetails(HttpServletRequest request,NoteFo fo){
        JsonResponse jsonResponse = new JsonResponse();
        UserVo user = (UserVo)request.getSession().getAttribute(Const.USERSESSION);
        if (user == null){
            jsonResponse.setMsg("未检测到登录状态");
            jsonResponse.setStatus("31");
            return jsonResponse;
        }
        //内容展示
//        NoteVo noteVo = noteService.getDetails(fo);
        //文件内容读取
//        String path = noteVo.getNotePath();

        return jsonResponse;
    }

    @RequestMapping("/delete")
    @ResponseBody
    public JsonResponse delete(HttpServletRequest request,NoteFo fo){
        JsonResponse jsonResponse = new JsonResponse();
        UserVo user = (UserVo)request.getSession().getAttribute(Const.USERSESSION);
        if (user == null){
            jsonResponse.setMsg("未检测到登录状态");
            jsonResponse.setStatus("31");
            return jsonResponse;
        }
        fo.setUserId(user.getUserId());
        jsonResponse = noteService.delete(fo);
        return jsonResponse;
    }

    /**
     * 回收站
     * @param request
     * @return
     */
    @RequestMapping("/recycleBin")
    @ResponseBody
    public JsonResponse recycleBin(HttpServletRequest request){
        JsonResponse jsonResponse = new JsonResponse();
        UserVo user = (UserVo)request.getSession().getAttribute(Const.USERSESSION);
        if (user == null){
            jsonResponse.setMsg("未检测到登录状态");
            jsonResponse.setStatus("31");
            return jsonResponse;
        }
        jsonResponse = noteService.recycleBin(user.getUserId());
        return jsonResponse;
    }

    /**
     * 保存文档内容
     */
    @ResponseBody
    @RequestMapping("/save")
    public JsonResponse save(HttpServletRequest request,NoteFo fo){
        JsonResponse jsonResponse = new JsonResponse();
        UserVo user = (UserVo)request.getSession().getAttribute(Const.USERSESSION);
        if (user == null){
            jsonResponse.setMsg("未检测到登录状态");
            jsonResponse.setStatus("31");
            return jsonResponse;
        }
        fo.setUserId(user.getUserId());
        jsonResponse = noteService.save(fo);
        return jsonResponse;
    }
}
