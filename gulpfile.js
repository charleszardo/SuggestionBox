var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('serve', () => {
  browserSync.init({
    server: './'
  })
	gulp.watch('index.html').on('change', reload);
	gulp.watch('views/*.html').on('change', reload);
  gulp.watch('css/*.css').on('change', reload);
	gulp.watch('js/**/*.js').on('change', reload);
	gulp.watch('sass/**/*.scss',['styles']);
})

gulp.task('styles', function() {
	return gulp.src('sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css/'));
});