 module.exports = (grunt) ->
    grunt.initConfig
        publicDir: './public'
        srcDir: './src'
        coffeeDir: '<%= srcDir %>/coffee'
        jadeDir: '<%= srcDir %>/jade'
        jsDir: '<%= publicDir %>/js'
        cssDir: '<%= publicDir %>/css'

        # grunt coffee
        coffee:
            compile:
                expand: true
                cwd: '<%= coffeeDir %>'
                src: ['*.coffee']
                dest: '<%= jsDir %>'
                ext: '.js'
                options:
                    bare: true
                    preserve_dirs: true

        # grunt jade
        jade:
            compile:
                files:
                    '<%= publicDir %>/index.html': '<%= jadeDir %>/index.jade'

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
    grunt.loadNpmTasks 'grunt-contrib-jade';
    grunt.loadNpmTasks 'grunt-contrib-watch'

    # tasks
    grunt.registerTask 'default', ['coffee', 'jade', 'watch']