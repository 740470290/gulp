var gulp=require('gulp')
var concat=require('gulp-concat')
var rename=require('gulp-rename')
var uglify=require('gulp-uglify')
var less=require('gulp-less')
var cleanCss=require('gulp-clean-css')
var htmlmin=require('gulp-htmlmin')
var livereload=require('gulp-livereload')
var connect=require('gulp-connect')
var open=require('open')


// 转化js
gulp.task('js',function () {
    return gulp.src('src/js/*.js')
        .pipe(concat('build.js')) // 合并
        .pipe(gulp.dest('dist/js/'))// 输出
        .pipe(uglify())// 压缩
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('dist/js/'))
        .pipe(livereload())
        .pipe(connect.reload())
})
// 转化less
gulp.task('less',function () {
    return gulp.src('src/less/*.less')
        .pipe(less())// 转化less
        .pipe(gulp.dest('src/css'))
        .pipe(livereload())
        .pipe(connect.reload())
})
// 转化css
gulp.task('css',function () {
    return gulp.src('src/css/*.css')
        .pipe(concat('build.css'))// 合并css
        .pipe(cleanCss({compatibility:'ie8'}))// 压缩,兼容到ie8
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload())
        .pipe(connect.reload())
})
// 转化html
gulp.task('html',function () {
    return gulp.src('index.html')
        .pipe(htmlmin({collapseWhitespace:true}))
        .pipe(gulp.dest('dist'))
        .pipe(livereload())
        .pipe(connect.reload())
})

// gulp.series按照顺序执行,gulp.parallel：可以并行计算
gulp.task('default',gulp.parallel('js','less','css','html'))

// 注册监视任务
gulp.task('watch',function () {
    // 开启监听
    livereload.listen()
    gulp.watch('src/js/*.js',gulp.series('js'))// 'src/js/*.js'发生变化,就执行js任务
    gulp.watch('src/less/*.less',gulp.series('less','css'))
    gulp.watch('src/css/*.css',gulp.series('css'))

})
// 注册热加载任务
gulp.task('server',function () {
    connect.server({
        root:'dist/',
        livereload:true,
        port:5000
    })
    gulp.watch('src/js/*.js',gulp.series('js'))// 'src/js/*.js'发生变化,就执行js任务
    gulp.watch('src/less/*.less',gulp.series('less','css'))
    gulp.watch('src/css/*.css',gulp.series('css'))
    open('http://localhost:5000/')
})

