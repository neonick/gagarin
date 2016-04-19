'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    jade = require('gulp-jade'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    rigger = require("gulp-rigger"),
    gutil = require('gulp-util'),
    mqpacker = require('css-mqpacker'),
    sourcemaps = require('gulp-sourcemaps'),
    csso = require('postcss-csso'),

    // postcss and plugins
    postcss = require('gulp-postcss'),
    postcssSVG = require('postcss-svg'),
    precss = require('precss'),
    easings = require('postcss-easings'),
    postcssCenter = require('postcss-center'),
    lost = require('lost'),
    autoprefixer = require('autoprefixer'),
    postcssfocus = require('postcss-focus'),
    brandcolors = require('postcss-brand-colors'),
    fontmagician = require('postcss-font-magician'),
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
        js: 'src/js/scripts.js',
        style: 'src/style/styles.css',
        img: 'src/i/*.+(jpg|jpeg|png|svg|gif|ico)',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        jade: 'src/jade/**/*.jade',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.css',
        img: 'src/i/*.+(jpg|jpeg|png|svg|gif|ico)',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logLevel: "silent",
    // logLevel: "info",
    logPrefix: "Gagarin",
    notify: false,
    ghostMode: false,
    online: false,
    open: true
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('hello', function () {
  gutil.beep();
  gutil.log(gutil.colors.black.bgWhite(" Welcome to          "));
  gutil.log(gutil.colors.black.bgWhite(" ┌─┐┌─┐┌─┐┌─┐┬─┐┬┌┐┌ "));
  gutil.log(gutil.colors.black.bgWhite(" │ ┬├─┤│ ┬├─┤├┬┘││││ "));
  gutil.log(gutil.colors.black.bgWhite(" └─┘┴ ┴└─┘┴ ┴┴└─┴┘└┘ "));
  gutil.log(gutil.colors.black.bgWhite("             v." + pkg.version + " "));
});

gulp.task('html', function () {
    gulp.src(path.src.jade)
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});


// js tasks

gulp.task('watch:js', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});


gulp.task('build:js', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});


// css tasks

gulp.task('watch:css', function () {
    gulp.src(path.src.style)

        .pipe(sourcemaps.init())

        .pipe(rigger())

        .pipe( postcss([
            precss,
            brandcolors,
            lost,
            postcssSVG({
                paths: ['src/i/'],
            }),
            fontmagician,
            postcssCenter,
            postcssfocus,
            easings,
            autoprefixer({ browsers: ['last 2 versions'] }),
            mqpacker
        ]))

        .pipe(sourcemaps.write())

        .pipe(gulp.dest(path.build.css))

        .pipe(reload({stream: true}));
});


gulp.task('build:css', function () {
    gulp.src(path.src.style)

        .pipe(rigger())

        .pipe( postcss([
            precss,
            brandcolors,
            lost,
            postcssSVG({
                paths: ['src/i/'],
            }),
            fontmagician,
            postcssCenter,
            postcssfocus,
            easings,
            autoprefixer({ browsers: ['last 2 versions'] }),
            mqpacker,
            csso
        ]))

        .pipe(gulp.dest(path.build.css))

        .pipe(reload({stream: true}));
});


// img tasts

gulp.task('watch:images', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('build:images', function () {
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

gulp.task('fonts', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});


gulp.task('watch', function(){
    
    watch([path.watch.jade], function(event, cb) {
        gulp.start('html');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('watch:css');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('watch:js');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('watch:images');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts');
    });
    
});




gulp.task('default', 
    ['hello',
     'watch',
     'webserver'
]);


gulp.task('build',   
    ['html', 
     'build:js',
     'build:css',
     'fonts',
     'build:images',
     'webserver'
]);