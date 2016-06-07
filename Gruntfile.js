/**
 * Created by CSS on 30-05-2016.
 */
module.exports = function(grunt) {

    // Project configuration.
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less:{
            styles: {
                src: ['<banner>','public/css/*.css'],
                dest: 'public/build/styles.css',
                options: {
                    compress: grunt.config('compress')
                }
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['public/js/**.min.js'],
                dest: 'public/build/js/ui.bootstrap.min.js'
            }
        },

        imagemin:{
            files: {
                images: [{
                    expand: true,
                    cwd: 'public/',
                    src: ['**/**/*.{png,jpg,gif}'],
                    dest: 'public/build/images/'
                }]
            }
        },

        jshint: {
            options: {
                reporter: require('jshint-html-reporter'),
                reporterOutput: 'report/jshint-report.html',
                force:true,
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
                    describe:true,
                    beforeEach:true,
                    afterEach:true
                },
                eqeqeq: true
            },

            build: {
                src: [
                    'Gruntfile.js',
                    'server.js',
                    'routes/*.js',
                    'controllers/*.js',
                    'config/*.js',
                    'config/db/*.js',
                    'public/app/**/**/*.js',
                    'test/server/**/*.js'
                ]
            },

            jscs: {
                build: {
                    src: [
                        'server.js',
                        'gruntfile.js',
                        'routes/*.js',
                        'controllers/*.js',
                        'config/*.js',
                        'config/**/*.js',
                        'public/app/**/**/*.js',
                        'test/server/**/*.js'
                    ]
                },
                options: {
                    maxErrors: null,
                    requireTrailingComma: false,
                    fix: true,
                    force: true,
                    reporter: require('jscs-html-reporter').path,
                    reporterOutput: 'report/jscs-html-report.html',
                    preset: "node-style-guide",
                    disallowMultipleVarDecl: false,
                    maximumLineLength: 160,
                    validateLineBreaks: null
                }
            }
        },

        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    'public/dist/index.html': 'public/app/core/layout.html',   // 'destination': 'source'
                    'public/dist/projectHome.html': 'public/app/project/home/home.html'   // 'destination': 'source'
                    //'dist/contact.html': 'src/contact.html'
                }
            },
            dev: {                                       // Another target
                files: {
                    'public/dist/index.html': 'public/app/core/layout.html'    // 'destination': 'source'
                    // 'dist/contact.html': 'src/contact.html'
                }
            }
        },

        mocha_istanbul:{
            coverage: {
                src: 'test/server', // the folder, not the files
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    coverageFolder: 'report/coverage',
                    mask: '**/**/*.js'
                }
            }
        },

        nodemon: {
            dev: {
                script: 'server.js'
            }
        },
        serve: {
            options: {
                port:9000
            }
        },

        karma: {
            unit: {
                options: {
                    frameworks: ['jasmine'],
                    // singleRun: true,
                    browsers: ['Chrome'],
                    files: [
                        'public/bower_components/angular/angular.js',
                        'public/bower_components/angular-mocks/angular-mocks.js',
                        'public/bower_components/angular-resource/angular-resource.js',
                        'public/bower_components/angular-bootstrap/ui-bootstrap.js',
                        'public/bower_components/angular-route/angular-route.min.js',
                        "public/bower_components/ui-accordion/dist/scripts/ui-accordion.js",
                        "public/bower_components/angular-timeline/dist/angular-timeline.js",
                        "public/bower_components/ng-file-upload/ng-file-upload.min.js",
                        "public/bower_components/ng-file-upload/ng-file-upload-shim.min.js",
                        "public/bower_components/angular-spinners/dist/angular-spinners.js",
                        "public/bower_components/ngprogress/build/ngProgress.js",

                        'public/app/core/module.js',
                        'public/app/documents/documentList/documentListController.js',
                        'public/app/documents/documentList/documentListServices.js',
                        'public/app/documents/services/starServices.js',
                        'public/app/documents/services/iconServices.js',
                        'public/app/profile/adminDashboard/adminDashboardService.js',
                        'public/app/documents/filters/commonFilter.js',
                        'public/app/documents/directives/fileDirective.js',

                        'test/client/**/*.js'

                    ],
                    concurrency: Infinity,
                    autoWatch: true,
                    reporters: ['progress', 'coverage'],
                    preprocessors: {
                        // source files, that you wanna generate coverage for
                        // do not include tests or libraries
                        // (these files will be instrumented by Istanbul)
                        'public/app/documents/documentList/documentListController.js': ['coverage'],
                        'public/app/documents/services/iconServices.js': ['coverage'],
                        'public/app/documents/services/starServices.js': ['coverage'],
                        'public/app/documents/directives/fileDirective.js': ['coverage'],
                        'public/app/documents/filters/commonFilter.js': ['coverage']

                    },
                    coverageReporter: {
                        dir: 'Report Angular Testing',
                        reporters: [
                            { type: 'html', subdir: 'report-html' },
                            { type: 'teamcity', subdir: '.', file: 'teamcity.txt' }
                        ]
                    },
                    plugins: [
                        'karma-jasmine',
                        'karma-coverage',
                        'karma-chrome-launcher'
                    ]

                }
            }
        }
    });

    var defaultTasks = [
        'less',
        'uglify',
        'imagemin',
        'jshint',
        'htmlmin:dist',
        'mocha_istanbul',
        'nodemon'
    ];

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default',defaultTasks);
    grunt.registerTask('test', ['jshint','mocha_istanbul']);
    grunt.registerTask('default', ['karma']);



};