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
    //发送请求新建
    $.ajax({
        url:basePath+"/note/create",
        type:"post",
        async:false,
        data:$("#form1").serializeArray(),
        success:function (data) {
            var vbs = data.data;
            //关闭弹框
            cancel();
            //刷新页面
            var $list = $("#list");
            var $input = "";
            if(vbs.noteType == "1"){  //笔记
                $input = '<a class="btn btn-large btn-primary" onmousedown="right(event)" href="#">'+data.data.noteName+'<input type="hidden" value="'+data.data.noteId+'"></a>'
            }else {      //文件
                $input = '<a class="btn btn-large btn-warning" onmousedown="right(event)" href="#">'+data.data.noteName+'<input type="hidden" value="'+data.data.noteId+'"></a>';
            }
            $list.append($input);
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
$(document).on('click','.file',function () {
    var id = $(this).find("input").val();
    $("#noteParent").val(id);
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
                        $input += '<a class="btn btn-large btn-primary" onmousedown="right(event)"  href="#">'+vbs[i].noteName+'<input type="hidden" value="'+vbs[i].noteId+'"></a>'
                    }else {      //文件
                        $input += '<a class="btn btn-large btn-warning file" onmousedown="right(event)"  href="#">'+vbs[i].noteName+'<input type="hidden" value="'+vbs[i].noteId+'"></a>';
                    }
                }
                $("#list").empty();
                var $list = $("#list");
                $list.append($input);
            }else {
                $("#list").empty();
                var tip = "<span>快来创建笔记吧</span>";
                var $list = $("#list");
                $list.append(tip);
            }
        }
    })
})

/*
* 右击文件弹框
* */
function right(e) {
    if(3 == e.which){
        //取消浏览器自带右击事件
        document.oncontextmenu = function(e){
            return false;
        }
        //执行删除操作
        layer.confirm("删除该文件？",{btn:['确定','取消'],title:"提示"},function () {
            $.ajax({
                url:basePath+"note/delete",
                type:"post",
                data:$("#form1").serializeArray(),
                async:true,
                success:function (data) {
                    alert(data.data.msg)
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
            if (data.data != ""){
                var vbs = data.data;
                var $input = "";
                for(var i=0 ; i<vbs.length ; i++){
                    if(vbs[i].noteType == "1"){  //笔记
                        $input += '<a class="btn btn-large btn-primary" onmousedown="right(event)"  href="#">'+vbs[i].noteName+'<input type="hidden" value="'+vbs[i].noteId+'"></a>'
                    }else {      //文件
                        $input += '<a class="btn btn-large btn-warning file" onmousedown="right(event)"  href="#">'+vbs[i].noteName+'<input type="hidden" value="'+vbs[i].noteId+'"></a>';
                    }
                }
                var $list = $("#list");
                $list.append($input);
            }else {
                $("#list").empty();
                var tip = "<span>快来创建笔记吧</span>";
                var $list = $("#list");
                $list.append(tip);
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
                    $input += '<a class="btn btn-large btn-primary" href="#">'+vbs[i].noteName+'<input type="hidden" value="'+vbs[i].noteId+'"></a>'
                }
                var $list = $("#list");
                $list.append($input);
            }else {
                $("#list").empty();
                var tip = "<span>没有文档哦</span>";
                var $list = $("#list");
                $list.append(tip);
            }
        }
    })
})

