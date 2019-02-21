package com.neuedu.common;

/**
 * json 相应类
 */
public class JsonResponse {
    private String status;//响应状态码
    private String msg;//响应信息
    private Object data;//响应数据

    public JsonResponse() {
    }

    public JsonResponse(String status, String msg, Object data) {
        this.status = status;
        this.msg = msg;
        this.data = data;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
