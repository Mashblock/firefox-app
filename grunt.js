/*global module:false*/
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib');

  // Project configuration.
  grunt.initConfig({
    watch: [{
      files:["www/coffee/**/*.coffee"],
      tasks: 'coffee'
    }],
    coffee: {
      compile: {
        files: {
          'www/js/app.js': ['www/coffee/*.coffee', 'www/coffee/**/*.coffee']
        }
      }
    },
  });

  // Default task.
  grunt.registerTask('default', 'watch');

};
