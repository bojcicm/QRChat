module.exports = function(grunt) {
  "use strict";
  
  grunt.initConfig({
    ts: {
      app: {
        files: [{
          src: ["src/\*\*/\*.ts", "!src/.baseDir.ts"],
          dest: "./dist"
        }],
        options: {
          module: "commonjs",
          target: "es6",
          sourceMap: true
    }}},

    watch: {
      ts: {
        files: ["src/\*\*/\*.ts"],
        tasks: ["ts:app"]
      },
      options: {
            spawn: false // makes the watch task faster
    }},

    nodemon:{
      dev:{
        script:'./bin/www.js'
      }
    },
    
    concurrent:{
      watchers:{
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
    }}}
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-nodemon");
  grunt.loadNpmTasks("grunt-concurrent");

  grunt.registerTask("default", ["copy", "ts"]);
  grunt.registerTask("serve", ["concurrent:watchers"]);

};