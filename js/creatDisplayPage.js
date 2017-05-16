$(function() {
    // store.clear();
    // 管理全局变量 
    var until = {
        selectAll: false,
    };

    function displaypage() {

    }
    displaypage.prototype = {
        init: function() {
            this.refresh();
            // dom绑定事件
            var $container = $('.display-compile tbody');
            this.events($container);
            return this;
        },
        events: function($container) {
            var self = this;
            // 删除问卷
            $container.find('.tr_delete').on('click', function() {
                var nowTr = $(this).parent().parent().parent().parent();
                var num = $('.display-compile tr').index(nowTr);
                var questionaire_list = store.get('questionaire_list');
                questionaire_list[num] = null;

                console.log(1, questionaire_list);

                var questionaire_list_new = self.reorderData(questionaire_list);                                
                store.set('questionaire_list', questionaire_list_new);

                nowTr.remove();

                self.refresh();

                var new1=store.get('questionaire_list');
                console.log(2,new1)
            });
            // 填写问卷
            $container.find('.tr_write').on('click', function(){
                
                var nowTr = $(this).parent().parent().parent().parent();
                var num = $('.display-compile tr').index(nowTr);
                store.set('num',num);
                $(this).attr('href','./writeForm.html');

            });
            // 查看数据
            $container.find('.tr_check').on('click', function(){

            });
        },
        reorderData: function(questionaire_list) {
            // 处理lcoalhost中的数据
            var arr = [];
            for (var i = 0; i < questionaire_list.length; i++) {
                if (questionaire_list[i] != null) {
                    arr.push(questionaire_list[i]);
                };
            };

            store.remove('questionaire_list');
            var questionaire_list_new=[];
            for (var i = 0; i < arr.length; i++) {
                questionaire_list_new.push(arr[i]);
            };
            return questionaire_list_new;
        },
        refresh:function(){
            $('.display-compile tr').remove();
            var questionaire_list = store.get('questionaire_list');
            var $container = $('.display-compile tbody');
            for (var i = 0; i < questionaire_list.length; i++) {
                if (questionaire_list[i] == null) {
                    continue;
                } else if (questionaire_list[i].title == '') {
                    continue;
                }

                var $tr = $('<tr></tr>');
                var $tdTitle = $('<td class="title"><input type="checkbox" class="fl"><span>' + questionaire_list[i].title + '</span></td>')
                var $tdTime = $('<td><span class="time">' + questionaire_list[i].year + '-' + questionaire_list[i].month + '-' + questionaire_list[i].date + '</span></td>')
                var $tdElse = $('<td><ul><li><a href="#" class="tr_delete">删除</a></li><li><a href="javascript:" class="tr_write">填写问卷</a></li><li></li></ul></td>');
                $tr.append($tdTitle);
                $tr.append($tdTime);
                $tr.append($tdElse);
                $container.append($tr);
            };

            this.events($container);
        },
    }

    var createDisplayPage = new displaypage();
    createDisplayPage.init();
})
