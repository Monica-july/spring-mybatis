package com.neuedu.controller;

import com.neuedu.common.JsonResponse;
import com.neuedu.entity.UserVo;
import com.neuedu.service.inter.IUserService;
import com.neuedu.util.MD5Utils;
import com.neuedu.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private IUserService userService;

    @RequestMapping("/login")
    public String login(){
        return "user/login";
    }

    @RequestMapping("/register")
    public String register(){
        return "user/register";
    }

    @RequestMapping("/dologin")
    @ResponseBody
    public JsonResponse do_login(UserVo userVo,HttpServletRequest request){
        JsonResponse jsonResponse = null;
        try {
            jsonResponse = userService.do_login(userVo,request);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return jsonResponse;
    }

    @ResponseBody
    @RequestMapping("/doregister")
    public JsonResponse do_register(@ModelAttribute UserVo userVo, HttpServletRequest request){
        JsonResponse jsonResponse =  userService.do_register(userVo);
        return jsonResponse;
    }
}
