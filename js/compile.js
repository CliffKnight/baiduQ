;
$(function() {
    // 生成单选问卷项的参数
    var cfgSelectOne = {
            type: 'selectOne',
            creatSelectNum: '',
            creatSelectTitle: '单选',
            target: '.questionaire_content',
        }
        // 生成多选问卷项的参数
    var cfgSelectMany = {
        type: 'selectMany',
        creatSelectNum: '',
        creatSelectTitle: '多选',
        target: '.questionaire_content',
    };
    // 生成文本框问卷项的参数
    var cfgSelectTestArea = {
        type: 'textarea',
        creatSelectNum: '',
        creatSelectTitle: '文本',
        target: '.questionaire_content',
    };
    // 生成不同形式的问卷选项
    $('.addQuestions').on('click', function() {
        $('.select').toggle();
    });
    $('.selectOne').on('click', function() {
        var select = new creatSelect();
        var cfg = cfgSelectOne;
        select.init(cfg);
    });
    $('.selectMany').on('click', function() {
        var select = new creatSelect();
        var cfg = cfgSelectMany;
        select.init(cfg);
    });
    $('.textArea').on('click', function() {
        var select = new creatSelect();
        var cfg = cfgSelectTestArea;
        select.init(cfg);
    });

    function saveQuestionaire() {
        // 保存生成的问卷选项
        var questionaire_list = store.get('questionaire_list') || [];
        var saveTitle = $('.questionaire .title').val();
        var $creatSelects = $('.questionaire .creatSelect');

        var saveContent = [];
        for (var i = 0; i < $creatSelects.length; i++) {
            var creatSelectsContents = {
                title: '',
                type: '',
                value: [],
            };

            creatSelectsContents.title=$($creatSelects[i]).find('.creatSelect_span_num').text();
            creatSelectsContents.type=$($creatSelects[i]).find('.creatSelect_div_content').attr('compileType');
            creatSelectsContents.value=[];

            var $lis=$($creatSelects[i]).find('.creatSelect_div_content').find('li');
            for (var j = 0; j < $lis.length; j++) {
                creatSelectsContents.value.push($($lis[j]).find('input').val());
            };

            saveContent.push(creatSelectsContents);
        };

        var time = new Date(),
            year = time.getFullYear(),
            month = time.getMonth() + 1,
            date = time.getDate();
        var questionaire_html = {
            'title': saveTitle,
            'year': year,
            'month': month,
            'date': date,
            'content': saveContent,
        };

        console.log(questionaire_html);
        
        questionaire_list.push(questionaire_html);
        store.set('questionaire_list', questionaire_list);
    }
    // 点击保存按钮，数据存入localstorage
    // 点击发布按钮，数据存入localstorage，页面跳转到display.html页
    $('.save').on('click', function() {
        var $creatSelects = $('.creatSelect');
        if ($creatSelects.length == 0) {
            alert('问卷项目为零，请添加项目');
            return;
        } else if ($('.questionaire .title').val().trim() === '') {
            alert('请填写标题');
            return;
        } else {
            saveQuestionaire();
        }
    });
    $('.publish').on('click', function() {
        var $creatSelects = $('.creatSelect');
        if ($creatSelects.length == 0) {
            alert('问卷项目为零，请添加项目');
            return;
        } else if ($('.questionaire .title').val().trim() === '') {
            alert('请输入标题');
            return;
        } else {
            saveQuestionaire();
            $(this).find('a').attr('href', 'display.html');
        };
    });
});
