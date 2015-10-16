// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var dir = {
    src: {
        js: 'src/js/**/*.js',
        scss: 'src/scss/**/*.scss',
        html: 'src/html/**/*.html'        
    },
    out: {
        html: 'public/html',
        css: 'public/css',
        js: 'public/js'
    }
};

gulp.task('html', function() {
    return gulp.src(dir.src.html)
        .pipe(gulp.dest(dir.out.html));
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src(dir.src.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src(dir.src.scss)
        .pipe(sass())
        .pipe(gulp.dest(dir.out.css));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(dir.src.js)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(dir.out.js))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dir.out.js));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(dir.src.js, ['lint', 'scripts']);
    gulp.watch(dir.src.scss, ['sass']);
    gulp.watch(dir.src.html, ['html']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'html', 'watch']);

