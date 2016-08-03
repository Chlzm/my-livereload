var gulp = require('gulp');
var livereload = require('gulp-livereload');
var htmlmin = require('gulp-htmlmin'); //html压缩
// 引入组件
var minifycss = require('gulp-minify-css'),//css压缩
    concat = require('gulp-concat'),//文件合并
    rename = require('gulp-rename');//文件更名
// 合并、压缩、重命名css
gulp.task('css', function() {
    return gulp.src('src/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('dest'))
        .pipe(livereload())
        //.pipe(notify({ message: 'css task ok' }));
});
gulp.task('html', function() {
    return gulp.src('./*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dst'))
        .pipe(livereload())
});
gulp.task('watchcss',function(){
    var watcher = gulp.watch('src/*.css',['css']);
    watcher.on('change',function(event){
        console.log(event)
    });
})
gulp.task('watch', function () {    // 这里的watch，是自定义的，写成live或者别的也行
    var server = livereload();
    livereload.listen();
    // app/**/*.*的意思是 app文件夹下的 任何文件夹 的 任何文件
    gulp.watch('src/*.*', ['css'],function (file) {
        //server.changed(file.path);
    });
    gulp.watch('./*.html',['html'],function (file) {
        //server.changed(file.path);
    });
});
gulp.task('default',['watch']);
