module.exports = function(grunt) {

	// Project configuration
	grunt.initConfig({

		concat: {
			js: {
				src: ['assets/js/main.js', 'assets/js/linegraph.js'],
				dest: 'build/script.js',
			},
		},

		watch: {
			js: {
				files: ['assets/js/*.js'],
				tasks: ['concat:js'],
			},
			css: {
				files: ['assets/css/*.css'],
				tasks: ['concat:css'],
			}
		},

		browserSync: {
			bsFiles: {
				src : [
					'./*.html',
					'assets/css/*.css',
					'assets/js/*.js',
					'assets/js/states/*.js'
				]
			},
			options: {
				server: {
					baseDir: "./"
				}
			}
		}

});

grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-browser-sync');

grunt.registerTask('go', ['concat', 'browserSync']);

}