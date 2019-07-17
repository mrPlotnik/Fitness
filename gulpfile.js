let isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

const	
	gulp 					= require('gulp'),
	plumber 			= require('gulp-plumber'),

	pug 					= require('gulp-pug'),

	browserSync		= require('browser-sync'),

	sourceMaps 		= require('gulp-sourcemaps'),
	
	sass 					= require('gulp-sass'),
	cssToScss 		= require('gulp-css-scss'),
	autoprefixer 	= require('gulp-autoprefixer'), // Подключаем библиотеку для автоматического добавления префиксов
	csso 					= require('gulp-csso'), // Подключаем отличный CSS компрессор
	
	concat        = require('gulp-concat'),
	rename 				= require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	uglify        = require('gulp-uglify'),
	imagemin 			= require('gulp-imagemin'), // Оптимизируем картинки
	cache         = require('gulp-cache'), // Подключаем библиотеку кеширования
	del         	= require('del'), // Подключаем библиотеку для  удаления файлов и папок
	ftp 					= require('vinyl-ftp'),

	notify        = require('gulp-notify'),
	debug      	  = require('gulp-debug'),
	gulpIf 				= require('gulp-if'),
	gutil 				= require('gulp-util'),

	reload				= browserSync.reload; 

gulp.task('pug', () => {
	return gulp.src( 'app/pug/index.pug', )
		.pipe(plumber())
		.pipe(pug({pretty: true}))
		.pipe(gulp.dest('dist/'))
		.pipe(reload({stream: true}))	
});

gulp.task('sass', () => { 	
	return gulp.src('app/sass/main.sass')		
		.pipe(gulpIf(isDev, sourceMaps.init()))
		.pipe(sass({
			outputStyle: 'expanded', 
			includePaths: require('node-bourbon').includePaths
		}).on('error', notify.onError({
			message: 'Где-то тут: <%= error.message %>',
			title: 'Ошибка в SASS'
		}))) 
		.pipe(gulpIf(isDev, sourceMaps.write()))    
		.pipe(gulpIf(!isDev, autoprefixer(['last 15 versions']))) // Добавление автопрефиксов, для одинакового отображения во всех браузерах (последнии 15 версий)
		.pipe(gulpIf(!isDev, csso())) // Минимизируем				
		// .pipe(rename({suffix: '.min', prefix : ''})) // Добавление суффикса и префикса в название CSS файла
		.pipe(gulp.dest('dist/css'))			
		.pipe(browserSync.stream()); // Inject	
});

gulp.task('js', () => {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/jQuery.equalHeights/jquery.equalheights.min.js',
		'app/libs/page-scroll-to-id/jquery.malihu.PageScroll2id.js',
		'app/libs/bootstrap-validator/dist/validator.min.js',
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
		'app/js/form.js',
		'app/js/common.js', // Always at the end
		])
		.pipe(gulpIf(isDev, sourceMaps.init()))
		.pipe(concat('scripts.min.js'))
		.pipe(gulpIf(isDev, sourceMaps.write())) 
		.pipe(gulpIf(!isDev, uglify()))
		.pipe(gulp.dest('dist/js'))
		.pipe(reload({stream: true}))
});

//-------------------------------------------
// Копируем php
//-------------------------------------------
gulp.task('php', () => {	
	return gulp.src('app/php/*.php')		
	.pipe(gulp.dest('dist/php/'));
});	

//----------------------------------------------
// Оптимизация, минификация изображений
//----------------------------------------------
gulp.task('imagemin', () =>
	gulp.src('app/img/**/*')
		.pipe(gulpIf(!isDev, imagemin({
			optimizationLevel: 7,
			progressive: true,
			interlaced: true
			// svgoPlugins: [
			// 	{removeUnknownsAndDefaults: false},
			// 	{cleanupIDs: false},
			// 	{removeViewBox: false}
			// ]
		}))
		.pipe(gulp.dest('dist/img'))
));

gulp.task('clear', () =>
		cache.clearAll()
);

//---------------------------------------------
// Browser-sync
//---------------------------------------------
gulp.task('browser-sync', () => { 
	browserSync({ 
		server: {baseDir: 'dist'},
		notify: false 
	});
});

//---------------------------------------------
// Vynil-FTP. Деплой на сервер
//---------------------------------------------
gulp.task( 'deploy', () => {

	var conn = ftp.create( {
		host:     'files.000webhost.com',
		port:     '21',
		user:     'alenkakr',
		password: 'JRgfKOZxDfvBzrtLsNES', // Do not forget to delete
		parallel: 10,
		// maxConnections: 3,
		log:      gutil.log
	});

	var globs = [ 'dist/**' ];

	return gulp.src( globs, { base: 'dist', buffer: false } )
		// .pipe( conn.newer( 'public_html/' ) ) // only upload newer files
		.pipe( conn.dest( 'public_html/' ) );
	});  

//-------------------------------------------
// Копируем шрифты
//-------------------------------------------
gulp.task('copyFont', () => {
	return gulp.src('app/fonts/*')		
	.pipe(gulp.dest('dist/fonts'));
});

//-------------------------------------------
// Компилируем CSS в SCSS
//-------------------------------------------		
gulp.task('cssToScss', () => {
	return gulp.src([				
		'app/libs/animate.css/animate.min.css',
		'app/libs/magnific-popup/dist/magnific-popup.css'
		])
	.pipe(cssToScss())
	.pipe(gulp.dest('app/libs/cssToScss'));
});	

//----------------------------------------------
// Наблюдаем за изменениями, компилируем, перезагружаем
//----------------------------------------------
gulp.task('watch', gulp.parallel('pug', 'sass', 'js', 'php', 'imagemin', 'browser-sync'), () => {
	gulp.watch('app/pug/**/*.pug',  gulp.parallel('pug'));
	gulp.watch('app/sass/*.sass',  gulp.parallel('sass'));
	gulp.watch('app/js/*.js',  gulp.parallel('js'));
	gulp.watch('app/*.php',  gulp.parallel('php'));
});	

//-------------------------------------------	
// Скопировать шрифты в директорию dist,
// преобразовать CSS в SCSS
//-------------------------------------------	
gulp.task('beforeTheStart', gulp.series('cssToScss', 'copyFont', 'watch'), () => {
	console.log('');
});

//----------------------------------------------
// Очистка директории
//----------------------------------------------
gulp.task('removedist', () => {
	return del.sync('dist/*'); 
});

//----------------------------------------------
// По умолчанию (при запуске)
//----------------------------------------------
gulp.task('default', gulp.parallel('removedist','beforeTheStart'));