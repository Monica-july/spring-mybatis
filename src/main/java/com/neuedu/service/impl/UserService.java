package com.neuedu.service.impl;

import com.neuedu.common.Const;
import com.neuedu.common.JsonResponse;
import com.neuedu.dao.NoteMapper;
import com.neuedu.dao.UserMapper;
import com.neuedu.entity.NoteVo;
import com.neuedu.entity.UserVo;
import com.neuedu.service.inter.IUserService;
import com.neuedu.util.MD5Utils;
import com.neuedu.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.UUID;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private NoteMapper noteMapper;

    /**
     * 用户登录
     * */
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

    /**
     * 用户注册
     * */
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
            //创建用户笔记根目录
            String path = Const.FILEPATH+ File.separator+userid+File.separator+"我的文件夹";
            NoteVo root = new NoteVo();
            root.setUserId(userid);
            root.setNoteId(UUID.randomUUID().toString().replaceAll("-",""));
            root.setNoteStatus("1");
            root.setNoteType("2");
            root.setNotePath(path);
            root.setNoteCreateTime(StringUtil.getNow());
            root.setNoteName("我的资源");
            root.setNoteRoot("1");
            noteMapper.createNote(root);
            //创建文件
            File file = new File(path);
            if (!file.exists()){
                file.mkdirs();
            }
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
