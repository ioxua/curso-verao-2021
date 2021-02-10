const gulp = require('gulp')
const sass = require('gulp-sass')
const pug = require('gulp-pug')
const clean = require('gulp-clean')

sass.compiler = require('node-sass')
const distDir = 'dist/'

const buildClean = () => {
  return gulp.src(distDir, { read: false, allowEmpty: true })
    .pipe(clean())
}

const buildSASS = () => {
  return gulp.src('sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest(distDir + '/styles'))
}

const buildPug = () => {
  return gulp.src([
    'pug/**/*.pug',
    '!pug/**/_*.pug',
  ])
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(distDir))
}

gulp.task('build:clean', buildClean)
gulp.task('build:sass', buildSASS)
gulp.task('build:pug', buildPug)

gulp.task('build', () => {
  return gulp.series(
    buildClean,
    gulp.parallel(
      buildSASS,
      buildPug,
    ),
  )
})
