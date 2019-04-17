/**
 * 新建笔记
 */
$("#c_note").click(function () {
    $("#czmc").text("新建笔记");
    $(".z0_ymc").css("display","none");
    $(".z0_xz").css("display","block");
    //设置文件信息
    $("#noteType").val("1");
});
/*新建文件夹*/
$("#c_file").click(function () {
    $("#czmc").text("新建文件夹");
    $(".z0_ymc").css("display","none");
    $(".z0_xz").css("display","block");
    //设置文件信息
    $("#noteType").val("2");
})
/*
* 确认
* */
function confirm() {
    if ($("#noteName").val() == ""){
        layer.alert("请输入文件名");
        return;
    }
    //发送请求新建
    $.ajax({
        url:basePath+"/note/create",
        type:"post",
        async:false,
        data:$("#form1").serializeArray(),
        success:function (data) {
            if (data.status == "1"){
                var vbs = data.data;
                //关闭弹框
                cancel();
                //刷新页面
                var $list = $("#list");
                var $input = "";
                if(vbs.noteType == "1"){  //笔记
                    $input = '<a class="btn btn-large btn-primary" onmousedown="right(event)" href="#">'+data.data.noteName+'<input type="hidden" value="'+data.data.noteId+';"></a>'
                }else {      //文件
                    $input = '<a class="btn btn-large btn-warning" onmousedown="right(event)" href="#">'+data.data.noteName+'<input type="hidden" value="'+data.data.noteId+'"></a>';
                }
                $list.append($input);
            }else {
                layer.alert(data.msg);
            }
        }
    })
}
/*
* 取消
* */
function cancel() {
    $(".z0_xz").css("display","none");
}

/**
 * 点击文件名加载下一层
 * */
$(document).on('click','.btn-large',function () {
    var id = $(this).find("input").val();
    var endstr = id.substring(id.length-1,id.length);
    if (";" == endstr){
        id = id.substring(0,id.length-1);
        $("#noteId").val(id);
        $.ajax({
            url:basePath+"/note/ncontent",
            type:"post",
            data:$("#form1").serializeArray(),
            dataType:"json",
            success:function (data) {
                if (data.data){
                    var vbs = data.data;
                    //文件内容展示
                    $(".title").text(vbs.noteName);
                    $(".redactor_editor").html(vbs.noteContent);
                    $("#noteId").val(vbs.noteId);
                }
            }
        })
    }else {
        $("#noteParent").val(id);
        getTree();
    }
})
function getTree() {
    $.ajax({
        url:basePath+"/note/gettree",
        type:"post",
        data:$("#form1").serializeArray(),
        dataType:"json",
        success:function (data) {
            if (data.data != ""){
                var vbs = data.data;
                var $input = "";
                for(var i=0 ; i<vbs.length ; i++){
                    if(vbs[i].noteType == "1"){  //笔记
                        $input += '<a class="btn btn-large btn-primary" onmousedown="right(event)"  href="#">'+vbs[i].noteName+'<input type="hidden" value="'+vbs[i].noteId+';"></a>'
                    }else {      //文件
                        $input += '<a class="btn btn-large btn-warning" onmousedown="right(event)"  href="#">'+vbs[i].noteName+'<input type="hidden" value="'+vbs[i].noteId+'"></a>';
                    }
                }
                $("#list").empty();
                var $list = $("#list");
                $list.append($input);
                if (vbs[0].noteType == "1"){
                    //文件内容展示
                    $(".title").text(vbs[0].noteName);
                    $(".redactor_editor").html(vbs[0].noteContent);
                    $("#noteId").val(vbs[0].noteId);
                }
                $("#noteParent").val($("#upper").val())
            }else {
                $("#list").empty();
            }
        }
    })
}
/*
* 右击文件弹框 删除
* */
function right(e) {
    if(3 == e.which){
        //取消浏览器自带右击事件
        document.oncontextmenu = function(e){
            return false;
        }
        var id = $(this).find().val();
        alert(id)
        $("#noteId").val("001002002000000000");
        //执行删除操作
        layer.confirm("删除该文件？",{btn:['确定','取消'],title:"提示"},function () {
            $.ajax({
                url:basePath+"/note/invalid",
                type:"post",
                data:$("#form1").serializeArray(),
                async:true,
                success:function (data) {
                    layer.closeAll();
                    alert(data.data.msg);
                    //页面刷新

                }
            })
        })
    }
}


