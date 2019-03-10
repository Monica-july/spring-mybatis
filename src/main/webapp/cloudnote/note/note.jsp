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
    <meta charset="utf-8">
    <title>note</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="<%=request.getContextPath()%>/static/css/note.css">
    <link rel="stylesheet" href="<%=request.getContextPath()%>/static/layui-v2.4.5/layui/css/layui.css"  media="all">
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/jquery-3.3.1.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/layui-v2.4.5/layui/layui.js"></script>
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
                <ul id="demo2"></ul>
            </div>
        </div>
        <%--控制宽度--%>
        <div class="drag-line" style="width: 7px; height: 100%; z-index: 1;"></div>
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
<script>
    //Demo
    layui.use(['tree', 'layer'], function(){
        var layer = layui.layer
            ,$ = layui.jquery;
        //生成一个模拟树
        var createTree = function(node, start){
            node = node || function(){
                var arr = [];
                for(var i = 1; i < 10; i++){
                    arr.push({
                        name: i.toString().replace(/(\d)/, '$1$1$1$1$1$1$1$1$1')
                    });
                }
                return arr;
            }();
            start = start || 1;
            layui.each(node, function(index, item){
                if(start < 10 && index < 9){
                    var child = [
                        {
                            name: (1 + index + start).toString().replace(/(\d)/, '$1$1$1$1$1$1$1$1$1')
                        }
                    ];
                    node[index].children = child;
                    createTree(child, index + start + 1);
                }
            });
            return node;
        };

        layui.tree({
            elem: '#demo2' //指定元素
            ,nodes: createTree()
        });

    });
</script>
</html>
