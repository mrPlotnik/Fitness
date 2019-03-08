var	
	gulp 					= require('gulp'),
	pug 					= require('gulp-pug'),
	browserSync		= require('browser-sync'),
	plumber 			= require('gulp-plumber'),

	reload				= browserSync.reload; 

gulp.task('pug', () => {
	return gulp.src(
		'app/pug/index.pug'
		)
	.pipe(plumber())
	.pipe(pug({pretty: true}))
	.pipe(gulp.dest('dist/'))
	.pipe(reload({stream: true}))	
});

//---------------------------------------------
// Browser-Sync
//---------------------------------------------
gulp.task('browser-sync', () => { 
	browserSync({ 
		server: {baseDir: 'dist'},
		notify: false 
	});
});

gulp.task('watch', ['browser-sync'], () => {
	gulp.watch('app/pug/index.pug', ['pug']);
});	


gulp.task('default', ['watch']);

