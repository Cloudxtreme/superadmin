module.exports = function (grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Task configuration.
        clean: {
            dist: ['dist']
        },

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

    grunt.registerTask('default', []);
    grunt.registerTask('buildcss', ['cssmin']);
};