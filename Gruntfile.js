module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      all: {
        files: ['js/script.js', 'css/style.css', 'index.html'],
        tasks: ['csslint','jshint','validation']
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'js/*.js']
    },
    validation: {
      // options: {
      //   reset: grunt.option('reset') || false,
      //   stoponerror: false,
      //   remotePath: 'http://decodize.com/',
      //   remoteFiles: ['html/moving-from-wordpress-to-octopress/',
      //                 'css/site-preloading-methods/'], //or
      //   remoteFiles: 'validation-files.json', // JSON file contains array of page paths.
      //   relaxerror: ['Bad value X-UA-Compatible for attribute http-equiv on element meta.'], //ignores these errors
      // generateReport: false
      //   errorHTMLRootDir: "w3cErrorFolder",
      //   useTimeStamp: true,
      //   errorTemplate: "w3c_validation_error_Template.html"
      // },
      files: {
        src: ['index.html']
      }
    },
    csslint: {
      // strict: {
      //   options: {
      //     import: 2
      //   },
      //   src: ['path/to/**/*.css']
      // },
      lax: {
        options: {
          import: false
        },
        src: ['css/*.css']
      }
    },
    uglify: {
      build: {
        src: "js/script.js",
        dest: "js/script.min.js"
      }
    }
  });

  // grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-w3c-html-validation');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['validation','jshint', 'csslint']);
  grunt.registerTask('ugly', ['uglify']);

};