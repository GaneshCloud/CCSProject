/**
 * Created by Administrator on 5/31/2016.
 */
module.exports = function(grunt) {

    // Project configuration.
    // grunt.file.mkdir('build/dist');
    grunt.initConfig({
        // pkg: grunt.file.readJSON('package.json'),
        // uglify: {
        //     options: {
        //         banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        //     },
        //     build: {
        //         src: './public/js/*.js',
        //         dest: 'build/<%= pkg.name %>.min.js'
        //     }
        // },
        copy: {
            main: {
                files: [
                    { expand: true,  src: ['config/**/*'], dest: 'build/dist/' },
                    { expand: true,  src: ['controllers/*'], dest: 'build/dist/' },
                    { expand: true,  src: ['public/**/*'], dest: 'build/dist/' },
                    { expand: true,  src: ['routes/*'], dest: 'build/dist/' },
                    { expand: true,  src: ['server.js'], dest: 'build/dist/' }
                    // { expand: true, cwd: 'test/fixtures', src: ['**', '!*.wav'], dest: 'tmp/copy_test_mix/' },
                    // { expand: true, cwd: 'test/fixtures', src: ['<%= testVars.match %>'], dest: 'tmp/copy_test_v<%= testVars.version %>/' }
                ]
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
                },
                src: ['test/server/controller/*.js','test/server/routes/*.js']
            }
        },
        mocha_istanbul: {
            src: ['test/server/**/*.js'],
            // target: {
            //     options: {
            //         scriptPath: require.resolve('coverage-tool/the/path/to/bin'),
            //     }
            // },
            options: {
                coverageFolder: 'Report Nodejs Testing/coverage',
                coverage: true,
                noColors: true,
                dryRun: false,
                //root: './test',
                //root: './tasks',
                //print: 'detail',
                check: {
                    lines: 1
                },
                reporter: 'spec',
                reportFormats: ['html','lcovonly']
            }
        },
        jshint: {
            files : [ 'Gruntfile.js', 'controllers/*.js'],
            options : {
                curly : true,
                eqeqeq : true,
                immed : true,
                latedef : true,
                newcap : true,
                noarg : true,
                sub : true,
                undef : true,
                boss : true,
                eqnull : true,
                node : true,
                reporter: require('jshint-html-reporter'),
                reporterOutput: 'jshint-report.html'
            },
            globals : {

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
        },                  //build directory

        jsDir: 'public/js/',
        jsDistDir: 'public/dist/js/',
        cssDir: 'public/css/',
        cssDistDir: 'public/dist/css/',
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                options: {
                    separator: ';'
                },
                src: ['<%=jsDir%>*.js'],
                dest: '<%=jsDistDir%><%= pkg.name %>.js'
            },
            css: {
                src: ['<%=cssDir%>*.css'],
                dest: '<%=cssDistDir%><%= pkg.name %>.css'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    '<%=jsDistDir%><%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
                }
            }
        },
        cssmin: {
            add_banner: {
                options: {
                    banner: '/*! <%= pkg.name %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
                },
                files: {
                    '<%=cssDistDir%><%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
                }
            }
        },
        watch: {
            files: ['<%=jsDir%>*.js', '<%=cssDir%>*.css'],
            tasks: ['concat', 'uglify', 'cssmin']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', [
        // 'concat',
        // 'uglify',
        // 'cssmin',
        // 'watch',
        //'copy'
    ]);




    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
   

    grunt.registerTask('default', ['karma']); //,'mocha_istanbul','karma''jshint','mocha_istanbul','mocha_istanbul',



};
