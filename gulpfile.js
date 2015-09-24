'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    jade = require('gulp-jade'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    rigger = require("gulp-rigger"),
    gutil = require('gulp-util'),

    // postcss and plugins
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    precss = require('precss'),
    pkg = require('./package.json'),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/i/',
        fonts: 'build/fonts/'
    },
    src: {
        jade: 'src/jade/*.jade',
        js: 'src/js/main.js',
        style: 'src/style/main.scss',
        img: 'src/i/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        jade: 'src/jade/**/*.jade',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.css',
        img: 'src/i/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logLevel: "silent",
    logPrefix: "Gagarin"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('hello', function () {
  gutil.beep();
  gutil.log(gutil.colors.white.bgGreen(" ┌─┐┌─┐┌─┐┌─┐┬─┐┬┌┐┌ "));
  gutil.log(gutil.colors.white.bgGreen(" │ ┬├─┤│ ┬├─┤├┬┘││││ "));
  gutil.log(gutil.colors.white.bgGreen(" └─┘┴ ┴└─┘┴ ┴┴└─┴┘└┘ "));
  gutil.log(gutil.colors.white.bgGreen('Welcome to Gagarin v.' + pkg.version + '. Poyekhali!'));
});

gulp.task('jade:build', function () {
    gulp.src(path.src.jade)
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(rigger())

        .pipe( postcss([
            precss,
            autoprefixer({ browsers: ['last 2 versions'] })
        ]))
        
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    'hello',
    'jade:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);


gulp.task('watch', function(){
    watch([path.watch.jade], function(event, cb) {
        gulp.start('jade:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});


gulp.task('default', ['build', 'webserver', 'watch']);
