/**
 * 新建笔记
 */
$("#c_note").click(function () {

});
/*新建文件夹*/
$("#c_file").click(function () {
    $("#czmc").text("新建文件夹");
    $(".z0_ymc").css("display","none");
    $(".z0_xz").css("display","block");

})
/*
* 确认
* */
function confirm() {
    $.ajax({
        url:basePath+"/note/create",
        type:"post",
        async:false,
        data:$("#form1").serializeArray(),
        success:function (data) {
            alert(data.msg)
        }
    })
}
function cancel() {
    $(".z0_xz").css("display","none");
}


/**
 * 点击文件名加载下一层
 * */
function next() {
    var idtype = $(this).find("input").val();
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
                        $input += '<a class="btn btn-large btn-primary" href="#">'+vbs[i].noteName+'<input type="hidden" value="'+vbs[i].noteId+'"></a>'
                    }else {      //文件
                        $input += '<a class="btn btn-large btn-warning" onclick="next()" href="#">'+vbs[i].noteName+'<input type="hidden" value="'+vbs[i].noteId+'"></a>';
                    }
                }
                var $list = $("#list");
                $list.append($input);
            }else {
                return;
            }
        }
    })
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
                        $input += '<a class="btn btn-large btn-primary" href="#">'+vbs[i].noteName+'<input type="hidden" value="'+vbs[i].noteId+'"></a>'
                    }else {      //文件
                        $input += '<a class="btn btn-large btn-warning" onclick="next()" href="#">'+vbs[i].noteName+'<input type="hidden" value="'+vbs[i].noteId+'"></a>';
                    }
                }
                var $list = $("#list");
                $list.append($input);
            }else {
                return;
            }
        }
    })
}

/**
 * 弹层
 * */