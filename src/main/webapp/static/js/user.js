function query_name(ele) {
        if (ele != "" && ele != undefined){
            var data = '{"userName":"'+ele+'"}';
            $.ajax({
                url:basePath+"/user/queryName",
                type:"post",
                async:true,
                data:JSON.parse(data),
                success:function (data) {
                    if (data.status != "1"){
                        qzn++;
                    }else{
                        if (qzn > 0 ){
                            qzn--;
                        }
                    }
                    return data.status;
                }
            })
        }
    }

    function query_email(ele) {
        if (ele != "" && ele != undefined){
            var data = '{"userEmail":"'+ele+'"}';
            $.ajax({
                url:basePath+"/user/queryEmail",
                type:"post",
                async:true,
                data:JSON.parse(data),
                success:function (data) {
                    if (data.status != "1"){
                        qze++;
                    }else{
                        if (qze > 0 ){
                            qze--;
                        }
                    }
                    return data.status;
                }
            })
        }
    }

    function query_phone(ele) {
        if (ele != "" && ele != undefined){
            var data = '{"userPhone":"'+ele+'"}';
            $.ajax({
                url:basePath+"/user/queryPhone",
                type:"post",
                async:true,
                data:JSON.parse(data),
                success:function (data) {
                    if (data.status != "1"){
                        qzp++;
                    }else{
                        if (qzp > 0 ){
                            qzp--;
                        }
                    }
                    return data.status;
                }
            })
        }
    }