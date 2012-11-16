'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: '<json:inline-easing.jquery.json>',
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<config:banner>'
      },
      dist: {
        src: ['<file_strip_banner:src/<%= pkg.name %>.js>'],
        dest: 'dist/<%= pkg.name %>.js'
      },
    },
    compare_size: {
      files: [
        "dist/inline-easing.js",
        "dist/inline-easing.min.js",
      ]
    },
    min: {
      options: {
        banner: '<config:banner>'
      },
      dist: {
        src: ['<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      },
    },
    qunit: {
      files: ['test/**/*.html']
    },
    lint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<config:lint.gruntfile.src>',
        tasks: ['lint:gruntfile']
      },
      src: {
        files: '<config:lint.src.src>',
        tasks: ['lint:src', 'qunit']
      },
      test: {
        files: '<config:lint.test.src>',
        tasks: ['lint:test', 'qunit']
      },
    },
  });

  grunt.loadNpmTasks('grunt-compare-size');
  // Default task.
  grunt.registerTask('default', ['lint', 'qunit', 'concat', 'min', 'compare_size']);
};
