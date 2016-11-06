'use strict'

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt)
  require('time-grunt')(grunt)

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      dist: {
        files: {
          'dist/app.js': ['src/**/*.js']
        },
        options: {
          transform: ['babelify']
        }
      }
    },

    run: {
      test: {
        cmd: 'npm',
        args: ['test']
      }
    },

    watch: {
      js: {
        files: ['src/**/*.js'],
        tasks: ['browserify', 'test']
      }
    }
  })

  grunt.registerTask('default', [
      'watch'
    ]
  )
  grunt.registerTask('test', ['run:test'])

}
