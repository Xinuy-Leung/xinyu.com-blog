var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();

var path = {
    compass: {
        config_file: './public/config.rb',
        css: './public/css',
        sass: './public/scss'
    },
    scss: ['./public/scss/*.scss','./public/scss/**/*.scss'],
    css: './public/css',
    nodemon: {
        script: 'app.js',
    },
    js:'./public/js/*.js'
}

gulp.task('compass', function() {
    gulp.watch(path.scss,function(){
        gulp.src(path.scss)
            // .pipe(plugins.watch(path.scss))
            .pipe(plugins.compass(path.compass))
            .pipe(gulp.dest(path.css))
    })
});

var nodemonConfig = {
    script: path.nodemon.script,
    env: {
        "NODE_ENV": "development"
    }
}

gulp.task('nodemon', function() {
    plugins.nodemon(nodemonConfig);
})

gulp.task('develop', ['nodemon'],function(){
    gulp.watch(path.scss,['compass']);
})
gulp.task('jshint', function () {
    gulp.src(path.js)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'));
});
gulp.task('watch',function(){
    gulp.watch(path.js,['jshint'])
})
gulp.task('default',['compass','watch'])