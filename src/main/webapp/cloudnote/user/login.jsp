<%--
  Created by IntelliJ IDEA.
  User: july
  Date: 2019/1/23
  Time: 21:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="<%=request.getContextPath()%>/static/css/logreg.css">
    <link rel="stylesheet" href="<%=request.getContextPath()%>/static/validate/css/new_file.css">
    <script src="<%=request.getContextPath()%>/static/js/jquery-3.3.1.js"></script>
    <script src="<%=request.getContextPath()%>/static/validate/js/validate.js"></script>
    <script src="<%=request.getContextPath()%>/static/validate/js/validate-extends.js"></script>
    <script src="<%=request.getContextPath()%>/static/validate/js/validate-rules.js"></script>
    <script src="<%=request.getContextPath()%>/static/js/log_validate.js"></script>
    <script src="<%=request.getContextPath()%>/static/layerv2.4/layer.js"></script>
    <title>云笔记</title>
    <style type="text/css">
        *{
            margin: 0;
            padding: 0;
        }
    </style>
</head>

<body>
<div class="header" id="head">
    <div class="title">云笔记</div>
</div>

<div class="wrap" id="wrap">
    <div class="logGet">
        <!-- 头部提示信息 -->
        <div class="logD logDtip">
            <p class="p1">登录</p>
        </div>
        <form id="login_form">
            <!-- 输入框 -->
            <div class="lgD">
                <img src="<%=request.getContextPath()%>/static/images/login.svg" width="20" height="20" alt=""/>
                <input type="text" name="userName" id="userName" placeholder="输入用户名" />
            </div>
            <div class="lgD">
                <img src="<%=request.getContextPath()%>/static/images/pas.svg" width="20" height="20" alt=""/>
                <input type="password" name="userPassword" id="userPassword" placeholder="输入用户密码" />
            </div>
        </form>
        <div class="logC">
            <span id="login_btn"><button>登 录</button></span>
            <span id="regiser_btn"><button>注 册</button></span>
        </div>
    </div>
</div>

<div class="footer" id="foot">
    <div class="copyright">
        <p>Copyright © 2019 Qunar.com Inc. All Rights Reserved.</p>
        <div class="img">
            <i class="icon"></i><span>联系邮箱：songqiruikay@163.com</span>
        </div>

        <div class="img">
            <i class="icon2"></i><span>联系电话：xxx</span>
        </div>
    </div>
</div>
</body>
<script>
    var basePath = "<%=request.getContextPath()%>";
    $("#login_btn").click(function () {
        var log = $("#login_form").val();
        if(log == "" || log == undefined || log == null){
            layer.alert("请输入用户名密码!")
            return;
        }
        if ($("#login_form").validate()){
            $.ajax({
                url:basePath+"/user/dologin",
                type:"post",
                data:$("#login_form").serializeArray(),
                async:false,
                dataType:"json",
                success:function (data) {
                    layer.alert(data.msg);
                }
            })
        }else {
            layer.alert("请确认用户名密码正确性!")
        }
    })
</script>
</html>
