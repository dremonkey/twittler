'use strict';

var liveReloadPort;

liveReloadPort = 35720;

module.exports = function (grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  
  // ## Define the configuration for all the tasks
  grunt.initConfig({

    // Files to watch for changes in order to make the browser reload
    watch: {
      options: {
        livereload: liveReloadPort
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      js: {
        files: ['app/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:app'],
      },
      compass: {
        files: ['styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:serve'],
      },
      // sass: {
      //   files: ['styles/{,*/}*.{scss,sass}'],
      //   tasks: ['sass:serve'],
      // },
      livereload: {
        files: [
          'app/index.html', // client side index file
          'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '.tmp/styles/{,*/}*.css', // compiled styles
        ]
      },
    },

    // Check javascript for errors
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        src: ['Gruntfile.js']
      },
      app: {
        src: [
          'app/scripts/{,*/}*.js',
          '!app/scripts/data_generator.js'
        ]
      }
    },

    compass: {
      options: {
        sassDir: 'app/styles',
        imagesDir: 'app/images',
        fontsDir: 'app/fonts',
        importPath: 'app/components/bootstrap-sass/vendor/assets/stylesheets',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        // raw: 'Sass::Script::Number.precision = 10\n'
      },
      serve: {
        options: {
          debugInfo: true,
          cssDir: '.tmp/styles',
          generatedImagesDir: '.tmp/images/generated'
        }
      }
    },

    // sass: {
    //   serve: {
    //     options: {
    //       // not sure includePaths actually does anything
    //       includePaths: [
    //         'app/components/bootstrap-sass/vendor/assets/stylesheets',
    //         'app/styles'
    //       ],
    //       outputStyle: 'nested'
    //     },
    //     files: {
    //       // needs to be full paths or error: "source string:1: error: invalid top-level expression"
    //       // @see https://github.com/sindresorhus/grunt-sass/issues/46
    //       '.tmp/styles/bootstrap.css': 'app/components/bootstrap-sass/vendor/assets/stylesheets/bootstrap.scss',
    //       '.tmp/styles/main.css': 'app/styles/main.scss'
    //     }
    //   }
    // },

    // The grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: liveReloadPort
      },
      livereload: {
        options: {
          open: true,
          base: [
            // Directories to serve static files from
            '.tmp',
            'app',
          ]
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      all: {
        files: '.tmp'
      },
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Tasks to run concurrently to speed up the build process
    concurrent: {
      serve: [
        'compass:serve'
        // 'sass:serve'
      ],
    }
  });


  // ## Register all Grunt Tasks
  // target can be set using the following syntax: grunt serve:target
  grunt.registerTask('serve', function (target) {

    // If not using the connect server, this runs everything but the connect server...
    // If you want livereload to work with the settings in this file, in your server 
    // inject the livereload snippet using connect-livereload and configure to the same port set here
    if ('noserver' === target) {
      return grunt.task.run([
        'clean:all',
        'newer:jshint',
        'concurrent:serve',
        'autoprefixer',
        'watch'
      ]);
    }

    grunt.task.run([
      'clean:all',
      'newer:jshint',
      'concurrent:serve',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });
};