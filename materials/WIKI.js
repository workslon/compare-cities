var WIKIPEDIA = (function () {
    var ENDPOINT            = 'http://dbpedia.org/sparql/',
        DBPEDIA_RESOURCE    = 'http://dbpedia.org/resource/',
        SPARQL_TEMPLATE     = 'DESCRIBE <{{url}}>',
        FORMAT              = 'application/rdf+json',
        DATA_TYPE           = 'json',

        getUrl = function (pageName) {
            return DBPEDIA_RESOURCE + pageName.replace(/ /g, '_');
        },

        getJSON = function (pageName) {
            var dbUrl       = getUrl(pageName),
                sparqlQuery = SPARQL_TEMPLATE.replace('{{url}}', dbUrl),
                options = {
                    url: ENDPOINT,
                    data: {
                        query: sparqlQuery,
                        format: FORMAT
                    },
                    dataType: DATA_TYPE
                }

            return $.ajax(options);
        };

    return {
        getJSON: getJSON,
        getUrl: getUrl
    };
})();