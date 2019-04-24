var	
	gulp 					= require('gulp'),
	pug 					= require('gulp-pug'),
	browserSync		= require('browser-sync'),
	plumber 			= require('gulp-plumber'),
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
	gutil 				= require('gulp-util'),

	reload				= browserSync.reload; 

gulp.task('pug', () => {
	return gulp.src(
			'app/pug/index.pug',			
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
			includePaths: require('node-bourbon').includePaths
		}).on('error', sass.logError)) // Оповещение в случае ошибки при компиляции SASS в CSS
		// .pipe(autoprefixer(['last 15 versions'])) // Добавление автопрефиксов, для одинакового отображения во всех браузерах (последнии 15 версий)
		// .pipe(gulp.dist('dist/css'))		
		// .pipe(csso())	// Минимизируем	 		
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
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('dist/js'))
	.pipe(reload({ stream: true }))
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
gulp.task('imagemin', () => {
	gulp.src('app/img/**/*')	
		.pipe(cache(imagemin()) // Cache Images
			.pipe(gulp.dest('dist/img/'))
		)	
});

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
		password: '', // Do not forget to delete
		parallel: 100,
		maxConnections: 5,
		log:      gutil.log
	});

	var globs = [	'dist/**'	];

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
gulp.task('watch', ['pug', 'sass', 'js', 'php', 'imagemin', 'browser-sync'], () => {
	gulp.watch('app/pug/**/*.pug', ['pug']);
	gulp.watch('app/sass/*.sass', ['sass']);
	gulp.watch('app/js/*.js', ['js']);
	gulp.watch('app/*.php', ['php']);
});	

//-------------------------------------------	
// Скопировать шрифты в директорию dist,
// преобразовать CSS в SCSS
//-------------------------------------------	
gulp.task('beforeTheStart', ['cssToScss', 'copyFont'], () => {
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
gulp.task('default', ['removedist','beforeTheStart', 'watch']);

