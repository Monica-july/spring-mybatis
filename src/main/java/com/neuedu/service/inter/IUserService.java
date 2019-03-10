package com.neuedu.service.inter;

import com.neuedu.common.JsonResponse;
import com.neuedu.entity.UserVo;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;

public interface IUserService {
    /**
     * 登录
     * */
    JsonResponse do_login(UserVo userVo, HttpServletRequest request) throws UnsupportedEncodingException;

    /**
     * 注册
     * */
    JsonResponse do_register(UserVo userVo);

    UserVo queryName(String name);
    UserVo queryEmail(String email);
    UserVo queryPhone(String phone);
}
