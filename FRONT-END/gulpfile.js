var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));

// Tarea para compilar SASS
gulp.task('compilar-sass', function() {
    return gulp.src('source/styles/main.scss')  
        .pipe(sass().on('error', sass.logError))  
        .pipe(gulp.dest('dist'));  
});

// Tarea de vigilancia (watch)
gulp.task('watch', function() {
    gulp.watch('source/styles/**/*.scss', gulp.series('compilar-sass'));
});