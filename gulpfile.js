const { src, dest, parallel, series } = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const plumber = require('gulp-plumber');
const sass = require('gulp-ruby-sass');
const compass = require('gulp-compass');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const sftp = require('gulp-sftp-up4');
const ftp = require('vinyl-ftp');



// 本地环境 START---------------------------------------------------
// 多端同步浏览 (windowns环境下 browser 设置为 chrome)
function server(cb) {
	browserSync.init({
        files:[
            './src/**/*.shtml',
            './src/**/*.html',
            './src/scripts/*.js',
            './src/**/*.css'
        ],
        logLevel: "debug",
        logPrefix: "insgeek",
        proxy: "http://localhost:5000/tmp/src",
        ghostMode: {
            clicks: true,
            froms: true,
            scroll: true
        },
        open: true,
        browser: "chrome"
    });
	cb();
}


// SCSS文件监控
function watchScss(cb) {
	const watcher = watch('./src/**/*.scss', parallel('scss'));
    watcher.on('all', function(event, path, stats){
        console.log('File ' + path + ' was ' + event);
    });
    cb();
}

// SCSS编译
function scss(cb) {
    return src('./src/sass/*.scss')
        .pipe(plumber())
        .pipe(compass({
            config_file: './config.rb',
            sourcemap: true,
            sass: './src/sass',
            css: './src/styles'
        }));
    cb();
}

// css上传 (remotePath 远程css文件路径)
function uploadCss(cb) {
    src('./src/styles/*.*')
        .pipe(sftp({
            host: '211.159.186.151',
            auth: 'keyMain',
            remotePath: '/www/projects/abel.aisuy.com/sakura/src/styles' 
        }));
    cb();
}

// 创建js库
function copyJSLibs(cb) {
    src([
        './bower_components/jquery/dist/jquery.min.js', 
        './bower_components/slick-carousel/s**/*.*', 
        './bower_components/wow/dist/wow.min.js',
        './bower_components/validate/validate.min.js',
        './bower_components/pixi.js/dist/pixi.min.js',
        './bower_components/jieyou_lazyload/lazyload.min.js',
        './bower_components/prefixfree/prefixfree.min.js'
        ])
        .pipe(dest('./src/assets/libs'));

    src('./bower_components/layer/dist/**/*.*')
        .pipe(dest('./src/assets/libs/layer'));

    src('./bower_components/fancybox/dist/**/*.*')
        .pipe(dest('./src/assets/libs/fancybox'));

    cb();
}


exports.server = server;
exports.scss = scss;
// exports.scss = series(scss, parallel(uploadCss));
exports.watchScss = watchScss;
exports.copyJSLibs = copyJSLibs;
exports.default = parallel(server, watchScss);
// 本地环境 END---------------------------------------------------


// 测试环境 START-------------------------------------------------

function scssEN(cb) {
    return src('./http/themes/en/default/sass/*.scss')
        .pipe(plumber())
        .pipe(compass({
            config_file: './config.rb',
            sourcemap: true,
            sass: './http/themes/en/default/sass',
            css: './http/themes/en/default/styles'
        }));
    cb();
}
function watchScssEN(cb) {
    const watcher = watch('./http/themes/en/default/sass/**/*.scss', parallel('scssEN'));
    watcher.on('all', function(event, path, stats){
        console.log('File ' + path + ' was ' + event);
    });
    cb();
}
function uploadCssEN(cb) {
    src('./http/themes/en/default/styles/*.*')
        .pipe(sftp({
            host: '8.208.88.208',
            auth: 'keyMain',
            remotePath: '/www/wwwroot/en.shenshang.org/http/themes/en/default/styles' 
        }));
    cb();
}
exports.scssEN = series(scssEN, parallel(uploadCssEN));
exports.watchScssEN = watchScssEN;
exports.uploadCssEN = uploadCssEN;
// exports.default = watchScssEN;

function scssCN(cb) {
    return src('./online/themes/cn/default/sass/*.scss')
        .pipe(plumber())
        .pipe(compass({
            config_file: './config.rb',
            sourcemap: true,
            sass: './online/themes/cn/default/sass',
            css: './online/themes/cn/default/styles'
        }));
    cb();
}
function watchScssCN(cb) {
    const watcher = watch('./online/themes/cn/default/sass/**/*.scss', parallel('scssCN'));
    watcher.on('all', function(event, path, stats){
        console.log('File ' + path + ' was ' + event);
    });
    cb();
}
function uploadCssCN(cb) {
    src('./online/themes/cn/default/styles/*.*')
        .pipe(sftp({
            host: '211.159.186.151',
            auth: 'keyMain',
            remotePath: '/www/projects/2020/DesignCity.aisuy.com/http/themes/cn/default/styles' 
        }));
    cb();
}
exports.scssCN = series(scssCN, parallel(uploadCssCN));
exports.watchScssCN = watchScssCN;
exports.uploadCssCN = uploadCssCN;
// exports.default = watchScssCN;
// exports.default = parallel(watchScssEN, watchScssCN);

// 测试环境 END--------------------------------------------------------






// 服务器环境 START----------------------------------------------------

// FTP 
const conn = ftp.create({
    host:     '47.106.65.212',
    user:     'suma',
    password: 'suma987',
    parallel: 10,
    log: ''
});
function uploadCssCNFtp(cb) {
    src('./online/pc/default/styles/*.*')
        .pipe(conn.newer('./online/pc/default/styles/*.*'))
        .pipe(conn.dest('/themes/pc/default/styles'));
    cb();
}
// exports.scssCN = series(scssCN, parallel(uploadCssCNFtp));