module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      all: {
        files: ['js/script.js', 'css/style.css', 'index.html'],
        tasks: ['validation','csslint','jshint']
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'js/script.js']
    },
    validation: {
      options: {
        reset: grunt.option('reset') || false,
        stoponerror: false,
      },
      files: {
        src: ['index.html']
      }
    },
    csslint: {
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
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'css/style.min.css': ['css/style.css']
        }
      }
    },
    imagemin: {
      static: {
        options: {
          optimizationLevel: 3,
          svgoPlugins: [{removeViewBox: false}],
        },
        files: {
          'images/News.min.jpg': 'images/News.jpg',
        }
      }
    }
  });

  // grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('ugly', ['uglify', 'cssmin', 'imagemin']);

};