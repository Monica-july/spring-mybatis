/**
 * 自定义验证方法
 * addMethod(name,method,message)方法
 *     name： 指添加的方法的名字
 *     method： 是一个函数，接收三个参数(value,element,params)。返回true|false，true表示验证通过，false表示验证未通过
 *         value：指元素的值
 *         element：指元素本身
 *         params：指参数
 *     message：(可选)指验证未通过时显示的信息
 */
(function(factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery", "./jquery.validate"], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(require("jquery"));
    } else {
        factory(jQuery);
    }
}(function($) {
    $.validator.addMethod("nameIsExist",function (value,element) {
        var status = query_name(value);
        return this.optional(element) || value == '1';
    },"用户名已注册");

    $.validator.addMethod("emailIsExist",function (value,element) {
        var status = query_email(value);
        return this.optional(element) || value == '1';
    },"emial已注册");

    $.validator.addMethod("phoneIsExist",function (value,element) {
        var status = query_phone(value);
        return this.optional(element) || value == '1';
    },"电话号码已注册");


    //验证是否只包含中文,参数params为true|false
    $.validator.addMethod("mustChinese", function(value, element, params) {
        if (params) {
            var chinese = /^[\u0391-\uFFE5]+$/;
            return this.optional(element) || (chinese.test(value));
        } else {
            return;
        }
    }),
        //验证是否符合身份证号格式,参数params为true|false
        $.validator.addMethod("idCard", function(value, element, params) {
            if (params) {
                var isIdCard = /^\d{15}(\d{2}[A-Za-z0-9])?$/;
                return this.optional(element) || (isIdCard.test(value));
            } else {
                return;
            }
        }),
        //验证是否包含空格,参数params为true|false
        $.validator.addMethod("space", function(value, element, params) {
            if (params) {
                var space = /\s+/;
                var isnull ="null";
                var isNULL ="NULL";
                return this.optional(element) || (!(space.test(value))&&value.indexOf(isnull) < 0&&value.indexOf(isNULL) < 0 );
            } else {
                return;
            }
        }),
        //验证是否只包含英文,参数params为true|false
        $.validator.addMethod("mustEnglish", function(value, element, params) {
            if (params) {
                var english = /^[A-Za-z]+$/;
                return this.optional(element) || (english.test(value));
            } else {
                return;
            }
        }),
        //验证是否符合邮箱的格式,参数params为true|false
        $.validator.addMethod("email", function(value, element, params) {
            if (params) {
                var email = /^\w+([-+.]\w+)*@\w+([-.]\\w+)*\.\w+([-.]\w+)*$/;
                return this.optional(element) || (email.test(value));
            } else {
                return;
            }
        }),
        //验证是否符合手机号码的格式,参数params为true|false
        $.validator.addMethod("phone", function(value, element, params) {
            if (params) {
                var phone = /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/;
                return this.optional(element) || (phone.test(value));
            } else {
                return;
            }
        }),
        //验证是否符合手机号码的格式,参数params为true|false
        $.validator.addMethod("mobilePhone", function(value, element, params) {
            if (params) {
                var phone = /^1[34578]\d{9}$/;
                return this.optional(element) || (phone.test(value));
            } else {
                return;
            }
        }),
        //验证是否符合正确的手机号码格式,参数params为true|false
        $.validator.addMethod("mobile", function(value, element, params) {
            if (params) {
                var mobile = /^((\(\d{3}\))|(\d{3}\-))?13\d{9}$/;
                return this.optional(element) || (mobile.test(value));
            } else {
                return;
            }
        }),
        //验证是否符合正确的QQ号码格式，参数params为true|false
        $.validator.addMethod("qqNum", function(value, element, params) {
            if (params) {
                var qqnum = /^[1-9][0-9]{4,}$/;
                return this.optional(element) || (qqnum.test(value));
            } else {
                return;
            }
        }),
        //验证用户名称为数字、字母、下划线、6-16为组成，参数params为true|false
        $.validator.addMethod("userName", function(value, element, params) {
            if (params) {
                var username = /^[a-z0-9_-]{3,16}$/;
                return this.optional(element) || (username.test(value));
            } else {
                return;
            }
        }),
        //验证密码格式是否符数字、字母、下划线、6-18位组成，参数params为true|false
        $.validator.addMethod("pWd", function(value, element, params) {
            if (params) {
                var pwd = /^[a-z0-9_-]{6,10}$/;
                return this.optional(element) || (pwd.test(value));
            } else {
                return;
            }
        }),
        //邮政编码验证，参数params为true|false
        $.validator.addMethod("postCode", function(value, element, params) {
            if (params) {
                var postcode = /^[1-9]\d{5}$/;
                return this.optional(element) || (postcode.test(value));
            } else {
                return;
            }
        }),
        //校验日期格式，参数params为true|false
        $.validator.addMethod("dateCheck", function(value, element, params) {
            if (params) {
                var datecheck = /^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}$/;
                return this.optional(element) || (datecheck.test(value));
            } else {
                return;
            }
        }),
        //校驗金額
        $.validator.addMethod("money", function(value, element, params) {
            if (params) {
                var datecheck = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
                return this.optional(element) || (datecheck.test(value));
            } else {
                return;
            }
        }),
        //校验文件压缩包格式，xxx.zip、xxx.gz、xxx.rar,参数params为true|false
        $.validator.addMethod("format", function(value, element, params) {
            if (params) {
                var format = /^\w+\.(zip|gz|rar)$/;
                return this.optional(element) || (format.test(value).length);
            } else {
                return;
            }
        }),
        //校验一组字符串的长度，参数params为true|false
        $.validator.addMethod("checkLength", function(value, element, params) {
            if (params) {
                var checklength = /[^\x00-\xff$]/g;
                return this.optional(element) || (checklength.test(value));
            } else {
                return;
            }
        }),
        //判断是否是params的整数倍
        $.validator.addMethod("multiple", function(value, element, params) {
            if (params) {
                return this.optional(element) || (value%params==0?true:false);
            } else {
                return;
            }
        }),
        //验证是否包含特殊中英文字符
        $.validator.addMethod("isContainsSpecialChar", function(value, element,params) {
            if (params) {
                var character = /[~!@%#$￥*^&()=|{}':;'",\\.<>/?]/;
                return this.optional(element) || (!character.test(value));
            } else {
                return;
            }
        }),
        //身份证号码校验
        $.validator.addMethod("isIdCardNo", function(value, element,params) {
            if (params) {
                var flag = checksfzh(value);
                if(flag){
                    var sfzhm = convertsfzh(value);
                    sfzhm = formatPersonId(sfzhm);
                    $(element).val(sfzhm);
                }
                return this.optional(element) || flag;
            }else{
                return;
            }
        }),
        //联系电话(手机/电话皆可)验证
        $.validator.addMethod("isPhone", function(value,element,params) {
            var length = value.length;
            var mobile = /^0*\d{11}$/;
            var tel = /^(\d{3,4}-)?\d{7,8}(-\d{1,4})?$/;
            return this.optional(element) || (tel.test(value) || mobile.test(value));
        }),
        // 只能输入[0-9]数字
        $.validator.addMethod("isDigits", function(value, element,params) {
            return this.optional(element) || /^\d+$/.test(value);
        }),
        //验证输入数值是否0开头的数字
        $.validator.addMethod("number0", function(value, element,params) {
            var f = true;
            if(value.length>1&&value.substring(0,1)=="0"){
                f = false;
            }
            return this.optional(element) || f;
        }),
        //验证16岁以下人数不超过本户外来人口数
        $.validator.addMethod("yz16srs", function(value, element,params) {
            var bhrks = $("#hxx_bhrks").val();
            var hxx_slsyxrks = $("#hxx_slsyxrks").val();
            var f =true;
            if(bhrks != null && bhrks != "" && hxx_slsyxrks!=null && hxx_slsyxrks!=""){
                if(eval(bhrks) < eval(hxx_slsyxrks)){
                    f = false;
                }
            }
            return this.optional(element) || f;
        }),
        //验证16岁以下男生人数不超过16岁以下人数
        $.validator.addMethod("yz16snsrs", function(value, element,params) {
            var hxx_slsyxrks = $("#hxx_slsyxrks").val();
            var hxx_slsyxnrks = $("#hxx_slsyxnrks").val();
            var f =true;
            if(hxx_slsyxnrks != null && hxx_slsyxnrks != "" && hxx_slsyxrks!=null && hxx_slsyxrks!=""){
                if(eval(hxx_slsyxrks) < eval(hxx_slsyxnrks)){
                    f = false;
                }
            }
            return this.optional(element) || f;
        }),
        //验证16岁以下男生人数不超过16岁以下人数
        $.validator.addMethod("yz16snvsrs", function(value, element,params) {
            var hxx_slsyxrks = $("#hxx_slsyxrks").val();
            var hxx_slsyxnvrks = $("#hxx_slsyxnvrks").val();
            var f =true;
            if(hxx_slsyxnvrks != null && hxx_slsyxnvrks != "" && hxx_slsyxrks!=null && hxx_slsyxrks!=""){
                if(eval(hxx_slsyxrks) < eval(hxx_slsyxnvrks)){
                    f = false;
                }
            }
            return this.optional(element) || f;
        }),
        //验证16岁以下男女生人数之和等于16岁以下人数
        $.validator.addMethod("yz16szh", function(value, element,params) {
            var hxx_slsyxrks = $("#hxx_slsyxrks").val();
            var hxx_slsyxnrks = $("#hxx_slsyxnrks").val();
            var hxx_slsyxnvrks = $("#hxx_slsyxnvrks").val();
            var f =true;
            if(hxx_slsyxnvrks != null && hxx_slsyxnvrks != "" && hxx_slsyxrks!=null && hxx_slsyxrks!=""&&hxx_slsyxnrks!=null&&hxx_slsyxnrks!=""){
                if(Number(hxx_slsyxrks) != (Number(hxx_slsyxnrks) + Number(hxx_slsyxnvrks))){
                    f =false;
                }
            }
            return this.optional(element) || f;
        });
    //姓名校验，中文姓名、英文姓名，参数params为true|false
//		$.validator.addMethod("name", function(value, element, params) {
//			if (params) {
//				var name = /^[\u4e00-\u9fa5]{2,20}$/;
//				return this.optional(element) || (name.test(value));
//			} else {
//				return;
//			}
//		})
    //验证是否符合组织机构代码的格式
    $.validator.addMethod("isZzjgdm", function(value, element, params) {
        if (params) {
            var zzjgdm = /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]$/;
            return this.optional(element) || (zzjgdm.test(value));
        } else {
            return;
        }
    }),
        //验证是否符合组织机构代码的格式
        $.validator.addMethod("isIMSI", function(value, element, params) {
            if (params) {
                var imsi = /^460\d{12}$/;
                return this.optional(element) || (imsi.test(value));
            } else {
                return;
            }
        })

    //验证是否符合组织机构代码的格式
    $.validator.addMethod("compareDate", function(value, element, params) {
        var startDate=jQuery(params).val();
        var date1=new Date(Date.parse(startDate.replace("-","/")));
        var date2=new Date(Date.parse(startDate.replace("-","/")));
        return date1<date2;
    })
}));
//验证身份证号码是否正确
function checksfzh(theStr)
{
    var  l_l_jym= new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1);
    var  l_l_total = 0;
    var strobject = new String(theStr);
    //位数校验
    var boolean1 = strobject.length!=15;
    var boolean2 = strobject.length!=18;
    if (boolean1 && boolean2)
    {
        return false;
    }
    //15校验
    if (strobject.length==15)
    {
        if(isNaN(strobject))
        {
            return false;
        }
        //15位转18位
        strobject=convertsfzh(theStr);
    }
    var l_s_temp = strobject.substr(0,17);
    if (isNaN(l_s_temp))
    {
        return false;
    }
    var LastNum = strobject.substring(17,18);
    if (isNaN(LastNum) && LastNum!="x" &&LastNum!="X")
    {
        return false;
    }
    var L_s_temp1 = strobject.substr(6,8);
    var L_s_temp  = new String(L_s_temp1);
    var year  = L_s_temp.substring(0,4);
    var month =  L_s_temp.substring(4,6);
    var day   =  L_s_temp.substring(6,8);
    var l_l_temp1;
    var L_s_csny = year + "-" + month + "-" + day;
    //是否是合法日期
    if (!ISDATEFORMAT(L_s_csny))
    {
        return false;
    }
    if (!ISDATE(L_s_csny))
    {
        return false;
    }
    for(var i=0;i<strobject.length - 1;i++)
    {
        l_l_temp1 = parseInt(strobject.substr(i,1),10) * l_l_jym[i];
        l_l_total += l_l_temp1;
    }
    if (!isNaN(strobject.substring(17,18)))
    {
        l_l_total += parseInt(strobject.substring(17,18));
    }
    if (strobject.substring(17,18)=="X" || strobject.substring(17,18)=="x")
    {
        l_l_total += 10;
    }
    l_l_total --;
    if (!(l_l_total%11==0))
    {
        return false;
    }
    return true;
}
function convertsfzh(theStr)
{
    var  l_l_jym= new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1);
    var  l_l_total = 0;
    var  last;
    var strobject1 = new String(theStr);
    if (strobject1.length==15)
    {
        var strobject = strobject1.substring(0,6) + "19" + strobject1.substring(6,15);
        for(var i=0;i<strobject.length;i++)
        {
            var l_l_temp1 = parseInt(strobject.substr(i,1),10) * l_l_jym[i];
            l_l_total += l_l_temp1;
        }
        l_l_total --;
        var lastnum = l_l_total % 11;//最后一位
        if (lastnum==0)
        {
            last = 0;
        }
        else
        {
            if (lastnum==1)
            {
                last="X";
            }
            else
            {
                last = 11 - lastnum;
            }
        }
        strobject = strobject + last;
        return strobject;
    }
    else
    {
        return strobject1;
    }
}
//将身份证号码后x统一格式化为大写
function formatPersonId(val){
    if(val==null||val=='')return;
    if(/\d{16,17}[x]$/.test(val)){
        return val.replace(/[x]$/,"X");
    }else{
        return val;
    }
}
//判断字符串是否符合日期格式，如1999-03-07
function ISDATEFORMAT(theStr)
{
    var strObj=new String(theStr);
    var strObjTemp;
    //1.theStr.length<>10
    if(strObj.length!=10)
        return false;
    //2.判断第五位、第八位是"-"
    if(strObj.substring(4,5)!="-")
        return false;
    if (strObj.substring(7,8)!="-")
        return false;
    //3.校验年部分是数字，并在1900~2100之间，月部分是数字，并在1~12之间，日部分是数字，并在1~31之间
    strObjTemp=new String(strObj.substring(0,4));
    if(!(ISNUMBER(strObjTemp)) || parseInt(strObjTemp,10)<=1900 || parseInt(strObjTemp,10)>2100)
        return false;
    strObjTemp=new String(strObj.substring(5,7));
    if  (!(ISNUMBER(strObjTemp)) || parseInt(strObjTemp,10) < 1  || parseInt(strObjTemp,10)>12)
        return false;
    strObjTemp=new String(strObj.substring(8,10));
    if(!(ISNUMBER(strObjTemp)) || parseInt(strObjTemp,10)<1 || parseInt(strObjTemp,10)>31)
        return false;
    return true;
}
function ISDATE(theStr)
{
    var strObj=new String(theStr);
    var theYear=parseInt(strObj.substring(0,4),10);
    var theMonth=parseInt(strObj.substring(5,7),10);
    var theDay=parseInt(strObj.substring(8,10),10);
    switch(theMonth)
    {
        case 4:
        case 6:
        case 9:
        case 11:
            if(theDay==31)
                return false;
            else
                break;
        case 2:
            if((theYear%4==0 || theYear%100==0) && theYear%400!=0)//润年2月份29天
            {
                if(theDay>29) return false;
            }
            else
            {
                if(theDay>28) return false;
            }
            break;
        default: break;
    }
    return true;
}
function ISNUMBER(theStr)
{
    if(isNaN(theStr))//判断不是数值型字符串
        return false;
    else
        return true;
}