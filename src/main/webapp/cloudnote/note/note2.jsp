<%--
  Created by IntelliJ IDEA.
  User: july
  Date: 2019/3/18
  Time: 22:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Kuta Admin 2.0.2</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="" />
    <meta name="author" content="Olas Navigator" />

    <!-- required styles -->
    <link href="<%=request.getContextPath()%>/static/ftpm_127_bdc/library/assets/css/bootstrap.css" rel="stylesheet" />
    <link href="<%=request.getContextPath()%>/static/ftpm_127_bdc/library/assets/css/bootstrap-responsive.css" rel="stylesheet" />
    <link href="<%=request.getContextPath()%>/static/ftpm_127_bdc/library/css/styles.css" rel="stylesheet" />

    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>
    <style>
        .z0_xz{
            width: 400px;
            min-height:160px;
            padding-bottom:40px;
            border-radius: 3px;
            background: #ffffff;
            box-shadow:1px 0 6px rgba(51,51,51,0.5);
            position: fixed;
            left:55%;
            top:25%;
            margin-left:-250px;
            z-index:99;
            background: #fff;
            display: none;
        }
        .z0_topic{
            font-size:30px;
            line-height:60px;
            background:#1a85e1 ;
            text-align:center;
            color: #fff;
        }
        .z0_jb,.z0_mc,.z0_xmc,.z0_ymc,.z0_bm,.z0_qr{
            margin-top:30px;
            margin-left:30px;
        }
        .jiaoyan{
            position:relative;
            height: 30px;
            display:inline-block;
        }
        .z0_qr{
            text-align:center;
        }
    </style>
<body>
<form id="form1">
    <!-- header -->
    <div id="header" class="navbar">
        <div class="navbar-inner">
            <!-- company or app name -->
            <a class="brand hidden-phone" href="#">云笔记</a>

            <!-- search form -->
            <span class="navbar-search pull-right hidden-phone">
                <input type="text" class="search-query span4" placeholder="search..." />
                <i class="icon-large icon-globe"></i>
            </span>
            <!-- ./ search form -->
        </div>
    </div>
    <!-- end header -->

    <div id="left_layout">
        <!-- main content -->
        <div id="main_content" class="container-fluid">
            <!-- post wrapper -->
            <div class="row-fluid">
                <div class="span2">
                    <!-- custom button block -->
                    <div class="button-action" id="list"><%--文件夹/文件列表--%>

                    </div>
                    <!-- ./custom button block -->
                </div>

                <div class="span10">
                    <!-- widget -->
                    <div class="well widget kuta-editor">
                        <!-- widget header -->
                        <div class="widget-header">
                            <h3 class="title">文件名</h3>
                        </div>
                        <!-- ./ widget header -->
                        <!-- widget content -->
                        <textarea id="redactor_content" class="fullRedactor" name="content"></textarea>
                        <!-- ./ widget content -->
                    </div>
                    <!-- ./ widget -->
                    <div class="action-wrapper">
                        <div class="pull-right">
                            <button class="btn btn-flat btn-primary" type="submit" id="save">保存</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- ./ post wrapper -->
        </div>
        <!-- end main content -->

        <!-- sidebar -->
        <ul id="sidebar" class="nav nav-pills nav-stacked">
            <li class="dropdown" id="c_note">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="micon-gift"></i>
                    <span class="hidden-phone">新建笔记</span>
                </a>
            </li>
            <li class="dropdown" id="c_file">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="micon-gift"></i>
                    <span class="hidden-phone">新建文件夹</span>
                </a>
            </li>
            <li class="dropdown" id="lately">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="micon-stats-up"></i>
                    <span class="hidden-phone">最近打开</span>
                </a>
            </li>
            <li class="dropdown" id="mine">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="micon-checkbox"></i>
                    <span class="hidden-phone">我的文件夹</span>
                </a>
            </li>
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="micon-lab"></i>
                    <span class="hidden-phone">回收站</span>
                </a>
            </li>
        </ul>
        <!-- end sidebar -->
    </div>
    <div class="z0_xz">
        <p class="z0_topic" id="czmc" ></p>
        <div class="z0_ymc">
            <span  id="bmmc">原文件名</span>
            <div class="jiaoyan">
                <input type="text" id="noteOldName" name="noteOldName"  disabled style="width:250px;">
            </div>
        </div>
        <div class="z0_xmc">
            <span>新文件名</span>
            <div class="jiaoyan">
                <input type="text" id="noteName" name="noteName" style="width:250px;">
            </div>
        </div>
        <div class="z0_qr">
            <input type="button" class="btn btn-flat btn-primary" value="确认" onclick="confirm()">
            <input type="button" class="btn btn-flat btn-primary" style="margin-left: 30px" value="取消" onclick="cancel()">
        </div>
    </div>
    <input type="hidden" name="noteType" id="noteType" value=""><%--笔记类型   1笔记  2文件夹--%>
    <input type="hidden" name="noteParent" id="noteParent">
    <input type="hidden" name="noteId" id="noteId" value="">
</form>


<script src="<%=request.getContextPath()%>/static/js/jquery-3.3.1.js"></script>
<!-- base -->
<script src="<%=request.getContextPath()%>/static/ftpm_127_bdc/library/assets/js/jquery.js"></script>
<script src="<%=request.getContextPath()%>/static/ftpm_127_bdc/library/assets/js/bootstrap.min.js"></script>
<!-- addons -->
<script src="<%=request.getContextPath()%>/static/ftpm_127_bdc/library/plugins/chart-plugins.js"></script>
<script src="<%=request.getContextPath()%>/static/ftpm_127_bdc/library/plugins/jquery-ui-slider.js"></script>
<script src="<%=request.getContextPath()%>/static/ftpm_127_bdc/library/plugins/redactor/redactor.min.js"></script>
<script src="<%=request.getContextPath()%>/static/ftpm_127_bdc/library/plugins/jmapping/jquery.metadata.js"></script>
<script src="<%=request.getContextPath()%>/static/ftpm_127_bdc/library/plugins/jmapping/jquery.jmapping.min.js"></script>
<script src="<%=request.getContextPath()%>/static/ftpm_127_bdc/library/plugins/jquery.uniform.js"></script>
<script src="<%=request.getContextPath()%>/static/ftpm_127_bdc/library/plugins/chosen.jquery.min.js"></script>
<script src="<%=request.getContextPath()%>/static/ftpm_127_bdc/library/plugins/bootstrap-datepicker.js"></script>
<script src="<%=request.getContextPath()%>/static/ftpm_127_bdc/library/plugins/jquery.timePicker.min.js"></script>
<!-- plugins loader -->
<script src="<%=request.getContextPath()%>/static/ftpm_127_bdc/library/js/loader.js"></script>
<script src="<%=request.getContextPath()%>/static/layer/layer.js"></script>
<script src="<%=request.getContextPath()%>/static/js/note.js"></script>
<script>
    var basePath = "<%=request.getContextPath()%>"

    $(function () {
        loadleft();
    })

</script>
</body>
</html>
