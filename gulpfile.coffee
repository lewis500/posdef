gulp = require 'gulp'
browserify = require 'browserify'
source = require 'vinyl-source-stream'
less = require 'gulp-less'
watchify = require 'watchify'
rename = require 'gulp-rename'
gutil = require 'gulp-util'
coffee_reactify = require 'coffee-reactify'

errorHandler = (e)->
	e.showProperties = false
	e.stack = ' '
	gutil.log e
	@emit 'end'

gulp.task 'thirdParty', ->
	opts = 
		require: ['lodash','d3','react','react-dom','flux', 'events','immutable','classNames','react-redux','redux']

	browserify opts
		.bundle()
		.pipe source 'thirdParty.js'
		.pipe gulp.dest './build/'

gulp.task 'less', ->
	gulp.src './styles/style.less'
		.pipe less()
		.on 'error', errorHandler
		.pipe gulp.dest './styles'

gulp.task 'jade',->
	gulp.src './app/**/*.jade'
		.pipe jade {pretty: true}
		.on 'error',errorHandler
		.pipe gulp.dest './build/'

gulp.task 'watch', ->
	#watching the less and jade stuff
	gulp.watch './styles/*.less',['less']
	gulp.watch './**/*.jade',['jade']
	#watching all my coffeescript files
	rebundle =  ->
		watcher
			.bundle()
			.on 'error', errorHandler
			.pipe source 'bundle.js'
			.pipe gulp.dest './build/'

	opts = 
			bundleExternal: false
			transform: [coffee_reactify]
			extensions: ['.coffee', '.cjsx']
			debug: true
			
	bundler = browserify './app/index.cjsx',opts
	watcher = watchify bundler
	watcher.on 'update', rebundle
	rebundle()


gulp.task 'default', [
		'watch',
		'thirdParty'
	]