(function($) {

    var errorStyle = {
        'position'      : 'absolute',
        'left'          : '5px',
        'background'    : '#076fbb',
        'padding'       : '6px 10px 6px 0px',
        'color'         : 'white',
        'font-size'     : '12px',
        'z-index'       : '999',
        'border-radius' : '5px',
        'display'       : 'none'
    }

    $.extend({
        addErrorLabel: function($element) {
            if(!$element) {
                return;
            }
            if($element.is('form')) {
                $element.find('input').each(function() {
                    var errorL = createLabel();
                    if($(this).is(':radio')) {
                        addToRadio(errorL, $(this));
                    } else if($(this).is(':checkbox')) {
                        addToCheckbox(errorL, $(this));
                    } else {
                        addToOther(errorL, $(this));
                    }
                });
                $element.find('select').each(function() {
                    addToOther(createLabel(), $(this));
                });
                $element.find('textarea').each(function() {
                    addToOther(createLabel(), $(this));
                });
            } else if($element.is(':radio')) {
                addToRadio(createLabel(), $element);
            } else if($element.is(':checkbox')) {
                addToCheckbox(createLabel(), $element);
            } else {
                addToOther(createLabel(), $element);
            }
        },
        removeErrorLabel: function($element) {
            if($element.is(":checkbox")) {
                var $errLabel = $element.parent().parent().find('label.error');
            } else {
                var $errLabel = $element.parent().find('label.error');
            }
            if($errLabel) {
                $errLabel.remove();
            }
        },
        showErrorLabel: function($element, msg) {
            if($element.is(":checkbox")) {
                var $errLabel = $element.parent().parent().find('label.error');
            } else {
                var $errLabel = $element.parent().find('label.error');
            }
            if($errLabel) {
                $errLabel.css('display', 'block').html(msg);
            }
        },
        hideErrorLabel: function($element) {
            if($element.is(":checkbox")) {
                var $errLabel = $element.parent().parent().find('label.error');
            } else {
                var $errLabel = $element.parent().find('label.error');
            }
            if($errLabel) {
                $errLabel.css('display', 'none');
            }
        }
    });

    function createLabel() {
        var errorLabel = document.createElement('label');
        $(errorLabel).addClass('error').css(errorStyle);
        return $(errorLabel);
    }

    function addToRadio($error, $element) {
        $error.css('top', $element.height() + 10 + 'px');
        $error.appendTo($element.parent());
        $error.width('auto');
    }

    function addToCheckbox($error, $element) {
        $error.css('top', $element.height() + 10 + 'px');
        $element.parent().parent().append($error);
        $error.width('auto');
    }

    function addToOther($error, $element) {
        $error.css('top', $element.height() + 10 + 'px');
        $error.insertAfter($element);
    }

})(jQuery);

//(function(styleStr) {
//    var s = document.createElement("style");
//    s.innerText = styleStr;
//    document.head.appendChild(s);
//}('label.error:before {content: "";border-bottom: 8px solid #076fbb;border-top: 5px solid transparent;border-left: 5px solid transparent;border-right: 5px solid transparent;position: relative;top: -36px;left: 10px;}'));

//改变错误提示框位置及样式,参数error提示框、element为input框
var showErr = function(error, element) {
//    var oStyle = {
//            "position": "absolute",
//            "left":"0px",
//            "top":element.height()+10+"px",
//            "background": "#076fbb",
//            "padding": "6px 10px 6px 0px",
//            "color": "white",
//            "font-size": "12px",
//            "z-index":"999",
//            "border-radius":"5px",
//        };
//        error.css(oStyle);
    //判断element属于input的哪种类型，根据类型插入到页面
    if (element.is(":radio")) {
        error.appendTo(element.parent());
        error.width('auto');
    } else if (element.is(":checkbox")) {
        element.parent().parent().append(error);
        error.width('auto');
    }else {
        error.insertAfter(element);
    }
}

