/**
 *	Cloudwalkers Gruntfile
 *	
 *	The gruntfile takes care of JS sanity testing,
 *	compression of javascript and css files, concatinating of template files
 *	and the templating process of the html files.
 *
 *	Run before first use: 		grunt install
 *	Run for release: 			grunt release
 *	Run for staging:			grunt staging
 *	Change listener:			grunt watcher
 *	
 *	Working directory: 			src
 *	Distribution direactory: 	dist
 *	Required files: 			package.json (all grunt plugins are listed)
 *	Interesting read: 			http://www.html5rocks.com/en/tutorials/tooling/supercharging-your-gruntfile/
**/

<<<<<<< HEAD
/*global module:false*/
module.exports = function (grunt)
{
	// load all grunt tasks
	require('load-grunt-tasks')(grunt);
=======
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
            source: {
                src: ['<%= defaults.source.dir %>/*.html']
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
>>>>>>> FETCH_HEAD

	// Project configuration.
	grunt.initConfig(
	{
		pkg: grunt.file.readJSON('package.json'),
		
		defaults: {
			source: { dir: 'src' },
			staging: { dir: 'staging' },
			release: { dir: 'dist' }
		},
		
		/* Testing */
		jshint: {
			options: {
				asi: true, eqnull: true, jquery: true
			},
			source: ['<%= defaults.source.dir %>/js/**/*.js', '*.js']
		},
		
		/* Cleaning */
		clean: {
			staging: ['<%= defaults.staging.dir %>'],
			release: ['<%= defaults.release.dir %>']
		},
		
		/* Build files */
		mustache_render: {
			staging: {
				files:
				[{
					expand: true,
					cwd: '<%= defaults.source.dir %>/',
					src: '*.html',
					dest: '<%= defaults.staging.dir %>/',
					data: {
						title: '<%= pkg.title %>',
						description: '<%= pkg.description %>',
						version: '<%= pkg.version %>',
						files: {
							stylesheets: grunt.file.expand({cwd: 'src'}, 'css/**/*.css').map(function(path){ return {src: '/' + path}; }),
							scripts: grunt.file.expand({cwd: 'src'}, 'js/**/*.js').map(function(path){ return {src: '/' + path}; }),
							templates: '/js/templates.js'
						}
					}
				}]
			},
			release: {
				files:
				[{
					expand: true,
					cwd: '<%= defaults.source.dir %>/',
					src: '*.html',
					dest: '<%= defaults.release.dir %>/',
					data: {
						title: '<%= pkg.title %>',
						description: '<%= pkg.description %>',
						version: '<%= pkg.version %>',
						files: {
							stylesheets: [{src: '/css/styles-<%= pkg.version %>.min.css'}],
							scripts: [{src: '/js/cloudwalkers-<%= pkg.version %>.min.js'}],
							templates: '/js/templates-<%= pkg.version %>.js'
						}
					}
				}]
			}
		},
		
		/* Compress files */
		cssmin: {
			combine: {
				files: {
					'<%= defaults.release.dir %>/css/styles-<%= pkg.version %>.min.css': [
						'<%= defaults.source.dir %>/css/**/*.css',
						'!*.combine.css',
						'!*.min.css'
					]
				}
			}
		},
		
		uglify: {
			release: {
				files: {
					'<%= defaults.release.dir %>/js/cloudwalkers-<%= pkg.version %>.min.js': [
						'<%= defaults.source.dir %>/js/**/*.js',
						'!*.min.js'
					]
				}
			}
		},
		
		/* Copy and concatinate files */
		copy: {
			staging: {
				files: [
					{expand: true, cwd: '<%= defaults.source.dir %>', src: ['*.txt', '*.ico','images/**','fonts/**','css/**','js/**','storage/**'], dest: '<%= defaults.staging.dir %>/', filter: 'isFile'},
					{expand: true, cwd: '<%= defaults.source.dir %>', src: ['vendor/*/*.js','vendor/*/*.css','vendor/*/dist/**','vendor/*/lib/**',"!**/Gruntfile.js"], dest: '<%= defaults.staging.dir %>/'}
				]
			},
			release: {
				files: [
					{expand: true, cwd: '<%= defaults.source.dir %>', src: ['*.txt', '*.ico','images/**','fonts/**','storage/**'], dest: '<%= defaults.release.dir %>/', filter: 'isFile'},
					{expand: true, cwd: '<%= defaults.source.dir %>', src: ['vendor/*/*.js','vendor/*/*.css','vendor/*/dist/**','vendor/*/lib/**',"!**/Gruntfile.js"], dest: '<%= defaults.release.dir %>/'}
				]
			}
		},
		
		mustache: {
			staging : {
				src: '<%= defaults.source.dir %>/templates/',
				dest: '<%= defaults.staging.dir %>/js/templates.js',
				options: {
					prefix: 'Templates = ',
					postfix: ';'
				}
			},
			release : {
				src: '<%= defaults.source.dir %>/templates/',
				dest: '<%= defaults.release.dir %>/js/templates-<%= pkg.version %>.js',
				options: {
					prefix: 'Templates = ',
					postfix: ';'
				}
			}
		},
		
		/* Balance processes */
		concurrent: {
			staging: ['mustache_render:staging', 'copy:staging', 'mustache:staging'],
			release: ['mustache_render:release', 'cssmin', 'copy:release', 'uglify', 'mustache:release'],
			/*watch: ['newer:mustache_render:staging', 'newer:copy:staging', 'newer:mustache:staging'],*/
			watch: ['newer:mustache_render:staging', 'newer:copy:staging', 'mustache:staging'],
			test: ['jshint:source']
		},
		
		/* Watch the beast */
		watch: {
			files: ['<%= defaults.source.dir %>/**/*.*','<%= defaults.source.dir %>/*.js','!<%= defaults.source.dir %>/vendor'],
			tasks: ['concurrent:watch']
		}
	});
	
	// Register tasks
	grunt.registerTask('staging', ['concurrent:test', 'clean:staging', 'concurrent:staging']);
	grunt.registerTask('release', ['concurrent:test', 'clean:release', 'concurrent:release']);
	grunt.registerTask('watcher', ['watch']);
	grunt.registerTask('default', ['release']);
};