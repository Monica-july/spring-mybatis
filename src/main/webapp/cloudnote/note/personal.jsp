<%--
  Created by IntelliJ IDEA.
  User: july
  Date: 2019/3/12
  Time: 22:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><cloudnotes></cloudnotes></title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="<%=request.getContextPath()%>/static/tpez_5_sr/assets/materialize/css/materialize.min.css" media="screen,projection" />
    <!-- Bootstrap Styles-->
    <link href="<%=request.getContextPath()%>/static/tpez_5_sr/assets/css/bootstrap.css" rel="stylesheet" />
    <!-- FontAwesome Styles-->
    <link href="<%=request.getContextPath()%>/static/tpez_5_sr/assets/css/font-awesome.css" rel="stylesheet" />
    <!-- Morris Chart Styles-->
    <link href="<%=request.getContextPath()%>/static/tpez_5_sr/assets/js/morris/morris-0.4.3.min.css" rel="stylesheet" />
    <!-- Custom Styles-->
    <link href="<%=request.getContextPath()%>/static/tpez_5_sr/assets/css/custom-styles.css" rel="stylesheet" />
    <!-- Google Fonts-->
    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css' />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/static/tpez_5_sr/assets/js/Lightweight-Chart/cssCharts.css">
</head>

<body>
<div id="wrapper">
    <%@include file="nav.jsp"%>

    <div id="page-wrapper">
        <div class="header">
            <h1 class="page-header">
                个人中心
            </h1>

        </div>
        <div id="page-inner">

        </div>
        <!-- /. PAGE INNER  -->
    </div>
    <!-- /. PAGE WRAPPER  -->
</div>
<!-- /. WRAPPER  -->
<!-- JS Scripts-->
<!-- jQuery Js -->
<script src="<%=request.getContextPath()%>/static/tpez_5_sr/assets/js/jquery-1.10.2.js"></script>
<!-- Bootstrap Js -->
<script src="<%=request.getContextPath()%>/static/tpez_5_sr/assets/js/bootstrap.min.js"></script>
<script src="<%=request.getContextPath()%>/static/tpez_5_sr/assets/materialize/js/materialize.min.js"></script>
<!-- Metis Menu Js -->
<script src="<%=request.getContextPath()%>/static/tpez_5_sr/assets/js/jquery.metisMenu.js"></script>
<!-- Morris Chart Js -->
<script src="<%=request.getContextPath()%>/static/tpez_5_sr/assets/js/morris/raphael-2.1.0.min.js"></script>
<script src="<%=request.getContextPath()%>/static/tpez_5_sr/assets/js/morris/morris.js"></script>
<script src="<%=request.getContextPath()%>/static/tpez_5_sr/assets/js/easypiechart.js"></script>
<script src="<%=request.getContextPath()%>/static/tpez_5_sr/assets/js/easypiechart-data.js"></script>
<script src="<%=request.getContextPath()%>/static/tpez_5_sr/assets/js/Lightweight-Chart/jquery.chart.js"></script>
<!-- Custom Js -->
<script src="<%=request.getContextPath()%>/static/tpez_5_sr/assets/js/custom-scripts.js"></script>


</body>

</html>
