module.exports = function (grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        defaults: {
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
            requirejs: {
                /* Note: We build directly from the source directory to avoid copying of libs */
                baseUrl: 'src/app',
                mainConfigFile: 'src/app/config.js',
                dir: 'temp/app',
                optimize: 'none',
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
            all: [ 'temp', '<%= defaults.debug.dir %>', '<%= defaults.release.dir %>' ]
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
                    stylesheetLanguage: 'stylesheet',
                    scriptFile: 'scripts/main.js',
                    scriptLoader: 'vendor/requirejs/require.js',
                    scripts: []
                }
            },
            release: {
                src: '<%= defaults.source.dir %>/index.html',
                dest: '<%= defaults.release.dir %>/index.html',
                context: {
                    stylesheetFile: 'css/styles-<%= pkg.version %>.css',
                    stylesheetLanguage: 'stylesheet',
                    scriptFile: 'app/main-<%= pkg.version %>.js',
                    scriptLoader: 'vendor/requirejs/require-<%= pkg.version %>.js',
                    scripts: []
                }
            }
        },
        requirejs: {
            release: {
                options: '<%= defaults.requirejs %>'
            }
        },

        // Build JS into one monolith by JamJS/RequireJS
        uglify: {
            release: {
                files: {
                    '<%= defaults.release.dir %>/js/main-<%= pkg.version %>.js': 'temp/js/main.js',
                    '<%= defaults.release.dir %>/vendor/requirejs/require-<%= pkg.version %>.js': '<%= defaults.source.dir %>/vendor/requirejs/require.js'
                }
            }
        },

        /* Helper tasks */
        copy: {
            release: {
                files: [
                    /* Copy to temp directory first */
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
            release: ['process:release', 'requirejs:release', 'uglify', 'copy:release'],
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


    /*

     // Task configuration.


     cssmin: {
     build: {
     src: 'src/styles/styles.css',
     dest: 'dist/css/styles.css'
     }
     },

     watch: {
     html: {
     files: ['index.html'],
     tasks: ['htmlhint']
     },
     js: {
     files: ['src/scripts/main.js'],
     tasks: ['uglify']
     },
     css: {
     files: ['src/styles/*.css'],
     tasks: ['buildcss']
     }
     },

     htmlhint: {
     build: {
     options: {
     'tag-pair': true, // Force tags to have a closing pair
     'tagname-lowercase': true, // Force tags to be lowercase
     'attr-lowercase': true, // Force attribute names to be lowercase e.g. <div id="header"> is invalid
     'attr-value-double-quotes': true, // Force attributes to have double quotes rather than single
     'doctype-first': true, // Force the DOCTYPE declaration to come first in the document
     'spec-char-escape': true, // Force special characters to be escaped
     'id-unique': true, // Prevent using the same ID multiple times in a document
     'head-script-disabled': true, // Prevent script tags being loaded in the  for performance reasons
     'style-disabled': true // Prevent style tags. CSS should be loaded through
     },
     src: ['index.html']
     }
     },

     uglify: {
     build: {
     files: {
     'dist/js/main.min.js': ['src/scripts/main.js']
     }
     }
     }

     });
     */
    grunt.registerTask('default', ['cssmin']);

    grunt.registerTask('release', ['clean', 'concurrent:release', 'concurrent:testRelease']);


    grunt.registerTask('buildcss', ['cssmin']);
};