/*global module:false*/
module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

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
                'title': '<%= pkg.name %>',
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
            },
            requirejs: {
                /* Note: We build directly from the source directory to avoid copying of libs */
                baseUrl: 'src/scripts',
                mainConfigFile: 'src/scripts/main.js',
                dir: 'temp/js',
                optimize: 'uglify2',
                keepBuildDir: false,
                paths: {
                },
                modules: [
                    { name: 'main' }
                ]
            }
        },

        /* Cleaning process */
        clean: {
            all: [ 'temp', '<%= defaults.debug.dir %>', '<%= defaults.release.dir %>' ],
            final: [ 'temp', '<%= defaults.vendor.dir %>' ]
        },

        /* Code quality related tasks */
        jshint: {
            files: [
                '<%= defaults.source.dir %>/scripts/**/*.js',
                '*.js'
            ],
            options: {
                curly: true, eqeqeq: true, immed: true, latedef: true,
                newcap: true, noarg: true, sub: true, undef: true,
                boss: true, eqnull: true, browser: true, devel: true,
                globals: {
                    require: true,
                    define: true
                }
            }
        },

        /* Build & Optimization steps */
        process: {
            debug: {
                src: '<%= defaults.source.dir %>/index.html',
                dest: '<%= defaults.debug.dir %>/index.html',
                context: {
                    stylesheetFile: 'css/styles.css',
                    scriptFile: 'js/main.js',
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
                    scriptFile: 'js/main-<%= pkg.version %>.js',
                    scriptLoader: 'js/<%= defaults.vendor.dir %>/requirejs/require-<%= pkg.version %>.js',
                    scripts: []
                }
            }
        },
        requirejs: {
            release: {
                options: '<%= defaults.requirejs %>'
            }
        },

        cssmin: {
            combine: {
                files: {
                    'temp/css/styles.css': [
                        '<%= defaults.source.dir %>/<%= defaults.vendor.dir %>/bootstrap/dist/css/bootstrap.css',
                        '<%= defaults.source.dir %>/styles/styles.css'
                    ]
                }
            },
            minify: {
                expand: true,
                cwd: 'temp/css/',
                src: ['*.css', '!*.min.css'],
                dest: '<%= defaults.release.dir %>/css/',
                ext: '.min.css'
            }
        },

        // Build JS into one monolith by JamJS/RequireJS
        uglify: {
            release: {
                files: {
                    '<%= defaults.release.dir %>/js/main-<%= pkg.version %>.js': 'temp/js/main.js',
                    '<%= defaults.release.dir %>/js/<%= defaults.vendor.dir %>/requirejs/require-<%= pkg.version %>.js': '<%= defaults.source.dir %>/<%= defaults.vendor.dir %>/requirejs/require.js'
                }
            }
        },

        /* Helper tasks */
        copy: {
            release: {
                files: [
                    {
                        src: '*.html',
                        expand: true,
                        cwd: 'temp',
                        dest: '<%= defaults.release.dir %>'
                    }
                ]
            }
        },

        concurrent: {
            release: ['process:release', 'requirejs:release', 'uglify', 'cssmin', 'copy:release'],
            debug: ['process:debug'],
            watch: {
                tasks: ['watch:watch', 'jshint'],
                options: {
                    logConcurrentOutput: true
                }
            },
            testRelease: ['jshint'],
            testDebug: ['jshint']
        }
    });

    // Register tasks
    grunt.registerTask('default', []);
    grunt.registerTask('release', ['clean', 'concurrent:release', 'concurrent:testRelease']);
    grunt.registerTask('clean', ['clean:final']);
};