/* eslint-disable import/no-extraneous-dependencies, no-multiple-empty-lines */

import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import eslint from 'gulp-eslint';
import webpack from 'webpack-stream';
import mocha from 'gulp-mocha';
import flow from 'gulp-flowtype';
import runSequence from 'run-sequence';
import webpackConfig from './webpack.config.babel';



// vars

const paths = {
  applicationFolder: './',
  allSrcJs: 'src/**/*.js?(x)',
  clientEntryPoint: 'src/app/agents/client/entry.jsx',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
  libDir: 'lib',
  distDir: 'dist',
  clientBundle: 'dist/client-bundle.js?(.map)',
  allLibTests: 'lib/test/**/*.js',
  zipDir: 'output',
  zipFile: 'app.zip',
  serverEntryPointScript: 'lib/app/agents/server/entry.js',
};



// building

gulp.task('lint', () =>
  gulp.src([
    paths.allSrcJs,
    paths.gulpFile,
    paths.webpackFile,
  ])
    .pipe(eslint('.eslintrc.json'))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(flow({ abort: true })),
);

gulp.task('clean', () =>
  del([paths.libDir, paths.clientBundle]),
);

gulp.task('build', (callback) => {
  runSequence('lint', 'clean', () => {
    gulp.src(paths.allSrcJs)
      .pipe(babel())
      .pipe(gulp.dest(paths.libDir))
      .on('end', callback);
  });
});

gulp.task('webpack', () =>
  gulp.src(paths.clientEntryPoint)
      .pipe(webpack(webpackConfig))
      .pipe(gulp.dest(paths.distDir)),
);

gulp.task('compile', (callback) => {
  runSequence('build', 'webpack', callback);
});



// runners

gulp.task('test', (callback) => {
  runSequence('build', () => {
    gulp.src(paths.allLibTests)
      .pipe(mocha())
      .on('end', callback);
  });
});

gulp.task('main', (callback) => {
  runSequence('compile', callback);
});

gulp.task('main-debug', (callback) => {
  runSequence('compile', callback);
});


// configuration

if (process.env.NODE_ENV === 'production') {
  gulp.task('default', ['main']);
} else {
  gulp.task('default', ['main-debug']);
}
