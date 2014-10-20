!function () {
    'use strict';

    var wiki        = WIKIPEDIA,
        entry       = '',
        url         = '',
        $content    = null,

        getEntry = function () {
            return $(this).prev('input').val();
        },

        getItems = function (data) {
            var items = {},
                value = '',
                lang,
                key;

            data = data[url];

            for (key in data) {
                if (key.indexOf('ontology') + 1) {
                    data[key].forEach(function (el) {
                        lang = el.lang;

                        if (!lang || lang && lang === 'en') {
                            value += el.value;
                        }
                    });

                    key = key.substr(28);
                    items[key] = value;
                    value = '';
                }
            }

            return items;
        },

        getFormatedItems = function (data) {
            var getAbstract = function () {
                    return data.abstract;
                },

                getTotalArea = function () {
                    var area = data['PopulatedPlace/areaTotal'];

                    return area ? (area + ' km<sup>2</sup>') : ''
                },

                getTotalMetroArea = function () {
                    var area = data['PopulatedPlace/areaMetro'];

                    if (area) {
                        return area + ' km<sup>2</sup>';
                    }
                },

                getCountry = function () {
                    return (data.country || '').substr(28);
                },

                getThumbnail = function () {
                    return data.thumbnail;
                };

            return {
                'total area': getTotalArea(),
                'metro area': getTotalMetroArea(),
                'country': getCountry(),
                'thumbnail': getThumbnail(),
                'abstract': getAbstract()
            };
        },

        drawTable = function (items) {
            var TABLE_TYPE = 'table table-striped table-hover',
                $table = $('<table class="' + TABLE_TYPE + '"><tbody></tbody></table>'),
                $docFrag = $(document.createDocumenttFragment),
                item,
                i;

            for (i in items) {
                item = '<tr>' + i + '<th></th><td>' + items[i] + '</td></tr>';
                $docFrag.append(item);
            }

            $table.find('tbody').append($docFrag);
        },

        showItems = function (items) {
            var TABLE_TYPE = 'table table-striped table-hover',
                $table = $('<table class="' + TABLE_TYPE + '"></table>'),
                $tbody = $('<tbody></tbody>'),
                $docFrag = $(document.createDocumentFragment()),
                item,
                i;

            for (i in items) {
                if (items[i]) {
                    item = '<tr><th>' + i + '</th><td>' + items[i] + '</td></tr>';
                    $docFrag.append(item);
                }
            }

            $tbody.append($docFrag);
            $table.append($tbody);
            $content.empty().append($table);
        },

        buttonClickHandler = function () {
            entry       = getEntry.call(this),
            url         = wiki.getUrl(entry);
            $content    = $(this).parent().next();

            wiki
                .getJSON(entry)
                .then(getItems)
                .then(getFormatedItems)
                .then(showItems);
        },

        initButtonClickHandler = function () {
            $('.btn').on('click', buttonClickHandler);
        },

        init = (function init() {
            initButtonClickHandler();
        })();
}();




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

//         getData = function (entry) {
//             return $.ajax({
//                 type: "GET",
//                 url: getUrl(entry),
//                 contentType: "application/json; charset=utf-8",
//                 async: true,
//                 dataType: "json"
//             });
//         },

//         getSortedInfo = function () {
//             var $firstCity = $('#section1'),
//                 $secondCity = $('#section2'),
//                 sortedInfo = {

//                 };

//             $firstCity.find('th').each(function () {
//                 var $t = $(this),
//                     title = '';

//                 if ($t.find('a').length) {
//                     title = $t.find('a').text();
//                 } else {
//                     title = $t.text();
//                 }

//                 if ($('#section2 th:contains('+ title +')')) {

//                 }
//             });
//         },

//         buttonClickHandler = function () {
//             var $t = $(this),
//                 $content = $t.parent().next(),
//                 entry = getEntry.call(this);

//             getData(entry)
//                 .done(function (data) {
//                     var data = data.parse,
//                         title = data.title,
//                         $infoBox = (function () {
//                             return $(data.text['*']).filter(function () {
//                                 return this.nodeName === 'TABLE';
//                             });
//                         })();

//                     $content.html($infoBox);
//                     $('[style]').removeAttr('style');
//                     $('#section1, #section2').find('table tr img').closest('tr').hide();
//                     $('span[id=coordinates]').closest('tr').hide();
//                     $('table').addClass('table table-striped table-hover');
//                 });
//         },

//         initButtonClickHandler = function () {
//             $('.btn').on('click', buttonClickHandler);
//         },

//         init = (function () {
//             initButtonClickHandler();
//         })();
// }();