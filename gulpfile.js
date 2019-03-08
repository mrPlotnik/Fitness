var	
	gulp 					= require('gulp'),
	pug 					= require('gulp-pug'),
	browserSync		= require('browser-sync'),
	plumber 			= require('gulp-plumber'),
	sass 					= require('gulp-sass'),
	cssToScss 		= require('gulp-css-scss'),

	reload				= browserSync.reload; 

gulp.task('cssToScss', () => {
	return gulp.src([
		'app/libs/bootstrap/dist/css/bootstrap-grid.min.css',
		// 'app/libs/magnific-popup/dist/magnific-popup.css',
		// 'app/libs/animate.css/animate.min.css'
		])
	.pipe(cssToScss())
	.pipe(gulp.dest('app/libs/cssToScss'));
});	

gulp.task('pug', () => {
	return gulp.src(
		'app/pug/index.pug'
		)
	.pipe(plumber())
	.pipe(pug({pretty: true}))
	.pipe(gulp.dest('dist/'))
	.pipe(reload({stream: true}))	
});

gulp.task('sass', () => { 	
	return gulp.src('app/sass/**/*.sass')		
		.pipe(sass({
			// outputStyle: 'expand', 
			// includePaths: require('node-bourbon').includePaths
		}).on('error', sass.logError)) // Оповещение в случае ошибки при компиляции SASS в CSS
		// .pipe(autoprefixer(['last 15 versions'])) // Добавление автопрефиксов, для одинакового отображения во всех браузерах (последнии 15 версий)
		// .pipe(gulp.dist('dist/css'))		
		// .pipe(csso())	// Минимизируем	 		
		// .pipe(rename({suffix: '.min', prefix : ''})) // Добавление суффикса и префикса в название CSS файла
		.pipe(gulp.dest('dist/css'))			
		.pipe(browserSync.stream()); // Inject	
});

gulp.task('browser-sync', () => { 
	browserSync({ 
		server: {baseDir: 'dist'},
		notify: false 
	});
});

gulp.task('watch', ['pug', 'sass', 'browser-sync'], () => {
	gulp.watch('app/pug/index.pug', ['pug']);
	gulp.watch('app/sass/*.sass', ['sass']);
});	


gulp.task('default', ['watch']);

