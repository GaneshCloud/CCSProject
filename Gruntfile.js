/**
 * Created by CSS on 30-05-2016.
 */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['config/db/documents/*.js','config/db/*.js','config/env/*.js','config/*.js','controllers/*.js',
                    'public/app/core/*.js','public/app/documents/directives/*.js','public/app/documents/documentList/*.js',
                    'public/app/documents/filters/*.js','public/app/documents/multipleFileUpload/*.js','public/app/documents/search/*.js',
                    'public/app/documents/services/*.js','public/app/documents/singleFileUpload/*.js','public/app/documents/viewDocument/*.js',
                    'public/app/forum/home/*.js','public/app/profile/adminDashboard/*.js','public/app/profile/adminProfile/*.js',
                    'public/app/profile/changePassword/*.js','public/app/profile/login/*.js','public/app/profile/logout/*.js',
                    'public/app/profile/userDashboard/*.js','public/app/profile/userProfile/*.js','public/app/project/home/*.js',
                    'public/app/project/projectReg/*.js','public/app/project/upload/*.js','routes/*.js'],
                dest: 'build/config/'
            }
        },
        jshint: {
            options:{
                reporter: require('jshint-html-reporter'),
                reporterOutput: 'report/jshint-report.html',
                globals: {
                    jQuery: true,
                    angular: true,
                    require:true,
                    process:true,
                    module:true,
                    exports:true,
                    console:true,
                    myApp:true,
                    __dirname:true,
                    $:true,
                    $timeout:true,
                    alert:true,
                    Buffer:true,
                    it:true,
                    describe:true
                },
                force:true,
                eqeqeq: true
            },
            build: {
                src: ['config/db/documents/*.js','config/db/*.js','config/env/*.js','config/*.js','controllers/*.js',
                    'public/app/core/*.js','public/app/documents/directives/*.js','public/app/documents/documentList/*.js',
                    'public/app/documents/filters/*.js','public/app/documents/multipleFileUpload/*.js','public/app/documents/search/*.js',
                    'public/app/documents/services/*.js','public/app/documents/singleFileUpload/*.js','public/app/documents/viewDocument/*.js',
                    'public/app/forum/home/*.js','public/app/profile/adminDashboard/*.js','public/app/profile/adminProfile/*.js',
                    'public/app/profile/changePassword/*.js','public/app/profile/login/*.js','public/app/profile/logout/*.js',
                    'public/app/profile/userDashboard/*.js','public/app/profile/userProfile/*.js','public/app/project/home/*.js',
                    'public/app/project/projectReg/*.js','public/app/project/upload/*.js','routes/*.js']
            }

        },
        jscs:{
            build: {
                src: ['config/db/documents/*.js','config/db/*.js','config/env/*.js','config/*.js','controllers/*.js',
                    'public/app/core/*.js','public/app/documents/directives/*.js','public/app/documents/documentList/*.js',
                    'public/app/documents/filters/*.js','public/app/documents/multipleFileUpload/*.js','public/app/documents/search/*.js',
                    'public/app/documents/services/*.js','public/app/documents/singleFileUpload/*.js','public/app/documents/viewDocument/*.js',
                    'public/app/forum/home/*.js','public/app/profile/adminDashboard/*.js','public/app/profile/adminProfile/*.js',
                    'public/app/profile/changePassword/*.js','public/app/profile/login/*.js','public/app/profile/logout/*.js',
                    'public/app/profile/userDashboard/*.js','public/app/profile/userProfile/*.js','public/app/project/home/*.js',
                    'public/app/project/projectReg/*.js','public/app/project/upload/*.js','routes/*.js'],
            },
            options: {
                maxErrors: null,
                requireTrailingComma: false,
                fix: true,
                force:true,
                reporter: require('jscs-html-reporter').path,
                reporterOutput: 'report/jscs-html-report.html',
                preset: "node-style-guide",
                disallowMultipleVarDecl:false,
                maximumLineLength:160,
                validateLineBreaks: null
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    args: ['dev'],
                    nodeArgs: ['--debug'],
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });
                    },
                    env: {
                        PORT: '3000'
                    },
                    cwd: __dirname,
                    ignore: ['node_modules/**'],
                    ext: 'js,coffee',
                    watch: ['server'],
                    delay: 1000,
                    legacyWatch: true
                }
            },
            exec: {
                options: {
                    exec: 'less'
                }
            }
        },
        mocha_istanbul:{
            coverage: {
                src: 'test', // the folder, not the files
                options: {
                    coverageFolder: 'report/coverage',
                    mask: '**/**/**/*.js'
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks("grunt-jscs");

    grunt.loadNpmTasks('grunt-nodemon');

    grunt.loadNpmTasks('grunt-mocha-istanbul');

    grunt.registerTask('default',['build']);
    grunt.registerTask('build', ['mocha_istanbul','jscs', 'uglify','jshint','nodemon']);

};