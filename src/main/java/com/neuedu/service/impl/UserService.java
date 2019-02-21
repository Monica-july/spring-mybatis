package com.neuedu.service.impl;

import com.neuedu.common.JsonResponse;
import com.neuedu.dao.UserMapper;
import com.neuedu.entity.UserVo;
import com.neuedu.service.inter.IUserService;
import com.neuedu.util.MD5Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.UUID;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserMapper userMapper;

    public JsonResponse do_login(UserVo userVo) throws UnsupportedEncodingException {
        JsonResponse jsonResponse = new JsonResponse();
        userVo.setUserName(URLDecoder.decode(userVo.getUserName(),"utf-8"));
        userVo.setUserPassword(MD5Utils.GetMD5Code(userVo.getUserPassword()));
        UserVo user = userMapper.userLogin(userVo);
        if (user != null){
            jsonResponse.setStatus("1");
            jsonResponse.setMsg("登录成功!");
            jsonResponse.setData(user);
        }else {
            jsonResponse.setStatus("31");
            jsonResponse.setMsg("用户不存在!");
        }
        return jsonResponse;
    }

    public JsonResponse  do_register(UserVo userVo) {
        JsonResponse jsonResponse = new JsonResponse();
        //姓名解码
        try {
            //用户名解码
            userVo.setUserName(URLDecoder.decode(userVo.getUserName(),"utf-8"));
            //密码MD5加密
            userVo.setUserPassword(MD5Utils.GetMD5Code(userVo.getUserPassword()));
            String userid = UUID.randomUUID().toString().replaceAll("-","");
            userVo.setUserId(userid);
            userMapper.insertUser(userVo);
            jsonResponse.setStatus("1");
            jsonResponse.setMsg("注册成功!");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return jsonResponse;
    }

    public UserVo queryName(String name) {
        return userMapper.queryUserByName(name);
    }

    public UserVo queryEmail(String email) {
        return userMapper.queryByUserEmail(email);
    }

    public UserVo queryPhone(String phone) {
        return userMapper.queryByUserPhone(phone);
    }
}
