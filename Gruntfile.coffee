 module.exports = (grunt) ->
    grunt.initConfig
        publicDir: './public'
        srcDir: './src'
        coffeeDir: '<%= srcDir %>/coffee'
        jadeDir: '<%= srcDir %>/jade'
        lessDir: '<%= srcDir %>/less'
        jsDir: '<%= publicDir %>/js'
        cssDir: '<%= publicDir %>/css'

        # grunt coffee
        coffee:
            compile:
                options:
                    bare: true
                files:
                    '<%= jsDir %>/merge.js': '<%= coffeeDir %>/*.coffee'

        # grunt jade
        jade:
            compile:
                files:
                    '<%= publicDir %>/index.html': '<%= jadeDir %>/index.jade'

        # grunt less
        less:
            compile:
                files:
                    '<%= cssDir %>/merge.css': '<%= lessDir %>/styles.less'

        # grunt watch
        watch:
            coffee:
                files: '<%= coffeeDir %>/*.coffee'
                tasks: ['coffee']
            jade:
                files: '<%= jadeDir %>/*.jade'
                tasks: ['jade']

    # load plugins
    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.loadNpmTasks 'grunt-contrib-jade'
    grunt.loadNpmTasks 'grunt-contrib-less'
    grunt.loadNpmTasks 'grunt-contrib-watch'

    # tasks
    grunt.registerTask 'default', ['coffee', 'jade', 'less' 'watch']