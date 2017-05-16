function creatSelect() {
    // 该对象的默认参数
    this.cfg = {
        type: 'selectOne',
        creatSelectNum: 'Q1',
        creatSelectTitle: '文本',
        creatSelectContent: 'selectMany', //selectMany/textarea
        target: 'body',
    };
}
creatSelect.prototype = {
    init: function(cfg) {
        // 根据参数生成对应的dom结构，插入页面
        var CFG = $.extend(this.cfg, cfg);
        var self = this;
        var $select = $('<div class="creatSelect"><div class="creatSelect_div_head"><span class="creatSelect_span_num">' + this.renderQnum() + '</span><span class="creatSelect_span_title">' + CFG.creatSelectTitle + '</span></div></div>');

        var $creatSelectContent = null;
        switch (CFG.type) {
            case 'selectOne':
                $creatSelectContent = $('<div class="creatSelect_div_content" compileType="selectOne"><ul><li><input type="text" value="选项" class="creatSelect_content_input"><span class="creatSelect_content_X">X</span></li><li><input type="text" value="选项" class="creatSelect_content_input"><span class="creatSelect_content_X">X</span></li></ul></div>');
                break;
            case 'selectMany':
                $creatSelectContent = $('<div class="creatSelect_div_content" compileType="selectMany"><ul><li><input type="text" value="选项" class="creatSelect_content_input"><span class="creatSelect_content_X">X</span></li><li><input type="text" value="选项" class="creatSelect_content_input"><span class="creatSelect_content_X">X</span></li><li><input type="text" value="选项" class="creatSelect_content_input"><span class="creatSelect_content_X">X</span></li><li><input type="text" value="选项" class="creatSelect_content_input"><span class="creatSelect_content_X">X</span></li></ul></div>');
                break;
            case 'textarea':
                $creatSelectContent = $('<div class="creatSelect_div_content" compileType="textarea"><textarea cols="40" rows="10"></textarea></div>');
                break;
            default:

                break;
        };
        var $creatSelectAddNewSelect = $('<div class="creatSelect_div_addNewSelect">增加选项</div>');
        var $creatSelectControl = $('<div class="creatSelect_div_control fr"><ul><li class="creatSelect_div_up fl">上移</li><li class="creatSelect_div_down fl">下移</li><li class="creatSelect_div_copy fl">复用</li><li class="creatSelect_div_delete fl">删除</li></ul></div>');
        $select.append($creatSelectContent);
        $select.append($creatSelectAddNewSelect);
        $select.append($creatSelectControl);
        // .creatSelect_div_content部分：绑定事件-删除某一项输入栏
        $creatSelectContent.find('.creatSelect_content_X').on('click', function() {
            $(this).parent().remove();
        });
        // .creatSelect_div_addNewSelect部分绑定事件-增加一项输入栏
        $creatSelectAddNewSelect.on('click', function() {
            var $newLi = $('<li><input type="text" value="选项" class="creatSelect_content_input"><span class="creatSelect_content_X">X</span></li>');
            $newLi.find('.creatSelect_content_X').on('click', function() {
                $(this).parent().remove();
            });
            $(this).parent().find('.creatSelect_div_content ul').append($newLi);
        });
        // .creatSelect_div_control部分绑定事件-上移，下移，复用，删除
        this.selectControlBindEvents($creatSelectControl,self,CFG);

        // JS根据传入参数，页面中已存在的.creatSelect结构生成符合要求的DOM结构，插入到页面中
        $(CFG.target).append($select);
        self.checkAllUpDown();
        self.renderQnum();
        return this;
    },
    selectControlBindEvents: function($selectControl,self,CFG) {
        $selectControl.find('.creatSelect_div_copy').on('click', function() {
            // 复用时，把当前点击的那个.creatSelect(记为B)clone一份
            // 为的是确定上下移按钮是否需要隐藏
            $(this).parent().parent().parent().clone(true).appendTo($(CFG.target));
            // B插入完成之后，刷新一次Qnum,如Q1,Q2
            self.refreshAllQnum();
            self.checkAllUpDown();
        });

        $selectControl.find('.creatSelect_div_delete').on('click', function() {
            $(this).parent().parent().parent().remove();
            self.refreshAllQnum();
            self.checkAllUpDown();
        });
        $selectControl.find('.creatSelect_div_up').on('click', function() {
            var $now = $(this).parent().parent().parent();
            // 找出当前点击的这个.creatSelect在页面中所有.creatSelect中是第几个
            var num = null;
            $('.creatSelect').each(function(index) {
                if ($(this).is($now)) {
                    return num = index;
                }
            });
            // 当前这个.creatSelect(记为B)插入到上一个.creatSelect(记为A)的前面
            // 为了将A上面绑定的事件保留，B需要先clone(true)后remove()
            $now.clone(true).insertBefore($('.creatSelect').eq(num - 1));
            $now.remove();
            // 重新编排Qnum,如Q1,Q2
            self.refreshAllQnum();
            self.checkAllUpDown();
        });
        $selectControl.find('.creatSelect_div_down').on('click', function() {
            var $now = $(this).parent().parent().parent();
            var num = null;
            $('.creatSelect').each(function(index) {
                if ($(this).is($now)) {
                    return num = index;
                }
            });

            if (num == $('.creatSelect').length - 1) {
                alert('已经是最后一个了');
                return;
            } else {
                $now.clone(true).insertAfter($('.creatSelect').eq(num + 1));
                $now.remove();

                self.refreshAllQnum();

                self.checkAllUpDown();

            };

        });
    },
    checkAllUpDown: function() {
        var $creatSelectNowNum = $('.creatSelect').length;
        var $creatSelect = $('.creatSelect');

        $('.creatSelect').each(function(i) {
            $(this).find('.creatSelect_div_up').show();
            $(this).find('.creatSelect_div_down').show();
        });

        if ($creatSelectNowNum == 1) {
            $creatSelect.eq(0).find('.creatSelect_div_up').hide();
        } else if ($creatSelectNowNum == 2) {
            $creatSelect.eq(0).find('.creatSelect_div_up').hide();
            $creatSelect.eq(1).find('.creatSelect_div_down').hide();
        } else if ($creatSelectNowNum > 2) {
            $creatSelect.eq(0).find('.creatSelect_div_up').hide();
            $creatSelect.eq($creatSelectNowNum - 1).find('.creatSelect_div_down').hide();
            for (var i = 1; i < $creatSelectNowNum - 1; i++) {
                $creatSelect.eq(i).find('.creatSelect_div_up').show();
                $creatSelect.eq(i).find('.creatSelect_div_down').show();
            }
        }
    },
    renderQnum: function() {
        // 每次添加一个init中的.creatSelect/点击复用按钮,给其一个符合其当前位置的Qnum，如Q1,Q2
        var Qnum = 'Q' + ($('.creatSelect').length + 1);
        return Qnum;
    },
    refreshAllQnum: function() {
        // 在执行上移/下移/删除操作后，执行该函数，更新每个.creatSelect的Qnum,如Q1,Q2
        $('.creatSelect').each(function(i) {
            $(this).find('.creatSelect_span_num').html('Q' + (i + 1));
        });
    },
};
