package com.neuedu.dao;

import com.neuedu.entity.UserVo;

public interface UserMapper {

    /**
     * 根据用户名查询用户
     * */
    UserVo queryUserByName(String userName);

    /**
     * 查询用户
     * */
    UserVo queryByUserEmail(String userEmail);

    /**
     * 查询用户
     * */
    UserVo queryByUserPhone(String userPhone);

    /**
     * 注册新用户
     * */
    void insertUser(UserVo userVo);

    /**
     * 用户登录
     * */
    UserVo userLogin(UserVo userVo);
}