/**
 * 加载我的文件夹下文件
 * */
function loadleft() {
    $.ajax({
        url:basePath+"/note/left",
        type:"post",
        dataType:"json",
        success:function (data) {
            $("#upper").val("001000000000000000");
            $("#noteParent").val($("#upper").val());
            if (data.data != ""){
                var vbs = data.data;
                var $input = "";
                for(var i=0 ; i<vbs.length ; i++){
                    if(vbs[i].noteType == "1"){  //笔记
                        $input += '<a class="btn btn-large btn-primary" onmousedown="right(event)"  href="#">'+vbs[i].noteName+'<input type="hidden" value="'+vbs[i].noteId+';"></a>'
                    }else {      //文件
                        $input += '<a class="btn btn-large btn-warning" onmousedown="right(event)"  href="#">'+vbs[i].noteName+'<input type="hidden" value="'+vbs[i].noteId+'"></a>';
                    }
                }
                $("#list").empty();
                var $list = $("#list");
                $list.append($input);
                if (vbs[0].noteType == "1"){
                    //文件内容展示
                    $(".title").text(vbs[0].noteName);
                    $(".redactor_editor").html(vbs[0].noteContent);
                    $("#noteId").val(vbs[0].noteId);
                }
            }else {
                $("#list").empty();
            }
        }
    })
}

/*
* 点击我的文件夹
* */
$("#mine").click(function () {
    $("#list").empty();
    loadleft();
})

/*
* 加载最近修改的文档
* */
$("#lately").click(function () {
    $("#list").empty();
    $.ajax({
        url:basePath+"/note/notes",
        type:"post",
        dataType:"json",
        success:function (data) {
            if (data.data != ""){
                var vbs = data.data;
                var $input = "";
                for(var i=0 ; i<vbs.length ; i++){
                    $input += '<a class="btn btn-large btn-primary" href="#">'+vbs[i].noteName+'<input type="hidden" value="'+vbs[i].noteId+';"></a>'
                }
                var $list = $("#list");
                $list.append($input);
                //文件内容展示
                $(".title").text(vbs[0].noteName);
                $(".redactor_editor").html(vbs[0].noteContent);
                $("#noteId").val(vbs[0].noteId);
            }else {
                $("#list").empty();
            }
        }
    })
})


/**
 * 回收站
 */
$("#recycleBin").click(function () {
    $.ajax({
        url:basePath+"/note/recycleBin",
        type:"post",
        dataType:"json",
        success:function (data) {
            if (data.data != ""){
                var vbs = data.data;
                var $input = "";
                for(var i=0 ; i<vbs.length ; i++){
                    if(vbs[i].noteType == "1"){  //笔记
                        $input += '<a class="btn btn-large btn-primary" onmousedown="recover_delete(event)"  href="#">'+vbs[i].noteName+'<input type="hidden" value="'+vbs[i].noteId+'"></a>'
                    }else {      //文件
                        $input += '<a class="btn btn-large btn-warning" onmousedown="recover_delete(event)"  href="#">'+vbs[i].noteName+'<input type="hidden" value="'+vbs[i].noteId+'"></a>';
                    }
                }
                $("#list").empty();
                var $list = $("#list");
                $list.append($input);
                if (vbs[0].noteType == "1"){
                    //文件内容展示
                    $(".title").text(vbs[0].noteName);
                    $(".redactor_editor").html(vbs[0].noteContent);
                    $("#noteId").val(vbs[0].noteId);
                }
            }else {
                $("#list").empty();
            }
        }
    })
})

/*
* 右击文件弹框 删除
* */
function recover_delete(e) {
    if(3 == e.which){
        //取消浏览器自带右击事件
        document.oncontextmenu = function(e){
            return false;
        }
        var id = $(this).find().val();
        alert(id)
        $("#noteId").val(id);
        //恢复文件 或  永久删除

    }
}

/**
 * 点击保存
 */
$("#save").click(function () {
    var content = $(".redactor_editor").html();
    $("#noteContent").val(content);
    $.ajax({
        url:basePath+"/note/save",
        type:"post",
        data:$("#form1").serializeArray(),
        async:true,
        dataType:"json",
        success:function (data) {
            alert(data.msg);
        }
    })
})


$("#return").click(function () {
    getTree();
})