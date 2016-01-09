var gulp = require("gulp");
var gutil = require('gulp-util');
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var static = require('node-static');

var paths = {
  devRoot: 'src',
  js: 'src/index.js',
  static: ['src/index.html', 'src/main.css']
};

gulp.task('default', ['js', 'copy', 'watch', 'serve']);

function bundle(bundler) {
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app.js'))
    // optional, remove if you dont want sourcemaps
      // .pipe(buffer())
      // .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
      // .pipe(sourcemaps.write()) // writes .map file
    //
    .pipe(gulp.dest('./src'));
}

function bundleConfig(bundler) {
  bundler.transform(babelify.configure({
    "presets": [
      "es2015"
    ],
    "plugins": [
      "transform-function-bind",
      "transform-object-rest-spread"
    ]
  }));
}

gulp.task('js', function () {
  var bundler = browserify(paths.js, {detectGlobals: true});
  bundleConfig(bundler);
  return bundle(bundler);
});

gulp.task('watchjs', function () {
  var args = watchify.args;
  args.detectGlobals = true;
  var bundler = watchify(browserify(paths.js, args));
  // add any other browserify options or transforms here
  bundleConfig(bundler);

  bundler.on('update', bundle.bind(null, bundler)); // on any dep update, runs the bundler
  bundler.on('log', gutil.log); // output build logs to terminal
  return bundle(bundler);
});

gulp.task('copy', function () {
  return gulp.src(paths.static)
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.static, ['copy']);
});

gulp.task('serve', function () {
  var fileServer = new static.Server(paths.devRoot, { cache: 1 });
  require('http').createServer(function (request, response) {
    request.addListener('end', function () {
      fileServer.serve(request, response);
    }).resume();
  }).listen(6060);
});