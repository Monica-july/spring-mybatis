<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2019\2\22 0022
  Time: 14:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/static/css/note.css">
</head>
<body>
<div id="contains">
    <%--header--%>
    <div class="header">
        <div class="left">云笔记</div>
        <div class="right">
            <div class="user border"></div>
            <div class="out"></div>
        </div>
    </div>
    <div class="main">
        <%--左侧--%>
        <div class="m_left">
            <div class="top">
                <div class="icon" id="add"></div>
                <div class="content">新建</div>
            </div>
            <div class="m_l_list border">
                <ul><li>...</li></ul>
                <ul><li>...</li></ul>
                <ul><li>...</li></ul>
            </div>
        </div>
        <%--笔记列表--%>
        <div class="m_left2 border">
            <div class="top">
                <div class="icon"></div>
                <div class="content">搜索</div>
            </div>
        </div>
        <%--主题内容--%>
        <div class="m_mian border">
            <div class="top">
                <div class="icon"></div>
                <div class="content">名称</div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
