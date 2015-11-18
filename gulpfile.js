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
    gulpprettify = require('gulp-prettify'),
    mqpacker = require('css-mqpacker'),

    // postcss and plugins
    postcss = require('gulp-postcss'),
    postcssSVG = require('postcss-svg'),
    precss = require('precss'),
    easings = require('postcss-easings'),
    postcssCenter = require('postcss-center'),
    lost = require('lost'),
    cssnano = require('gulp-cssnano'),
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
        js: 'src/js/main.js',
        style: 'src/style/main.css',
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

var configPrettify = {
    "indent_size": 4,
    "indent_char": " ",
    "eol": "\n",
    "indent_level": 0,
    "indent_with_tabs": true,
    "indent-inner-html": true,
    "preserve_newlines": true,
    "max_preserve_newlines": 10,
    "jslint_happy": false,
    "space_after_anon_function": false,
    "brace_style": "collapse",
    "keep_array_indentation": false,
    "keep_function_indentation": false,
    "space_before_conditional": true,
    "break_chained_methods": false,
    "eval_code": false,
    "unescape_strings": false,
    "wrap_line_length": 0,
    "wrap_attributes": "auto",
    "wrap_attributes_indent_size": 4,
    "end_with_newline": false
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('hello', function () {
  gutil.beep();
  gutil.log(gutil.colors.black.bgYellow(" Welcome to          "));
  gutil.log(gutil.colors.black.bgYellow(" ┌─┐┌─┐┌─┐┌─┐┬─┐┬┌┐┌ "));
  gutil.log(gutil.colors.black.bgYellow(" │ ┬├─┤│ ┬├─┤├┬┘││││ "));
  gutil.log(gutil.colors.black.bgYellow(" └─┘┴ ┴└─┘┴ ┴┴└─┴┘└┘ "));
  gutil.log(gutil.colors.black.bgYellow("             v." + pkg.version + " "));
});

gulp.task('build:html', function () {
    gulp.src(path.src.jade)
        .pipe(jade({pretty: true}))
        .pipe(gulpprettify(configPrettify))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('build:js', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
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
            mqpacker
        ]))

        .pipe(cssnano({
          convertValues: {
            length: false
          },
          discardComments: {
            removeAll: true
          }
        }))

        .pipe(gulp.dest(path.build.css))
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

gulp.task('build:fonts', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    'hello',
    'build:html',
    'build:js',
    'build:css',
    'build:fonts',
    'build:images'
]);


gulp.task('watch', function(){
    watch([path.watch.jade], function(event, cb) {
        gulp.start('build:html');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('build:css');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('build:js');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('build:images');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('build:fonts');
    });
    
});


gulp.task('default', ['build', 'webserver', 'watch']);
