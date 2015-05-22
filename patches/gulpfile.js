(function () {
   'use strict';

   var gulp = require('gulp'),
      stylus = require('gulp-stylus'),
      csscomb = require('gulp-csscomb'),
      autoprefixer = require('gulp-autoprefixer'),
      dirCSS = 'css/',
      dirStyl = 'styl/';


   gulp.task('natasha-dates', function () {
      return gulp.src(dirStyl + 'natasha-dates.styl')
         .pipe(stylus())
         .pipe(autoprefixer({
            browsers: ['> 3%']
         }))
         .pipe(csscomb())
         .pipe(gulp.dest(dirCSS));
   });

   // Example gulp.task('negotiator-js', ['negotiator-dashboard', 'negotiator-evolution', 'negotiator-evolution2']);

   // Rerun the task when a file changes
   gulp.task('watch', function () {
      gulp.watch(dirStyl + 'natasha-dates.styl', ['natasha-dates']);
   });

   gulp.task('default', [
      'watch',
      'natasha-dates'
   ]);
}());