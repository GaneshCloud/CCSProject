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
                reporterOutput: 'report/jshint-report.html'
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
                src: 'test', // the folder, not the files
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    coverageFolder: 'report/coverage',
                    mask: '**/**/**/*.js'
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
    grunt.registerTask('default',defaultTasks);
    grunt.registerTask('test', ['jshint','mocha_istanbul']);

};