package com.neuedu.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class StringUtil {
    /*
    * 检验字符串是否为空
    * */
    public static boolean isEmpty(String str){
        if (str == null || str.length() == 0){
            return true;
        }
        return false;
    }

    /*
    * 获取当前时间
    * */
    public static String getNow(){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        return sdf.format(new Date());
    }

    //对象转换
    public static Object sourceToTarget(Object source,Object target){

        return target;
    }
}
