!function () {
    'use strict';

    var getEntry = function () {
            return $(this).prev('input').val();
        },

        getUrl = function (entry) {
            return 'http://en.wikipedia.org/w/api.php'
                    + '?action=parse'
                    + '&format=json'
                    + '&prop=text'
                    + '&section=0'
                    + '&page=' + entry
                    +' &callback=?';
        },

        getData = function (entry) {
            return $.ajax({
                type: "GET",
                url: getUrl(entry),
                contentType: "application/json; charset=utf-8",
                async: true,
                dataType: "json"
            });
        },

        buttonClickHandler = function () {
            var $t = $(this),
                $content = $t.parent().next(),
                entry = getEntry.call(this);

            getData(entry)
                .done(function (data) {
                    var data = data.parse,
                        title = data.title,
                        $infoBox = (function () {
                            return $(data.text['*']).filter(function () {
                                return this.nodeName === 'TABLE';
                            });
                        })();

                    $content.html($infoBox);
                    $('[style]').removeAttr('style');
                    $('section').find('table tr img').closest('tr').hide();
                    $('span[id=coordinates]').closest('tr').hide();
                    $('table').addClass('table table-striped table-hover');
                });
        },

        initButtonClickHandler = function () {
            $('.btn').on('click', buttonClickHandler);
        },

        init = (function () {
            initButtonClickHandler();
        })();
}();