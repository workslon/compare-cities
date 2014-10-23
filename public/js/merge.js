
/*
  * @desc small library used to get information from dbpedia
  * @return {object} contains methods for data data from dbpedia
 */
var WIKIPEDIA;

WIKIPEDIA = (function() {
  var DATA_TYPE, DBPEDIA_RESOURCE, ENDPOINT, FORMAT, SPARQL_TEMPLATE, getJSON, getUrl;
  ENDPOINT = 'http://dbpedia.org/sparql/';
  DBPEDIA_RESOURCE = 'http://dbpedia.org/resource/';
  SPARQL_TEMPLATE = 'DESCRIBE <{{url}}>';
  FORMAT = 'application/rdf+json';
  DATA_TYPE = 'json';
  getUrl = function(pageName) {
    var regExp;
    regExp = new RegExp('/ /g');
    return DBPEDIA_RESOURCE + pageName.replace(regExp, '_');
  };
  getJSON = function(pageName) {
    var dbUrl, options, sparqlQuery;
    dbUrl = getUrl(pageName);
    sparqlQuery = SPARQL_TEMPLATE.replace('{{url}}', dbUrl);
    options = {
      url: ENDPOINT,
      data: {
        query: sparqlQuery,
        format: FORMAT
      },
      dataType: DATA_TYPE
    };
    return $.ajax(options);
  };
  return {
    getJSON: getJSON,
    getUrl: getUrl
  };
})();
