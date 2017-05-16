$(function() {
    var data = store.get('questionaire_list');
    var num = store.get('num');
    var $data = data[num];

    var $questionaire = $('.questionaire');
    var $title = $('<h2 class="title">' + data[num].title + '</h2>');
    var $submit = $('<div class="submit"><a href="./display.html">提交</a></div>');
    var $content = $('<div class="content"><div class="questionaire_content"></div></div>');

    for (var i = 0; i < $data.content.length; i++) {
        var $con;
        switch ($data.content[i].type) {
            case 'selectOne':
                $con = $('<div class="form_area"><div>' + $data.content[i].title + '&nbsp;&nbsp;单选</div><ul></ul></div>');
                for (var j = 0; j < $data.content[i].value.length; j++) {
                    var $li = $('<li><input type="radio" name="' + $data.content[i].title + '"><label>' + $data.content[i].value[j] + '</label></li>');
                    $con.find('ul').append($li);
                };
                break;
            case 'selectMany':
                $con = $('<div class="form_area"><div>' + $data.content[i].title + '&nbsp;&nbsp;多选</div><ul></ul></div>');
                for (var j = 0; j < $data.content[i].value.length; j++) {
                    var $li = $('<li><input type="checkbox" name="' + $data.content[i].title + '"><label>' + $data.content[i].value[j] + '</label></li>');
                    $con.find('ul').append($li);
                };
                break;
            case 'textarea':
                $con = $('<div class="form_area"><div>' + $data.content[i].title + '&nbsp;&nbsp;文本</div></div>');
                var $textarea = $('<textarea></textarea>');
                $con.append($textarea);
                break;
            default:
                // statements_def
                break;
        }
        $($content.find('.questionaire_content')).append($con);
    };


    $questionaire.append($title).append($content).append($submit);

    store.remove('num');
});
