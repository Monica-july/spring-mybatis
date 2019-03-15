<%--
  Created by IntelliJ IDEA.
  User: july
  Date: 2019/3/12
  Time: 22:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><cloudnotes></cloudnotes></title>

</head>

<body>
    <nav class="navbar navbar-default top-navbar" role="navigation">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle waves-effect waves-dark" data-toggle="collapse" data-target=".sidebar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand waves-effect waves-dark" href="index.html"><i class="large material-icons">track_changes</i> <strong>云笔记</strong></a>
            <div id="sideNav" href=""><i class="material-icons dp48">toc</i></div>
        </div>

        <ul class="nav navbar-top-links navbar-right">
            <li><a class="dropdown-button waves-effect waves-dark" href="#!" data-activates="dropdown2">退出登录<i class="fa fa-sign-out fa-fw"></i></a><ul id="dropdown2" class="dropdown-content w250"></ul></li>
        </ul>
    </nav>
    <!--/. NAV TOP  -->
    <nav class="navbar-default navbar-side" role="navigation">
        <div class="sidebar-collapse">
            <ul class="nav" id="main-menu">
                <li>
                    <a href="#" class="waves-effect waves-dark"><i class="fa fa-sitemap"></i> 我的文件夹<span class="fa arrow"></span></a>
                    <ul class="nav nav-second-level">
                        <li>
                            <a href="#">第一层<span class="fa arrow"></span></a>
                            <ul class="nav nav-third-level">
                                <li>
                                    <a href="#">第二层<span class="fa arrow"></span></a>
                                    <ul class="nav nav-third-level" style="padding-left: 30px">
                                        <li>
                                            <a href="#">第san层</a>
                                        </li>
                                        <li>
                                            <a href="#">第san层</a>
                                        </li>
                                        <li>
                                            <a href="#">第san层</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#">第二层<span class="fa arrow"></span></a>
                                    <ul class="nav nav-third-level" style="padding-left: 30px">
                                        <li>
                                            <a href="#">第san层</a>
                                        </li>
                                        <li>
                                            <a href="#">第san层</a>
                                        </li>
                                        <li>
                                            <a href="#">第san层</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#">第二层<span class="fa arrow"></span></a>
                                    <ul class="nav nav-third-level" style="padding-left: 30px">
                                        <li>
                                            <a href="#">第san层</a>
                                        </li>
                                        <li>
                                            <a href="#">第san层</a>
                                        </li>
                                        <li>
                                            <a href="#">第san层</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                        </li>
                    </ul>
                </li>
                <li>
                    <a href="personal.jsp" class="waves-effect waves-dark"><i class="fa fa-fw fa-file"></i> 个人中心</a>
                </li>
            </ul>

        </div>

    </nav>
</body>

</html>