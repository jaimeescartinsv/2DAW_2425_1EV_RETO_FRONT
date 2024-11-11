var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));

// Tarea para compilar SASS
gulp.task('compilar-sass', function() {
    return gulp.src('source/styles/main.scss')  
        .pipe(sass().on('error', sass.logError))  
        .pipe(gulp.dest('dist'));  
});

// Tarea para optimizar imágenes usando import() dinámico
gulp.task('optimizar-imagenes', async function() {
    const imagemin = (await import('gulp-imagemin')).default;
    return gulp.src('source/images/**/*')  
        .pipe(imagemin())  
        .pipe(gulp.dest('dist/images'));  
});

// Tarea de vigilancia (watch)
gulp.task('watch', function() {
    gulp.watch('source/styles/**/*.scss', gulp.series('compilar-sass'));
    gulp.watch('source/images/**/*', gulp.series('optimizar-imagenes'));
});

// Tarea por defecto que ejecuta ambas tareas
gulp.task('default', gulp.series('compilar-sass', 'optimizar-imagenes', 'watch'));