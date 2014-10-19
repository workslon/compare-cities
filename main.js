// !function () {
//     'use strict';

//     var getEntry = function () {
//             return $(this).prev('input').val();
//         },

//         getUrl = function (entry) {
//             return 'http://en.wikipedia.org/w/api.php'
//                     + '?action=parse'
//                     + '&format=json'
//                     + '&prop=text'
//                     + '&section=0'
//                     + '&page=' + entry
//                     +' &callback=?';
//         },

//         getData = function () {
//             return $.get(getUrl());
//         },

//         // showData = function (data) {
//         //     var $data = $(data),
//         //         $content = $data.find('#content');


//         // },

//         buttonClickHandler = function () {
//             var $t = $(this),
//                 $content = $t.next('div');

//             getData()
//                 .done(function (data) {
//                     debugger;
//                     var $data = $(data).find('#content').html();

//                     $content.html($data);
//                 });
//         },

//         initButtonClickHandler = function () {
//             $('button').on('click', buttonClickHandler);
//         },

//         init = (function () {
//             initButtonClickHandler();
//         })();
// }();



// $(document).ready(function(){

    $.ajax({
        type: "GET",
        url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Jimi_Hendrix&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {

            debugger;

            var markup = data.parse.text["*"];
            var blurb = $('<div></div>').html(markup);

            // remove links as they will not work
            blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });

            // remove any references
            blurb.find('sup').remove();

            // remove cite error
            blurb.find('.mw-ext-cite-error').remove();
            $('#article').html($(blurb).find('p'));

        },
        error: function (errorMessage) {
        }
    });
// });