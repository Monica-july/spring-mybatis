/*批量制证弹层所需数据开始*/
var loadLayeMoveTimer;//卡片加载层向下移动的setInterval
var  currentStateTimer;//向后台获取最新卡片状态的setInterval
var moveTime = 45000;//批量制证弹层卡片制作中 加载下移动画间隔时间（单位：ms）
var animateTime = 50000;//下移整个动画完成设置的时间（单位：ms）
var getCardState = 450000;//批量制证弹层获取最新卡片状态的间隔时间（单位：ms）
var card_zzz_count = 0;//制作中的卡片总数
var card_ywc_count = 0;//已完成的卡片总数
var card_sb_count = 0;//失败的卡片总数
/*批量制证弹层所需数据结束*/
var bmlistArr=[];//部门列表数组
/*公共方法*/
var publicMethods = {
    currentEle:'',
    currentFlag:'',
    /*所有的弹层操作方法开始
            index:string格式，代表第几个弹层
            flag: 仅在新增部门会用到；0：新增同级部门；1：新增下级部门
    */
    //显示弹层
    showDialog:function (index,ele,flag,bm,data,dysj,kxx_klb,text,czlx,dwxx_sffwbzdw) {
        if(index != "15"){
            publicMethods.currentEle = ele;
        }
        document.getElementById("dialogBg").style.display="block";
        document.getElementById("dialog"+index+"").style.display="block";
        $("#wz").val(flag);
        $("#oldbm").val(bm);
        $("#dwxx_dwbm").val(bm);
        //新增部门
        if(index == "1"){
            publicMethods.currentFlag = flag;//新增同级部门/新增子部门标识
        }
        //选择部门
        else if(index=="6"){
            var ele = $("#dialog6").find(".left_section");
            //publicMethods.createBmTree(ele,level0);
            if(bm==null||bm==""){
                publicMethods.getBmTreeData(ele,flag,bm,dwxx_sffwbzdw);
            }else{
                publicMethods.bmTreeShow(ele,bm);
            }
        }
        //批量制证卡片横版样式
        else if(index == "8"||index == "9"){
            cardData=data;
            $(".plzz-zzz ul").html("");
            $(".plzz-ywc ul").html("");
            $(".plzz-sb ul").html("");
            console.log(cardData);
            for(var i=0;i<cardData.length;i++){
                var cardXx = cardData[i];
                console.log(cardData[i]);
                publicMethods.createPlzzTcCardList($(".plzz-zzz ul"),cardXx,kxx_klb,flag);//创建卡片list
            }
            card_zzz_count = cardData.length;
            $(".plzz-dzznumber").text(card_zzz_count);//制作中的卡片总数赋值
            $(".plzz-ywcnumber").text(0);//制作中的成功总数赋值
            $(".plzz-sbnumber").text(0);//制作中的失败总数赋值
            //publicMethods.getCardCurrentState();//向后台获取最新卡片状态
            $(".processLayer").show();
            publicMethods.loadLayerMove(dysj);//遮罩层下移
            setTimeout(function () {
                iframe.window.ksplzkCancelMethods();
            },100);

        }
        //类似alert弹层
        else if(index == '10'){
            $(".dialogTxt2").text(text)
        }
        else if(index == '11'){
            $(".dialogTxt").text(text);
        }
        else if(index == '12'){
            $(".zkqd").attr("data-state","1");
            $(".zkqx").attr("data-state","1");
            if(czlx=="2"){
                $("#czlx").val("2");
            }else{
                $("#czlx").val("");
            }
            $(".dialogTxt1").text(text);
        }
        else if(index == '13'){
            $(".dialogTxt3").text(text);
        }
        else if(index == '15'){
            $(".dialogTxt4").text(text);
        }
    },
    //点击弹层的确认按钮方法
    sureClick:function(index){
        //新增部门弹层
        if(index == '1'){
            var paramsObj = publicMethods.serializeObject($("#dialog1-form").serializeArray());//form参数序列化传给后台
            paramsObj.dwxx_sffwbzdw = $("select[name='dwxx_sffwbzdw']").find("option:selected").val();
            // paramsObj.wz = publicMethods.currentFlag;
            // paramsObj.oldbm = publicMethods.currentBm;
            if (!/^[\u4e00-\u9fa5]+$/gi.test(paramsObj.dwxx_dwmc)){
                //alert("部门名称只能输入汉字");
                window.parent.parent.publicMethods.showDialog('15','','','','','','','部门名称只能输入汉字');
                return;
            }
            console.log(paramsObj.dwxx_dwmc.length);
            if(paramsObj.dwxx_dwmc.length > 32){
                window.parent.parent.publicMethods.showDialog('15','','','','','','','部门名称不能超过32个汉字');
                //alert("部门名称不能超过32个汉字");
                return;
            }
            $.ajax({
                url: basePath + "bmlh/xjbm",
                async: false,
                type: "post",
                data: paramsObj,
                dataType: "json",
                success: function (data) {
                    if (data.returnCode == -1) {
                        window.parent.parent.publicMethods.showDialog('15','','','','','','',data.returnMsg);
                        //alert(data.returnMsg);
                    } else {
                        //ajax成功后
                        var dwxx_dwbh = data.returnData;//新建部门编号从后台获得
                        var dwxx_mc = paramsObj.dwxx_dwmc;//新建部门名称从后台获得（或者从前端获得）
                        console.log(dwxx_dwbh);
                        console.log(dwxx_mc);
                        if (publicMethods.currentFlag == "0") {
                            var levelValue = publicMethods.currentEle.attr("data-level");
                            if (levelValue < 4) {
                                publicMethods.currentEle.after("<li onclick='publicMethods.bmFolderClick($(this),event)' data-level=" + levelValue + " data-open='0' data-click='0' data-current='0' data-bm=" + dwxx_dwbh + " data-mc=" + dwxx_mc + "><span class='sx-ellipsis' title=" + dwxx_mc + " >" + dwxx_mc + "</span><i></i></li>");
                            }
                            else {
                                publicMethods.currentEle.after("<li onclick='publicMethods.bmFolderClick($(this),event)' data-level=" + levelValue + " data-open='0' data-click='0' data-current='0' data-bm=" + dwxx_dwbh + " data-mc=" + dwxx_mc + "><span class='sx-ellipsis' title=" + dwxx_mc + " >" + dwxx_mc + "</span></li>");

                            }
                        }
                        else {
                            var levelValue = publicMethods.currentEle.index();
                            if (levelValue < 4) {
                                publicMethods.currentEle.children("ul[data-show='1']").append("<li onclick='publicMethods.bmFolderClick($(this),event)' data-level=" + levelValue + " data-open='0' data-click='0' data-current='0' data-bm=" + dwxx_dwbh + " data-mc=" + dwxx_mc + "><span class='sx-ellipsis' title=" + dwxx_mc + " >" + dwxx_mc + "</span><i></i></li>");
                            }
                            else {
                                publicMethods.currentEle.children("ul[data-show='1']").append("<li onclick='publicMethods.bmFolderClick($(this),event)' data-level=" + levelValue + " data-open='0' data-click='0' data-current='0' data-bm=" + dwxx_dwbh + " data-mc=" + dwxx_mc + "><span class='sx-ellipsis' title=" + dwxx_mc + " >" + dwxx_mc + "</span></li>");
                            }
                        }
                        $("select").children("option:eq(0)").prop("selected", true);
                        $("input").val("");
                        publicMethods.hideDialog(index);
                    }
                }
            })
        }
        //重命名部门弹层
        else if(index == '2'){
            var mc =  $("#dialog"+index+"").find("input[name='dwxx_dwmc']").val();
            var bm =  $("#dialog"+index+"").find("input[name='dwxx_dwbm']").val();
            var paramsObj = publicMethods.serializeObject($("#dialog2-form").serializeArray());//form参数序列化传给后台
            if (!/^[\u4e00-\u9fa5]+$/gi.test(paramsObj.dwxx_dwmc)){
                //alert("部门名称只能输入汉字");
                window.parent.parent.publicMethods.showDialog('15','','','','','','','部门名称只能输入汉字');
                $("#dwxx_dwbm").val(bm);
                return;
            }
            console.log(paramsObj.dwxx_dwmc.length);
            if(paramsObj.dwxx_dwmc.length > 32){
                window.parent.parent.publicMethods.showDialog('15','','','','','','','部门名称不能超过32个汉字');
                $("#dwxx_dwbm").val(bm);
                //alert("部门名称不能超过32个汉字");
                return;
            }
            console.log(paramsObj);
            $.ajax({
                url: basePath + "bmlh/cmm",
                async: false,
                type: "post",
                data: paramsObj,
                dataType: "json",
                success: function (data) {
                    if (data.returnCode == -1) {
                        window.parent.parent.publicMethods.showDialog('15','','','','','','',data.returnMsg);
                        $("#dwxx_dwbm").val(bm);
                        //alert(data.returnMsg);
                    } else {
                        //ajax成功之后
                        publicMethods.currentEle.attr("data-mc", mc);
                        publicMethods.currentEle.find("span").attr("title", mc);
                        publicMethods.currentEle.find("span").text(mc);
                        publicMethods.hideDialog(index);
                    }
                }
            })
        }
        //撤销部门时候，提示有人弹层
        else if(index == '3'){
            //alert("yes");
            var dwxx_dwbm = publicMethods.currentEle.attr("data-bm");//部门代码
            //ajax实现跳转到部门调整页面（bmlh_bmtz.jsp）
            $("#dwxx_dwbm5").val(dwxx_dwbm);
            publicMethods.hideDialog(index);
            iframe.window.bmcxtzCancelMethods(dwxx_dwbm);

            //成功之后
            //publicMethods.hideDialog(index);

        }
        //证件受理部门弹层
        else if(index == '6'){
            if( $("li[data-current='1']").length >  0){
                var bmlistArr=[];
                $("li[data-current='1']").parents("li").each(function () {
                    var bmObject = {};
                    bmObject.dwxx_dwbm = $(this).attr("data-bm");
                    bmObject.dwxx_dwmc = $(this).attr("data-mc");
                    bmlistArr.unshift(bmObject);
                });
                var currentObject = {};
                currentObject.dwxx_dwbm = $("li[data-current='1']").attr("data-bm");
                currentObject.dwxx_dwmc = $("li[data-current='1']").attr("data-mc");
                bmlistArr.push(currentObject);
                console.log(bmlistArr);
                iframe.window.postValue(bmlistArr);
            }
            document.getElementsByClassName("left_section")[0].innerHTML="";
            publicMethods.hideDialog(index);
        }
        //撤销部门时候，提示是否撤销的弹层
        else if(index == "10"){
            var dwxx_dwbm = publicMethods.currentEle.attr("data-bm");//部门代码

            $.ajax({
                url: basePath + "bmlh/bmcx",
                async: false,
                type: "post",
                data:{
                    dwxx_dwbm:dwxx_dwbm
                },
                dataType:"json",
                success: function (data) {
                    //该部门下有人
                    if (data.returnCode == -1){
                        document.getElementById("dialog"+index+"").style.display="none";
                        document.getElementById("dialog3").style.display="block";//显示提示有人,是否进行部门调整弹层
                    }
                    //该部门下有人
                    else{
                        publicMethods.hideDialog(index);
                        publicMethods.currentEle.remove();//页面直接删除该部门

                    }
                }
            })

        }
        else if(index == "11"){
            publicMethods.hideDialog(index);
        }
        else if(index == "12"){
            if($(".zkqd").attr("data-state") == "1"){
                var czlx=$("#czlx").val();
                publicMethods.hideDialog(index);
                if(czlx=="2"){
                    iframe.window.bctsCancelMethods();
                }else{
                    iframe.window.kszkCancelMethods();
                }
            }
        }
        else if(index == "13"){
            iframe.window.bctsCancelMethods();
        }
        else if(index == "14"){
            var zxyy=$("#zxyy").val();
            iframe.window.bmcxtzCancelMethods(zxyy);
        }
        else if(index == "15"){
            publicMethods.hideDialog(index);
        }
    },
    //点击弹层的取消/关闭按钮
    cancelClick:function(index){
        $("input[type='text']").val('');
        if(index == "6"){
            document.getElementsByClassName("left_section")[0].innerHTML="";
        }
        //批量制证横版弹层
        else if(index == "8"){
            if($(".plzz-close").attr("data-state") == "1"){
                iframe.window.callCancelMethods();
                $(".plzz-stop").attr("data-state","1");
                $(".plzz-close").attr("data-state","0");
            }else{
                return;
            }
        }
        //批量制证横版弹层
        else if(index == "9"){
            if($(".plzz-close").attr("data-state") == "1"){
                iframe.window.callCancelMethods();
                $(".plzz-stop").attr("data-state","1");
                $(".plzz-close").attr("data-state","0");
            }else{
                return;
            }
        }
        //是否立即制卡，不制卡
        else if(index == "12"){
            if($(".zkqx").attr("data-state") == "1"){
                var czlx=$("#czlx").val();
                if(czlx=="2"){
                    iframe.window.re2CancelMethods();
                }else{
                    iframe.window.reCancelMethods();
                }
                $(".zkqd").attr("data-state","0");
                $(".zkqx").attr("data-state","0");
            }else{
                return;
            }
        }
        publicMethods.hideDialog(index);

    },
    //点击弹层的终止按钮(批量制证会用到)
    stopClick:function(index){
        if(index == "8"){
            if($(".plzz-stop").attr("data-state") == "1"){
                $(".plzz-stop").attr("data-state","0");
                $(".plzz-close").attr("data-state","1");
                //clearInterval(currentStateTimer);
                $(".processLayer").stop();
                iframe.window.callStopMethods();
            }else{
                return;
            }
        }
        else if(index == "9"){
            if($(".plzz-stop").attr("data-state") == "1"){
                $(".plzz-stop").attr("data-state","0");
                $(".plzz-close").attr("data-state","1");
                //clearInterval(currentStateTimer);
                $(".processLayer").stop();
                iframe.window.callStopMethods();
            }else{
                return;
            }
        }

    },
    //滑入到弹层帮助问号按钮显示提示(批量制证会用到)
    showHelp:function(){
        $(".help-layer").show();
    },
    //滑出到弹层帮助提示的时候隐藏提示(批量制证会用到)
    hideHelp:function(){
        $(".help-layer").hide();
    },
    /*隐藏弹层
        czFlag:'0':代表取消和关闭弹层；'1'：代表确定
    */
    hideDialog:function (index) {
        document.getElementById("dialog"+index+"").style.display="none";
        if(index == '15'){
            return false;
        }
        document.getElementById("dialogBg").style.display="none";
    },
    //设置弹层内容
    setDialogContent:function (index,str) {
        if(index == "6"){

        }
        else if(index == "2"){
            $("input[type='text']").val(str);
        }
        // document.getElementById("dialog"+index+"").innerHTML=str
    },
    showLayer:function (str) {
        layer.alert(str, {icon: 2});
    },
    /*所有的弹层操作方法结束*/

    /*文件夹结构的部门和左侧树形结构部门的操作方法开始*/
    /*ajax获取部门后台数据
       flag:'0':代表页面初始化；'1'：代表点击部门联动
       dwxx_dwbm:部门编码
   */
    getBmData:function(ele,flag,dwxx_dwbm,dwxx_sffwbzdw){
        if(dwxx_sffwbzdw=="1"){
            dwxx_sffwbzdw="1";
        }else if(dwxx_sffwbzdw=="0"){
            dwxx_sffwbzdw="0";
        }
        if(flag == "0"){
            $.ajax({
                type:"post",
                url: basePath + "bmlh/bmlb",
                data:{
                    dwxx_sffwbzdw:dwxx_sffwbzdw
                },
                dataType:"json",
                success:function (data) {
                    if(data && data.returnData.vbs) {

                        var bmData = data.returnData.vbs;
                        //创建第一层部门
                        // ele.text("");
                        ele.append("<ul></ul>");
                        if(bmData != undefined){
                            publicMethods.createBmFolder(ele,bmData)
                        }
                    }
                }
            })
        }
        else{
            $.ajax({
                type:"post",
                url:basePath + "bmlh/bmlb",
                data:{
                    dwxx_dwbm:dwxx_dwbm,
                    dwxx_sffwbzdw:dwxx_sffwbzdw
                },
                dataType:"json",
                success:function (data) {
                    var bmData = data.returnData.vbs;
                    // ele.text("");
                    ele.append("<ul data-show='1' data-flag='"+dwxx_dwbm+"'></ul>");
                    if(bmData != undefined){
                        publicMethods.createBmFolder(ele,bmData)
                    }

                }
            })
        }

    },
    /*ajax获取部门树形后台数据
     flag:'0':代表页面初始化；'1'：代表点击部门联动
     dwxx_dwbm:部门编码
     */
    getBmTreeData:function(ele,flag,dwxx_dwbm,dwxx_sffwbzdw){
        if(dwxx_sffwbzdw=="1"){
            dwxx_sffwbzdw="1";
        }else if(dwxx_sffwbzdw=="0"){
            dwxx_sffwbzdw="0";
        }
        if(flag == "0"){
            $.ajax({
                type:"post",
                url: basePath + "bmlh/bmlb",
                data:{
                    dwxx_sffwbzdw:dwxx_sffwbzdw
                },
                dataType:"json",
                success:function (data) {
                    if(data && data.returnData.vbs) {

                        var bmData = data.returnData.vbs;
                        //创建第一层部门
                        // ele.text("");
                        if(bmData != undefined){
                            publicMethods.createBmTree(ele,bmData,dwxx_sffwbzdw);
                        }
                    }
                }
            })
        }
        else{
            $.ajax({
                type:"post",
                url:basePath + "bmlh/bmlb",
                data:{
                    dwxx_dwbm:dwxx_dwbm,
                    dwxx_sffwbzdw:dwxx_sffwbzdw
                },
                dataType:"json",
                success:function (data) {
                    var bmData = data.returnData.vbs;
                    // ele.text("");
                    if(bmData != undefined){
                        // publicMethods.createBmTree(ele,bmData)
                        publicMethods.createBmTree(ele,bmData,dwxx_sffwbzdw);
                    }

                }
            })
        }

    },
    //页面创建左侧部门树形列表
    createBmTree:function (ele,bmTreeData,dwxx_sffwbzdw) {
        if(bmTreeData.length !=0){
            var levelValue = ele.attr("data-level");
            if(levelValue){
                levelValue = parseInt(levelValue)+1;
            }
            else{
                levelValue = 0;
            }
            ele.append("<ul class='level"+levelValue+"_list'></ul>");
            for(var i=0;i< bmTreeData.length;i++){
                ele.children("ul").append("<li onclick=\"publicMethods.bmTreeClick($(this),event,'"+dwxx_sffwbzdw+"')\" class='level_"+levelValue+"' data-level="+levelValue+" data-open='0' data-click='0' data-current='0' data-bm="+bmTreeData[i].dwxx_dwbm+" data-mc="+bmTreeData[i].dwxx_dwmc+"><div class='sx-ellipsis'><i></i><span title="+bmTreeData[i].dwxx_dwmc+" >"+bmTreeData[i].dwxx_dwmc+"</span></div></li>");
            }
        }
    },
    //点击页面左侧部门树形列表文件夹
    bmTreeClick:function (ele,ev,dwxx_sffwbzdw) {
        if(arguments.callee.caller.arguments[0]){
            arguments.callee.caller.arguments[0].stopPropagation();
        }
        else {
            ev.stopPropagation() ? ev.stopPropagation() : window.event.cancelable = true;
        }
        //如果页面左右两边都有树形结构部门列表
        if($(".bmTreeList").length > 1){
            ele.parents(".bmTreeList").find("li[data-current='1']").attr("data-current","0");
            ele.attr("data-current","1");
        }
        else{
            $("li[data-current='1']").attr("data-current","0");
            ele.attr("data-current","1");
        }
        //如果页面有需要显示当前选择单位，显示当前选中的部门
        if($(".bmtz-xzdw").length > 0){
            $(".bmtz-xzdw").text($(".left_section li[data-current='1']").children("div").find("span").text());
        }
        if(parseInt(ele.attr("data-level")) < 4){
            //未创建开始创建(最后一个不创建)
            if(ele.attr("data-click") == "0"){
                //未展开
                if(ele.attr("data-open")){
                    ele.attr("data-click","1");
                    ele.attr("data-open","1");
                    var levelValue = parseInt(ele.attr("data-level"));
                    // if(levelValue == "0"){
                    //     publicMethods.createBmTree(ele,level1)
                    // }
                    // else if(levelValue == "1"){
                    //     publicMethods.createBmTree(ele,level2)
                    // }
                    // else if(levelValue == "2"){
                    //     publicMethods.createBmTree(ele,level3)
                    // }
                    // else {
                    //     publicMethods.createBmTree(ele,level4)
                    // }
                    var dwxx_dwbm  = ele.attr("data-bm");
                    publicMethods.getBmTreeData(ele,'1',dwxx_dwbm,dwxx_sffwbzdw);
                }
            }
            //已经创建显隐
            else{
                //已经展开，隐藏
                if(ele.attr("data-open") =="1"){
                    ele.attr("data-open","0");
                    // ele.children("ul").hide();
                    ele.find("ul").hide();
                    ele.find("li[data-open='1']").attr("data-open","0");
                    // ele.find("li[data-click='1']").attr("data-click","0");
                }
                //未展开，显示
                else{
                    ele.attr("data-open","1");
                    ele.children("ul").show();
                }
            }
        }
    },
    //点击页面左侧部门树形列表文件夹
    bmTreeShow:function (ele,dwbm) {
        $.ajax({
            type:"post",
            url:basePath + "bmlh/cxlb",
            data:{
                dwxx_dwbm:dwbm
            },
            dataType:"json",
            success:function (data) {
                var bmData = data.returnData.vbs;
                console.log(bmData);
                // ele.text("");
                if(bmData != undefined){
                    publicMethods.expandBmTree(ele,bmData,dwbm);
                    //publicMethods.createBmTree( $(".left_section"),bmData);
                    //publicMethods.createBmTree( ele,bmData);
                }

            }
        });
    },
    //展开页面左侧部门树形列表
    expandBmTree:function(ele,showData,bm_bm,dwxx_sffwbzdw){
        if(dwxx_sffwbzdw=="1"){
            dwxx_sffwbzdw="1";
        }else if(dwxx_sffwbzdw=="0"){
            dwxx_sffwbzdw="0";
        }
        publicMethods.showBmTree(ele,showData,dwxx_sffwbzdw);
        ele.find("ul").hide();
        ele.find("ul:eq(0)").show();
        ele.find("li[data-bm="+bm_bm+"]").attr("data-open","0");
        ele.find("li[data-bm="+bm_bm+"]").attr("data-click","0");
        ele.find("li[data-bm="+bm_bm+"]").attr("data-current","1");
        ele.find("li[data-bm="+bm_bm+"]").parents("li").each(function () {
            $(this).attr("data-open","1");
            $(this).children("ul").show();
            $(this).attr("data-click","1");
        });
    },
    //显示左侧部门树形列表
    showBmTree:function(ele,showBmTreeData,dwxx_sffwbzdw){
        //第0级别
        if(showBmTreeData.length > 0 && showBmTreeData != undefined){
            var leve0_value = publicMethods.createUlList(ele);
            for(var i=0;i< showBmTreeData.length;i++){
                publicMethods.createLiList(ele.children("ul:eq(0)"),leve0_value,showBmTreeData[i],dwxx_sffwbzdw);
                //第1级别
                if( showBmTreeData[i].nodes != undefined   && showBmTreeData[i].nodes.length > 0){
                    ele.find("li[data-level="+leve0_value+"]:last").attr("data-click","1");
                    var level1_element = ele.find("li[data-level="+leve0_value+"]:last");
                    var level1_value = publicMethods.createUlList(level1_element);
                    var level1_Data = showBmTreeData[i].nodes;
                    for(var m=0;m<level1_Data.length;m++){
                        publicMethods.createLiList(ele.find("ul.level"+level1_value+"_list:last"),level1_value,level1_Data[m],dwxx_sffwbzdw);
                        //第2级别
                        if(level1_Data[m].nodes != undefined && level1_Data[m].nodes.length > 0){
                            ele.find("li[data-level="+level1_value+"]:last").attr("data-click","1");
                            var level2_element = ele.find("li[data-level="+level1_value+"]:last");
                            var level2_value = publicMethods.createUlList(level2_element);
                            var level2_Data = level1_Data[m].nodes;
                            for(var j = 0;j< level2_Data.length;j++){
                                publicMethods.createLiList(ele.find("ul.level"+level2_value+"_list:last"),level2_value,level2_Data[j],dwxx_sffwbzdw);
                                //第3级别
                                if(level2_Data[j].nodes != undefined && level2_Data[j].nodes.length > 0){
                                    ele.find("li[data-level="+level2_value+"]:last").attr("data-click","1");
                                    var level3_element = ele.find("li[data-level="+level2_value+"]:last");
                                    var level3_value = publicMethods.createUlList(level3_element);
                                    var level3_Data = level2_Data[j].nodes;
                                    for(var n=0;n<level3_Data.length;n++){
                                        publicMethods.createLiList(ele.find("ul.level"+level3_value+"_list:last"),level3_value,level3_Data[n],dwxx_sffwbzdw);
                                        //第4级别
                                        if(level3_Data[n].nodes != undefined && level3_Data[n].nodes.length > 0) {
                                            ele.find("li[data-level="+level3_value+"]:last").attr("data-click","1");
                                            var level4_element = ele.find("li[data-level="+level3_value+"]:last");
                                            var level4_value = publicMethods.createUlList(level4_element);
                                            var level4_Data = level3_Data[n].nodes;
                                            for(var h=0;h<level4_Data.length;h++) {
                                                publicMethods.createLiList(ele.find("ul.level"+level4_value+"_list:last"),level4_value,level4_Data[h],dwxx_sffwbzdw);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    //在左侧部门树形结构创建装载部门列表容器ul
    createUlList:function(ele){
        var levelValue = ele.attr("data-level");
        if(levelValue){
            levelValue = parseInt(levelValue)+1;
        }
        else{
            levelValue = 0;
        }
        ele.append("<ul class='level"+levelValue+"_list'></ul>");
        return levelValue
    },
    //在左侧部门树形结构创建部门列表
    createLiList:function(ele,level_value,li_listData,dwxx_sffwbzdw){
        var bm = li_listData.dwxx_dwbm;
        var mc = li_listData.dwxx_dwmc;
        ele.append("<li onclick=\"publicMethods.bmTreeClick($(this),event,'"+dwxx_sffwbzdw+"')\" class='level_"+level_value+"' data-level="+level_value+" data-open='0' data-click='0' data-current='0' data-bm="+bm+" data-mc="+mc+"><div class='sx-ellipsis'><i></i><span title="+mc+" >"+mc+"</span></div></li>");
    },
    //创建部门列表
    createBmFolder:function(ele,bmTreeData){
        if(bmTreeData.length !=0){
            // var levelValue = ele.attr("data-level");
            var levelValue = ele.index();
            // if(levelValue){
            //     levelValue = parseInt(levelValue)+1;
            // }
            // else{
            //     levelValue = 0;
            // }
            for(var i=0;i< bmTreeData.length;i++){
                if(levelValue < 4){
                    ele.children("ul:last").append("<li onclick='publicMethods.bmFolderClick($(this),event)' data-level="+levelValue+" data-open='0' data-click='0' data-current='0' data-bm="+bmTreeData[i].dwxx_dwbm+" data-mc="+bmTreeData[i].dwxx_dwmc+"><span  class='sx-ellipsis' title="+bmTreeData[i].dwxx_dwmc+">"+bmTreeData[i].dwxx_dwmc+"</span><i></i></li>");
                }
                else{
                    ele.children("ul:last").append("<li onclick='publicMethods.bmFolderClick($(this),event)' data-level="+levelValue+" data-open='0' data-click='0' data-current='0' data-bm="+bmTreeData[i].dwxx_dwbm+" data-mc="+bmTreeData[i].dwxx_dwmc+"><span class='sx-ellipsis' title="+bmTreeData[i].dwxx_dwmc+" >"+bmTreeData[i].dwxx_dwmc+"</span></li>");
                }
            }
        }
    },
    //点击部门展开
    bmFolderClick:function (ele,ev) {
        if(arguments.callee.caller.arguments[0]){
            arguments.callee.caller.arguments[0].stopPropagation();
        }
        else {
            ev.stopPropagation() ? ev.stopPropagation() : window.event.cancelable = true;
        }
        var nextParent = ele.parents("div[data-show]").next();
        $("li[data-current='1']").attr("data-current","0");
        ele.attr("data-current","1");
        $(".j0_bm_select").text("："+ele.attr("data-mc"));
        if(parseInt(ele.attr("data-level")) < 4){
            //未创建的，开始创建(最后一个不创建)
            if(ele.attr("data-click") == "0"){
                /*闭合所有的其他子部门*/
                if( nextParent.nextAll("div[data-show='1']").length > 0){
                    nextParent.nextAll("div").attr("data-show","0");
                    nextParent.nextAll("div").find("ul[data-show='1']").attr("data-show","0");
                    nextParent.nextAll("div").find("li[data-open='1']").attr("data-open",'0');
                    nextParent.nextAll("div").find("li[data-current='1']").attr("data-current",'0');
                }
                else{
                    nextParent.attr("data-show","1");
                }
                nextParent.find("ul[data-show='1']").attr("data-show","0");
                nextParent.find("li[data-open='1']").attr("data-open",'0');
                nextParent.find("li[data-current='1']").attr("data-current",'0');
                /*改变同级部门和自身属性值*/
                ele.siblings("li[data-open='1']").attr("data-open",'0');
                ele.attr("data-click","1");
                ele.attr("data-open","1");
                /*创建对应部门*/
                var dwxx_dwbm  = ele.attr("data-bm");
                publicMethods.getBmData(nextParent,'1',dwxx_dwbm);
            }
            //已经创建的，控制子部门显隐
            else{
                //已经展开，隐藏
                if(ele.attr("data-open") =="1"){
                    if( nextParent.nextAll("div[data-show='1']").length > 0){
                        nextParent.nextAll("div").attr("data-show","0");
                        nextParent.nextAll("div").find("ul[data-show='1']").attr("data-show","0");
                        nextParent.nextAll("div").find("li[data-open='1']").attr("data-open",'0');
                        // nextParent.nextAll("div").find("li[data-current='1']").attr("data-current",'0');
                    }
                    nextParent.find("li[data-open='1']").attr("data-open",'0');
                    nextParent.find("li[data-current='1']").attr("data-current",'0');
                    // ele.siblings("li[data-open='1']").attr("data-open",'0');
                    // ele.attr("data-open","0");
                }
                //未展开，显示
                else{
                    if( nextParent.nextAll("div[data-show='1']").length > 0){
                        nextParent.nextAll("div").attr("data-show","0");
                        nextParent.nextAll("div").find("ul[data-show='1']").attr("data-show","0");
                        nextParent.nextAll("div").find("li[data-open='1']").attr("data-open",'0');
                        // nextParent.nextAll("div").find("li[data-current='1']").attr("data-current",'0');
                    }
                    else{
                        nextParent.attr("data-show","1");
                    }
                    nextParent.find("ul[data-show='1']").attr("data-show","0");
                    nextParent.find("li[data-open='1']").attr("data-open",'0');
                    // nextParent.find("li[data-current='1']").attr("data-current",'0');
                    //显示下一级部门并改变同级部门和自身属性
                    var dwxx_dwbm  = ele.attr("data-bm");
                    nextParent.find("ul[data-flag="+dwxx_dwbm+"]").attr("data-show","1");
                    ele.siblings("li[data-open='1']").attr("data-open",'0');
                    ele.attr("data-open","1");
                }
            }
        }
        else{
            ele.siblings("li[data-open='1']").attr("data-open",'0');
            ele.attr("data-open","1");
        }
    },
    //获取左侧选择的部门列表
    getBmList:function(){
        var bmlistArr=[];
        if($("li[data-current='1']").length > 0){
            $("li[data-current='1']").parents("li").each(function () {
                var bmObject = {};
                bmObject.dwxx_dwbm = $(this).attr("data-bm");
                bmObject.dwxx_dwmc = $(this).attr("data-mc");
                bmlistArr.unshift(bmObject);
            });
            var currentObject = {};
            currentObject.dwxx_dwbm = $("li[data-current='1']").attr("data-bm");
            currentObject.dwxx_dwmc = $("li[data-current='1']").attr("data-mc");
            bmlistArr.push(currentObject);
        }
        return bmlistArr;
    },
    /*新增部门
        levelFlag:'0':表示新增同级部门；'1'：表示新增子部门
    */
    newFolderClick:function(levelFlag){
        if( $("li[data-current='1']").length > 0){
            var levelValue = $("li[data-current='1']").attr("data-level");
            if(levelValue < 4){
                if(levelFlag == '1'){
                    var eleParent = $("li[data-current='1']").parents("div[data-show]").next();
                }
                else{
                    var eleParent = $("li[data-current='1']");
                }
            }
            else{
                if(levelFlag == "0"){
                    var eleParent = $("li[data-current='1']");
                }
                else{
                    // alert("无法新增子部门，只能新增同级部门");
                    window.parent.parent.publicMethods.showDialog('11','','','','','','',"无法新增子部门，只能新增同级部门");
                    return false;
                }
            }
            var bm = $("li[data-current='1']").attr("data-bm");
            window.parent.parent.publicMethods.showDialog('1',eleParent,levelFlag,bm);
        }
        else{
            // alert("请选择部门")
            window.parent.parent.publicMethods.showDialog('11','','','','','','','请选择部门');
        }
    },
    //部门重命名
    editFloderClick:function(){
        if( $("li[data-current='1']").length > 0){
            var foldNameValue = $("li[data-current='1']").attr("data-mc");
            window.parent.parent.publicMethods.setDialogContent('2',foldNameValue);
            var bm = $("li[data-current='1']").attr("data-bm");
            window.parent.parent.publicMethods.showDialog('2',$("li[data-current='1']"),'',bm);
        }
        else{
            // alert("请选择部门")
            window.parent.parent.publicMethods.showDialog('11','','','','','','','请选择部门');
        }
    },
    //撤销部门
    deleteFloderClick:function(){
        if( $("li[data-current='1']").length > 0){
            var dwxx_dwbm = $("li[data-current='1']").attr("data-bm");//部门代码
            window.parent.parent.publicMethods.showDialog('10',$("li[data-current='1']"),'','');

        }
        else{
            // alert("请选择部门")
            window.parent.parent.publicMethods.showDialog('11','','','','','','','请选择部门');
        }
    },
    //导出部门
    exportFolderClick:function(){
        window.location.href = basePath + "bmlh/dc";
    },
    /*文件夹结构的部门和左侧树形结构部门的操作方法结束*/

    /*批量制证弹层的操作方法开始*/
    //卡片加载层向下移动效果
    loadLayerMove:function (dysj) {
        //loadLayeMoveTimer = setInterval(function () {
        // var currentTop =  $(".processLayer").position().top;
        var addTopValue = $(".plzz-zzz").find("li:eq(0)").outerHeight(true);
        $(".processLayer").animate({
            top:"+="+addTopValue+"px"
        },dysj,function () {
            var changeTop =  $(".processLayer").position().top;
            if(changeTop >= addTopValue){
                $(".processLayer").css({
                    top:'0px'
                });
                $(".processLayer").stop();
            }
        });
        //  },8000)
    },
    //请求后台获得每个卡片当前的状态（制作中/已完成/失败）
    getCardCurrentState:function () {
        currentStateTimer = setInterval(function () {
            //ajax获取最近卡片状态(返回一个data，类似已定义的cardDataState)成功之后
            publicMethods.changeCardCurrentState();
        },getCardState)
    },
    //根据不断请求到的后台数据改变每个卡片的当前状态
    changeCardCurrentState:function () {
        if( $(".plzz-zzz").find("li:eq(0)").length > 0){
            var flag = true;
            var  currentFirst_card_bm;
            for(var i=0;i<cardDataState.length;i++){
                if(flag){
                    currentFirst_card_bm = $(".plzz-zzz").find("li:eq(0)").attr("data-bm");
                }
                else{
                    currentFirst_card_bm = $(".plzz-zzz").find("li:eq("+i+")").attr("data-bm");
                }
                if(cardDataState[i].ywblxx_kbh == currentFirst_card_bm){
                    var state = $(".plzz-zzz").find("li:eq("+i+")").attr("data-state");
                    if(cardDataState[i].state == state){
                        return false
                    }
                    else{
                        var cardXx = cardDataState[i];
                        //状态是已完成
                        if(cardXx.state == "1"){
                            $(".plzz-zzz").find("li:eq(0)").remove();
                            publicMethods.createPlzzTcCardList($(".plzz-ywc ul"),cardXx,'2');
                            card_zzz_count--;
                            card_ywc_count++;
                            $(".zzz-card").text(card_zzz_count);
                            $(".ywc-card").text(card_ywc_count);
                        }
                        //状态是失败
                        else if(cardXx.state == "2"){
                            $(".plzz-zzz").find("li:eq(0)").remove();
                            publicMethods.createSbCardList($(".plzz-sb ul"),cardXx,'2');
                            card_zzz_count--;
                            card_sb_count++;
                            $(".zzz-card").text(card_zzz_count);
                            $(".sb-card").text(card_sb_count);
                        }
                    }
                }
                else{
                    flag=false;
                }
            }
        }
        //全部结束
        else{
            clearInterval(currentStateTimer);//结束加载减少的动画函数
            clearInterval(currentStateTimer);//结束从后台请求卡片状态的函数
            alert("全部结束")
        }
    },
    //创建批量制证弹层的卡片列表
    createPlzzTcCardList:function (ele_listContainer,listData,kplb,flag) {
        if(flag=="0"){
            if(kplb == "01"){
                var src=basePath+"/read_PIC/tphx/"+listData.kxx_zplj;
                ele_listContainer.append(' <li class="plzz-zt-card plzzt-hb" data-bm='+listData.ywblxx_kbh+' data-state='+listData.state+'>\n' +
                    '                        <div class="plzz-card-font">\n' +
                    '                            <img class="plzztc-card-img" src='+src+'>\n' +
                    '                            <div class="plzztc-card-xx">\n' +
                    '                                <div class="plzztc-row r-xm">\n' +
                    '                                    <label>姓名：</label>\n' +
                    '                                    <span>'+listData.kxx_xm+'</span>\n' +
                    '                                </div>\n' +
                    '                                <div class="plzztc-row r-xb">\n' +
                    '                                    <label>性别：</label>\n' +
                    '                                    <span>'+listData.kxx_xb+'</span>\n' +
                    '                                </div>\n' +
                    '                                <div class="plzztc-row r-dw">\n' +
                    '                                    <label>单位：</label>\n' +
                    '                                    <span>'+listData.kxx_gzdw+'</span>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                            <div class="plzztc-card-zhang"></div>\n' +
                    '                            <div class="plzztc-card-bh"><label>编号：</label><span>'+listData.kxx_lskxh+'</span></div>\n' +
                    '                        </div>\n' +
                    '                        <div class="plzz-card-back">\n' +
                    '                        </div>\n' +
                    '                    </li>');
            }
            else if(kplb == "02"){
                var src=basePath+"/read_PIC/tphx/"+listData.kxx_zplj;
                ele_listContainer.append(' <li class="plzz-zt-card plzzt-hb" data-bm='+listData.ywblxx_kbh+' data-state='+listData.state+'>\n' +
                    '                        <div class="plzz-card-font">\n' +
                    '                            <img class="plzztc-card-img" src='+src+'>\n' +
                    '                            <div class="plzztc-card-xx">\n' +
                    '                                <div class="plzztc-row r-xm">\n' +
                    '                                    <label>姓名：</label>\n' +
                    '                                    <span>'+listData.kxx_xm+'</span>\n' +
                    '                                </div>\n' +
                    '                                <div class="plzztc-row r-xb">\n' +
                    '                                    <label>性别：</label>\n' +
                    '                                    <span>'+listData.kxx_xb+'</span>\n' +
                    '                                </div>\n' +
                    '                                <div class="plzztc-row r-dw">\n' +
                    '                                    <label>单位：</label>\n' +
                    '                                    <span>'+listData.kxx_gzdw+'</span>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                            <div class="plzztc-card-zhang"></div>\n' +
                    '                            <div class="plzztc-card-bh"><label>编号：</label><span>'+listData.kxx_lskxh+'</span></div>\n' +
                    '                        </div>\n' +
                    '                        <div class="plzz-card-back1">\n' +
                    '                        </div>\n' +
                    '                    </li>');
            }
            else if(kplb == "03"){
                var src=basePath+"/read_PIC/tphx/"+listData.kxx_zplj;
                ele_listContainer.append(' <li class="plzz-zt-card plzztc-sb" data-bm='+listData.ywblxx_kbh+' data-state='+listData.state+'>\n' +
                    '                        <div class="plzz-card-font">\n' +
                    '                            <img class="plzztc-card-img" src='+src+'>\n' +
                    '                            <div class="plzztc-card-xx">\n' +
                    '                                <div class="plzztc-row r-xm">\n' +
                    '                                    <label>姓名：</label>\n' +
                    '                                    <span>'+listData.kxx_xm+'</span>\n' +
                    '                                </div>\n' +
                    '                                <div class="plzztc-row r-xb">\n' +
                    '                                    <label>性别：</label>\n' +
                    '                                    <span>'+listData.kxx_xb+'</span>\n' +
                    '                                </div>\n' +
                    '                                <div class="plzztc-row r-dw">\n' +
                    '                                    <label>单位：</label>\n' +
                    '                                    <span>'+listData.kxx_gzdw+'</span>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                            <div class="plzztc-card-zhang"></div>\n' +
                    '                            <div class="plzztc-card-bh"><label>编号：</label><span>'+listData.kxx_lskxh+'</span></div>\n' +
                    '                        </div>\n' +
                    '                        <div class="plzz-card-back">\n' +
                    '                        </div>\n' +
                    '                    </li>');
            }
            else if(kplb == "04"){
                ele_listContainer.append(' <li class="plzz-zt-card plzztc-sb" data-bm='+listData.ywblxx_kbh+' data-state='+listData.state+'>\n' +
                    '                        <div class="plzz-card-font1">\n' +
                    '                            <div class="plzztc-card-xx">\n' +
                    '                            <div class="plzztc-card-bh"><label>编号：</label><span>'+listData.kxx_lskxh+'</span></div>\n' +
                    '                        </div>\n' +
                    '                        </div>\n' +
                    '                        <div class="plzz-card-back1">\n' +
                    '                        </div>\n' +
                    '                    </li>');
            }
            else if(kplb == "05"){
                ele_listContainer.append(' <li class="plzz-zt-card plzztc-sb" data-bm='+listData.ywblxx_kbh+' data-state='+listData.state+'>\n' +
                    '                        <div class="plzz-card-font2">\n' +
                    '                            <div class="plzztc-card-xx">\n' +
                    '                            <div class="plzztc-card-bh"><label>编号：</label><span>'+listData.kxx_lskxh+'</span></div>\n' +
                    '                        </div>\n' +
                    '                        </div>\n' +
                    '                        <div class="plzz-card-back2">\n' +
                    '                        </div>\n' +
                    '                    </li>');
            }
            //其他证件在if后面跟else if
        }else if(flag=="1"){
            if(kplb == "01"){
                var src=basePath+"/read_PIC/tphx/"+listData.kxx_zplj;
                ele_listContainer.append(' <li class="plzz-zt-card plzzt-hb" data-bm='+listData.ywblxx_kbh+' data-state='+listData.state+'>\n' +
                    '                        <div class="plzz-card-font">\n' +
                    '                            <img class="plzztc-card-img" src='+src+'>\n' +
                    '                            <div class="plzztc-card-xx">\n' +
                    '                                <div class="plzztc-row r-xm">\n' +
                    '                                    <label>姓名：</label>\n' +
                    '                                    <span>'+listData.kxx_xm+'</span>\n' +
                    '                                </div>\n' +
                    '                                <div class="plzztc-row r-xb">\n' +
                    '                                    <label>性别：</label>\n' +
                    '                                    <span>'+listData.kxx_xb+'</span>\n' +
                    '                                </div>\n' +
                    '                                <div class="plzztc-row r-dw">\n' +
                    '                                    <label>单位：</label>\n' +
                    '                                    <span>'+listData.kxx_gzdw+'</span>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                            <div class="plzztc-card-zhang"></div>\n' +
                    '                            <div class="plzztc-card-bh"><label>编号：</label><span>'+listData.kxx_lskxh+'</span></div>\n' +
                    '                        </div>\n' +
                    '                        <div class="plzz-card-back">\n' +
                    '                            <span class="plzztc-card-lh">'+listData.kxx_lh+'</span>\n' +
                    '                        </div>\n' +
                    '                    </li>');
            }
            else if(kplb == "02"){
                var src=basePath+"/read_PIC/tphx/"+listData.kxx_zplj;
                ele_listContainer.append(' <li class="plzz-zt-card plzzt-hb" data-bm='+listData.ywblxx_kbh+' data-state='+listData.state+'>\n' +
                    '                        <div class="plzz-card-font">\n' +
                    '                            <img class="plzztc-card-img" src='+src+'>\n' +
                    '                            <div class="plzztc-card-xx">\n' +
                    '                                <div class="plzztc-row r-xm">\n' +
                    '                                    <label>姓名：</label>\n' +
                    '                                    <span>'+listData.kxx_xm+'</span>\n' +
                    '                                </div>\n' +
                    '                                <div class="plzztc-row r-xb">\n' +
                    '                                    <label>性别：</label>\n' +
                    '                                    <span>'+listData.kxx_xb+'</span>\n' +
                    '                                </div>\n' +
                    '                                <div class="plzztc-row r-dw">\n' +
                    '                                    <label>单位：</label>\n' +
                    '                                    <span>'+listData.kxx_gzdw+'</span>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                            <div class="plzztc-card-zhang"></div>\n' +
                    '                            <div class="plzztc-card-bh"><label>编号：</label><span>'+listData.kxx_lskxh+'</span></div>\n' +
                    '                        </div>\n' +
                    '                        <div class="plzz-card-back1">\n' +
                    '                            <span class="plzztc-card-lh">'+listData.kxx_lh+'</span>\n' +
                    '                        </div>\n' +
                    '                    </li>');
            }
            else if(kplb == "03"){
                var src=basePath+"/read_PIC/tphx/"+listData.kxx_zplj;
                ele_listContainer.append(' <li class="plzz-zt-card plzztc-sb" data-bm='+listData.ywblxx_kbh+' data-state='+listData.state+'>\n' +
                    '                        <div class="plzz-card-font">\n' +
                    '                            <img class="plzztc-card-img" src='+src+'>\n' +
                    '                            <div class="plzztc-card-xx">\n' +
                    '                                <div class="plzztc-row r-xm">\n' +
                    '                                    <label>姓名：</label>\n' +
                    '                                    <span>'+listData.kxx_xm+'</span>\n' +
                    '                                </div>\n' +
                    '                                <div class="plzztc-row r-xb">\n' +
                    '                                    <label>性别：</label>\n' +
                    '                                    <span>'+listData.kxx_xb+'</span>\n' +
                    '                                </div>\n' +
                    '                                <div class="plzztc-row r-dw">\n' +
                    '                                    <label>单位：</label>\n' +
                    '                                    <span>'+listData.kxx_gzdw+'</span>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                            <div class="plzztc-card-zhang"></div>\n' +
                    '                            <div class="plzztc-card-bh"><label>编号：</label><span>'+listData.kxx_lskxh+'</span></div>\n' +
                    '                        </div>\n' +
                    '                        <div class="plzz-card-back">\n' +
                    '                            <span class="plzztc-card-lh">'+listData.kxx_lh+'</span>\n' +
                    '                        </div>\n' +
                    '                    </li>');
            }
            else if(kplb == "04"){
                ele_listContainer.append(' <li class="plzz-zt-card plzztc-sb" data-bm='+listData.ywblxx_kbh+' data-state='+listData.state+'>\n' +
                    '                        <div class="plzz-card-font1">\n' +
                    '                            <div class="plzztc-card-xx">\n' +
                    '                            <div class="plzztc-card-bh"><label>编号：</label><span>'+listData.kxx_lskxh+'</span></div>\n' +
                    '                        </div>\n' +
                    '                        </div>\n' +
                    '                        <div class="plzz-card-back1">\n' +
                    '                        </div>\n' +
                    '                    </li>');
            }
            else if(kplb == "05"){
                ele_listContainer.append(' <li class="plzz-zt-card plzztc-sb" data-bm='+listData.ywblxx_kbh+' data-state='+listData.state+'>\n' +
                    '                        <div class="plzz-card-font2">\n' +
                    '                            <div class="plzztc-card-xx">\n' +
                    '                            <div class="plzztc-card-bh"><label>编号：</label><span>'+listData.kxx_lskxh+'</span></div>\n' +
                    '                        </div>\n' +
                    '                        </div>\n' +
                    '                        <div class="plzz-card-back2">\n' +
                    '                        </div>\n' +
                    '                    </li>');
            }
            //其他证件在if后面跟else if
        }
        //出入证


    },
    //创建卡片失败状态列表
    createSbCardList:function (ele_listContainer,listData,kplb) {
        if(kplb == "01"){
            ele_listContainer.append(' <li>\n' +
                '                        <i></i>\n' +
                '                        <span class="plzztc-xm" title='+listData.kxx_xm+'>'+listData.kxx_xm+'</span>\n' +
                '                        <span class="plzztc-xb" title='+listData.kxx_xb+'>'+listData.kxx_xb+'</span>\n' +
                '                        <span class="plzztc-bm" title='+listData.kxx_xb+'>'+listData.kxx_gzdw+'</span>\n' +
                '                    </li>')
        }
        else if(kplb == "02"){
            ele_listContainer.append(' <li>\n' +
                '                        <i></i>\n' +
                '                        <span class="plzztc-xm" title='+listData.kxx_xm+'>'+listData.kxx_xm+'</span>\n' +
                '                        <span class="plzztc-xb" title='+listData.kxx_xb+'>'+listData.kxx_xb+'</span>\n' +
                '                        <span class="plzztc-bm" title='+listData.kxx_gzdw+'>'+listData.kxx_gzdw+'</span>\n' +
                '                    </li>')
        }
        else if(kplb == "03"){
            ele_listContainer.append(' <li>\n' +
                '                        <i></i>\n' +
                '                        <span class="plzztc-xm" title='+listData.kxx_xm+'>'+listData.kxx_xm+'</span>\n' +
                '                        <span class="plzztc-xb" title='+listData.kxx_xb+'>'+listData.kxx_xb+'</span>\n' +
                '                        <span class="plzztc-bm" title='+listData.kxx_gzdw+'>'+listData.kxx_gzdw+'</span>\n' +
                '                    </li>')
        }
        else if(kplb == "04"){
            ele_listContainer.append(' <li>\n' +
                '                        <i></i>\n' +
                '                        <span class="plzztc-xm" title='+listData.kxx_lh+'>'+listData.kxx_lh+'</span>\n' +
                '                        <span class="plzztc-xb" title='+listData.kxx_lskxh+'>'+listData.kxx_lskxh+'</span>\n' +
                '                    </li>')
        }
        else if(kplb == "05"){
            ele_listContainer.append(' <li>\n' +
                '                        <i></i>\n' +
                '                        <span class="plzztc-xm" title='+listData.kxx_lh+'>'+listData.kxx_lh+'</span>\n' +
                '                        <span class="plzztc-xb" title='+listData.kxx_lskxh+'>'+listData.kxx_lskxh+'</span>\n' +
                '                    </li>')
        }
    },
    /*批量制证弹层的操作方法开始*/

    //表单数据json数据化，其中data是$(form).serializeArray()
    serializeObject: function (data) {
        var o = {};
        var a = data;
        // //console.log(Object.prototype.toString.call(data))
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    },
}