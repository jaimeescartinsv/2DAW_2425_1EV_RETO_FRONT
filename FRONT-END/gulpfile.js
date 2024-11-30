var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));

// Tarea para compilar SASS
gulp.task('compilar-sass', function() {
    return gulp.src('source/styles/*.scss')  
        .pipe(sass().on('error', sass.logError))  
        .pipe(gulp.dest('dist'));  
});

// Tarea para copiar HTML a carpeta dist
gulp.task('copiar-html', function() {
    return gulp.src('source/html/*.html') // Ruta de los HTML
        .pipe(gulp.dest('dist')); // Ruta de salida
});

// Tarea de vigilancia (watch)
gulp.task('watch', function() {
    gulp.watch('source/styles/**/*.scss', gulp.series('compilar-sass'));
});

// Tarea por defecto que ejecuta ambas tareas
gulp.task('default', gulp.series('compilar-sass', 'copiar-html', 'watch'));