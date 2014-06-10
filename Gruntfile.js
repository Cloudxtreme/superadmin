/*global module:false*/
module.exports = function (grunt) {
    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    // Small-scale utility for processing templates
    grunt.registerMultiTask('process', 'Process templates.', function () {
        var data = this.data;
        var context = data.context;
        var src = grunt.template.process(data.src);
        var dest = grunt.template.process(data.dest);
        // Read file
        var input = grunt.file.read(src);
        // Process it
        var output = grunt.template.process(input, { data: context });
        // And write to a file
        grunt.file.write(dest, output);

        // Fail task if errors were logged.
        if (this.errorCount) {
            return false;
        }

        // Otherwise, print a success message.
        grunt.log.writeln('File "' + dest + '" processed.');
    });

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        defaults: {
            app: {
                'title': '<%= pkg.title %>',
                'description': '<%= pkg.description %>'
            },
            source: {
                /* Note: You also need to change RequireJS paths below */
                dir: 'src'
            },
            debug: {
                dir: 'staging'
            },
            release: {
                dir: 'dist'
            },
            vendor: {
                dir: 'vendor'
            }
        },

        /* Cleaning process */
        clean: {
            all: [ '<%= defaults.debug.dir %>', '<%= defaults.release.dir %>' ]
        },

        /* Code quality related tasks */
        jshint: {
            options: {
                curly: true, eqeqeq: true, immed: true, latedef: true,
                newcap: true, noarg: true, sub: true, undef: true,
                boss: true, eqnull: true, browser: true, devel: true,
                globals: {
                    require: true,
                    define: true
                }
            },
            source: ['<%= defaults.source.dir %>/scripts/**/*.js', '*.js'],
            release: {
                options: {
                    asi: true,
                    eqeqeq: false
                },
                files: {
                    src: ['<%= defaults.release.dir %>/js/**/*.js', '*.js' ]
                }
            }
        },

        htmlhint: {
            options: {
                'tag-pair': true
            },
            release: {
                src: ['<%= defaults.release.dir %>/*.html']
            }
        },

        csslint: {
            source: {
                options: {
                    import: false
                },
                src: ['<%= defaults.source.dir %>/styles/*.css']
            },
            release: {
                options: {
                    import: false
                },
                src: ['<%= defaults.release.dir %>/css/*.css']
            }
        },

        /* Build & Optimization steps */
        process: {
            debug: {
                src: '<%= defaults.source.dir %>/index.html',
                dest: '<%= defaults.debug.dir %>/index.html',
                context: {
                    stylesheetFile: 'css/styles.css',
                    scriptFile: 'js/app-<%= pkg.version %>',
                    scriptLoader: '<%= defaults.vendor.dir %>/requirejs/require.js',
                    scripts: []
                }
            },
            release: {
                src: '<%= defaults.source.dir %>/index.html',
                dest: '<%= defaults.release.dir %>/index.html',
                context: {
                    metaTitle: '<%= defaults.app.title %>',
                    metaDescription: '<%= defaults.app.description %>',
                    assetRoot: '/',
                    stylesheetFile: 'css/styles-<%= pkg.version %>.css',
                    scriptFile: 'js/main-<%= pkg.version %>',
                    scriptLoader: 'js/<%= defaults.vendor.dir %>/requirejs/require-<%= pkg.version %>.js',
                    scripts: []
                }
            }
        },

        requirejs: {
            release: {
                options: {
                    baseUrl: '<%= defaults.source.dir %>/scripts',
                    mainConfigFile: '<%= defaults.source.dir %>/scripts/main.js',
                    name: 'main',
                    optimize: 'uglify2',
                    out: '<%= defaults.release.dir %>/js/main-<%= pkg.version %>.js',
                    preserveLicenseComments: false,
                    useStrict: true,
                    paths: {}
                }
            }
        },

        cssmin: {
            combine: {
                files: {
                    '<%= defaults.release.dir %>/css/styles.css': [
                        '<%= defaults.source.dir %>/<%= defaults.vendor.dir %>/bootstrap/dist/css/bootstrap.css',
                        '<%= defaults.source.dir %>/styles/styles.css'
                    ]
                }
            },
            minify: {
                expand: true,
                cwd: '<%= defaults.release.dir %>/css/',
                src: ['*.css', '!*.min.css'],
                dest: '<%= defaults.release.dir %>/css/',
                ext: '-<%= pkg.version %>.css'
            }
        },

        uglify: {
            release: {
                files: {
                    '<%= defaults.release.dir %>/js/<%= defaults.vendor.dir %>/requirejs/require-<%= pkg.version %>.js': '<%= defaults.source.dir %>/<%= defaults.vendor.dir %>/requirejs/require.js'
                }
            }
        },

        copy: {
            release: {
                files: [
                    {expand: true, cwd: '<%= defaults.source.dir %>', src: 'oauth.html', dest: '<%= defaults.release.dir %>/', filter: 'isFile'},
                    {expand: true, cwd: '<%= defaults.source.dir %>', src: ['robots.txt', 'favicon.ico'], dest: '<%= defaults.release.dir %>/', filter: 'isFile'},
                    {src: '<%= defaults.source.dir %>/templates/*', dest: '<%= defaults.release.dir %>/templates/'}
                ]
            }
        },

        concurrent: {
            release: ['process:release', 'requirejs:release', 'cssmin', 'copy:release', 'uglify'],
            debug: ['process:debug'],
            testSource: ['jshint:source', 'csslint:source', 'htmlhint:source'],
            testRelease: ['jshint:release', 'csslint:release', 'htmlhint:release'],
            testDebug: ['jshint']
        }
    });

    // Register tasks
    grunt.registerTask('release', ['clean', 'concurrent:testSource', 'concurrent:release'/*, 'concurrent:testRelease'*/]);
    grunt.registerTask('debug', ['clean', 'concurrent:debug', 'concurrent:testDebug']);
    grunt.registerTask('test:source', ['concurrent:testSource']);
    grunt.registerTask('test:release', ['concurrent:testRelease']);
    grunt.registerTask('test:debug', ['concurrent:testDebug']);
    grunt.registerTask('default', ['release']);
};