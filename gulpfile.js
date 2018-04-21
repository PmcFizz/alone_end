/**
 * Created by Administrator on 2016/12/9.
 */
var gulp = require('gulp');
var browserSync = require("browser-sync");
var watch = require("gulp-watch");
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var fs = require('fs');
var del = require('del');
var dirTree = [];
var handDIR = 'app';
var watchDir = 'app/models/*.js';
var _CONTROLLERS = 'app/controllers/';
var _PROXY = 'app/proxy/';
var _MODELS = 'app/models/';
/**
 * 获取某个目录树
 */
gulp.task('getFileTree', function () {
    console.log("开始获取目录树");
    getFileTree(handDIR);
    var writeObj = {};
    writeObj.data = dirTree;
    fs.writeFile('dir.json', JSON.stringify(writeObj), function (err) {
        if (err) {
            console.log("写入目录树错误。。。" + err.message);
        } else {
            console.log("写入目录树完成！");
        }
    });
});

/**
 * 监听一个目录文件新增
 */
gulp.task('watchDir', function () {
    gulp.watch(watchDir, function (event) {
        if (event.type == "added") {
            var path = event.path;
            // console.log("filename"+path.substring(path.lastIndexOf("\\")+1,path.indexOf(".")))
            var filename = getFileNameByPath(path);
            createControllerFile(filename); //创建controller文件
            createProxyFile(filename);  //创建proxy文件
            modifyModal(filename);      //修改modal文件
            handleViewFolder(filename); //处理view文件夹
            console.log("hava created controller and proxy file");
        }
        console.log("File" + event.path + 'was' + event.type + ', running tasks....');
    });
});

/**
 *文件修改同步浏览器
 */
gulp.task("reload", function () {
    browserSync.init({
        server: {baseDir: "./"}
    });
    gulp.watch("./views/**/*", browserSync.reload);
    gulp.watch("./public/**/*", browserSync.reload);
})

/**
 * gulp default task
 */
gulp.task("default", ['getFileTree', 'watchDir'], function () {
    console.log("开始gulp吧...");
});


/**
 * 获取路径下的所有文件和目录
 * @param path
 */
function getFileTree(path) {
    dirTree.push(path);
    var files = fs.readdirSync(path);
    var i = 0;
    while (i < files.length) {
        var two = fs.statSync(path + "/" + files[i]);
        if (two.isDirectory() && files[i] !== "node_modules") {
            getFileTree(path + "/" + files[i]);
        } else {
            dirTree.push(path + "/" + files[i]);
        }
        i++;
    }
};

/**
 * 根据文件路径获取文件名字
 * @param path
 */
function getFileNameByPath(path) {
    var prepath = 'app\\models\\';
    var filetype = 'js';
    var filename = '';
    var startIndex = path.indexOf(prepath) + prepath.length;
    var endIndex = path.length - filetype.length - 1;
    filename = path.substring(startIndex, endIndex);
    return filename;
};

/**
 * modify the create file content
 */
function modifyModal(filename) {
    // gulp.src('app/factory/modelsmaster.js')//es5模板文件
    gulp.src('app/factory/modelsmaster.js')//es6模板文件
        .pipe(rename({"basename": filename}))
        .pipe(replace('waitreplace', filename))
        .pipe(gulp.dest(_MODELS))
}

/**
 * 根据文件名创建Controller的文件
 * @param filename
 */
function createControllerFile(filename) {
    // gulp.src('app/factory/controllersmaster.js')//es5模板文件
    gulp.src('app/factory/controllers_es6.js')//es6模板文件
        .pipe(rename({"basename": filename}))
        .pipe(replace('waitreplace', filename))
        .pipe(replace('Waitreplace', upFirst(filename)))
        .pipe(gulp.dest(_CONTROLLERS));
};

/**
 * 根据文件名创建Proxy的对应文件
 */
function createProxyFile(filename) {
    // gulp.src('app/factory/proxymaster.js')//es5模板文件
    gulp.src('app/factory/proxy_es6.js')//es6模板文件
        .pipe(rename({"basename": filename}))
        .pipe(replace('waitreplace', filename))
        .pipe(replace('Waitreplace', upFirst(filename)))
        .pipe(gulp.dest(_PROXY));
};

/**
 *根据文件名创建对应的文件夹和文件
 */
function handleViewFolder(filename){
    gulp.src('view/factory')
        .pipe(gulp.dest("view/"+filename));
}

/**
 * 将字符串第一个字母大写
 */
function upFirst(str) {
    if (str) {
        var strArr = str.split("");
        var first = strArr[0].toUpperCase();
        strArr[0] = first;
        return strArr.join('');
    }
    return "";
};

/**
 * 删除临时文件
 */
gulp.task("deltemp", function () {
    var delfileName = 'book.js';
    del([
        _CONTROLLERS + '' + delfileName,
        _MODELS + '' + delfileName,
        _PROXY + '' + delfileName
    ])
})
