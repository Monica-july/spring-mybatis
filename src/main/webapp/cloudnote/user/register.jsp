<%--
  Created by IntelliJ IDEA.
  User: july
  Date: 2019/1/27
  Time: 19:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="<%=request.getContextPath()%>/static/css/logreg.css">
    <link rel="stylesheet" href="<%=request.getContextPath()%>/static/validate/css/validate.css">
    <script src="<%=request.getContextPath()%>/static/js/jquery-3.3.1.js"></script>
    <script src="<%=request.getContextPath()%>/static/js/user.js"></script>
    <script src="<%=request.getContextPath()%>/static/validate/js/validate.js"></script>
    <script src="<%=request.getContextPath()%>/static/validate/js/validate-rules.js"></script>
    <script src="<%=request.getContextPath()%>/static/validate/js/validate-extends.js"></script>
    <script src="<%=request.getContextPath()%>/static/js/reg_validate.js"></script>
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
            <p class="p1">注册</p>
        </div>
        <form id="register_form">
            <!-- 输入框 -->
            <div class="lgD">
                <img src="<%=request.getContextPath()%>/static/images/login.svg" width="20" height="20" alt=""/>
                <input type="text" name="userName" id="userName" placeholder="输入用户名"/>
            </div>
            <div class="lgD">
                <img src="<%=request.getContextPath()%>/static/images/pas.svg" width="20" height="20" alt=""/>
                <input type="text" name="userPassword" id="userPassword" placeholder="输入用户密码"/>
            </div>
            <div class="lgD">
                <img src="<%=request.getContextPath()%>/static/images/email.svg" width="20" height="20" alt=""/>
                <input type="email" name="userEmail" id="userEmail" placeholder="输入email" />
            </div>
            <div class="lgD">
                <img src="<%=request.getContextPath()%>/static/images/phone.svg" width="20" height="20" alt=""/>
                <input type="tel" name="userPhone" id="userPhone" placeholder="输入联系电话" />
            </div>
        </form>
        <div class="logC">
            <span id="log_btn"><button>登 录</button></span>
            <span id="reg_btn"><button>注 册</button></span>
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
    var basePath = "<%=request.getContextPath()%>"
    var qzn = 0;//权重
    var qze = 0;
    var qzp = 0;
    //注册
    $("#reg_btn").click(function () {
        if($("#register_form").valid()){
            if ((qzn+qze+qzp)!=0){
                alert("请确认填写信息!");
                return;
            }
            return;
            $.ajax({
                url:basePath+"/user/doregister",
                type:"post",
                data:$("#register_form").serializeArray(),
                async:true,
                success:function (data) {
                    alert(data.msg);
                }
            });
        }
    });

    //校验

</script>
</html>

