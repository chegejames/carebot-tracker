/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Load package config
    pkg: grunt.file.readJSON('package.json'),

    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        // unused: true,
        boss: true,
        eqnull: true,
      },
      files: [
        "Gruntfile.js",
        "bower.json",
        "package.json",
      ],
      lib: {
        options: {
          browser: true,
          predef: ['define']
        },
        src: "src/**/*.js",
      }
    },
    jsdoc: {
      dist: {
        src: "<%= jshint.lib.src %>",
        options: {
          destination: "api"
        }
      }
    },
    concat: {
        options: {
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        unminified: {
            src: ['src/carebot-tracker.js'],
            dest: 'dist/carebot-tracker.js'
        }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      minified: {
        files: {
          'dist/carebot-tracker.min.js': ['dist/carebot-tracker.js']
        }
      }
    },
    watch: {
      jshint: {
        files: "<%= jshint.files  %>",
        tasks: ["jshint"]
      },
      lib: {
        files: "<%= jshint.lib.src %>"
        // tasks: ["jshint:lib"]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-jsdoc");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task.
  grunt.registerTask("default", ["concat", "uglify"]);
};
