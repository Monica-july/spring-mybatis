package com.neuedu.controller;

import com.neuedu.common.Const;
import com.neuedu.common.JsonResponse;
import com.neuedu.entity.UserVo;
import com.neuedu.service.inter.INoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

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

    @RequestMapping("/create")
    @ResponseBody
    public JsonResponse createNote(HttpServletRequest request){
        JsonResponse jsonResponse = new JsonResponse();
        UserVo user = (UserVo)request.getSession().getAttribute(Const.USERSESSION);
        if (user == null){
            jsonResponse.setMsg("未检测到登录状态");
            jsonResponse.setStatus("31");
            return jsonResponse;
        }
        //创建
        return jsonResponse;
    }
}
