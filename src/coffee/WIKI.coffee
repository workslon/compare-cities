###
 # @desc small library used to get information from dbpedia
 # @return {object} contains methods for data data from dbpedia
###
WIKIPEDIA = do ->
    ENDPOINT            = 'http://dbpedia.org/sparql/'
    DBPEDIA_RESOURCE    = 'http://dbpedia.org/resource/'
    SPARQL_TEMPLATE     = 'DESCRIBE <{{url}}>'
    FORMAT              = 'application/rdf+json'
    DATA_TYPE           = 'json'

    getUrl = (pageName) ->
        regExp = new RegExp('/ /g')
        DBPEDIA_RESOURCE + pageName.replace(regExp, '_')

    getJSON = (pageName) ->
        dbUrl       = getUrl(pageName)
        sparqlQuery = SPARQL_TEMPLATE.replace('{{url}}', dbUrl)

        options =
            url: ENDPOINT
            data:
                query: sparqlQuery
                format: FORMAT
            dataType: DATA_TYPE

        $.ajax(options)

    # returned methods
    getJSON: getJSON
    getUrl: getUrl