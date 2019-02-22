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
				return this.optional(element) || !(space.test(value));
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
		//验证是否符合正确的手机号码格式,参数params为true|false
		$.validator.addMethod("mobile", function(value, element, params) {
			if (params) {
				var mobile = /^((\(\d{3}\))|(\d{3}\-))?13\d{9}$/;
				return this.optional(element) || (mobile.test(value));
			} else {
				return;
			}
		}),
		//验证输入内容是否包含特殊字符，参数params为true|false
		$.validator.addMethod("characters", function(value, element, params) {
			if (params) {
				var character = /[~!@#$*^&()=|{}':;',\\.<>/?]/;
				return this.optional(element) || (character.test(value));
			} else {
				return;
			}
		}),
		//验证是否包含空格,参数params为true|false
		$.validator.addMethod("space", function(value, element, params) {
			if (params) {
				var space = /\s+/;
				return this.optional(element) || !(space.test(value));
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
				var pwd = /^[a-z0-9_-]{6,18}$/;
				return this.optional(element) || (pwd.test(value));
			} else {
				return;
			}
		}),
		//验证密码格式是否符数字、字母、下划线、6-18位组成，参数params为true|false
		$.validator.addMethod("hzdyz", function(value, element, params) {
			if (params) {
				var hzdyz = /^[a-z0-9]{20}$/;
				return this.optional(element) || (hzdyz.test(value));
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
		})
		//姓名校验，中文姓名、英文姓名，参数params为true|false
//		$.validator.addMethod("name", function(value, element, params) {
//			if (params) {
//				var name = /^[\u4e00-\u9fa5]{2,20}$/;
//				return this.optional(element) || (name.test(value));
//			} else {
//				return;
//			}
//		})
}));