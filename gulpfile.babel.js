import concat        from 'gulp-concat';
import gulp          from 'gulp';
import ngAnnotate    from 'gulp-ng-annotate';
import plumber       from 'gulp-plumber';
import uglify        from 'gulp-uglify';
import html2js        from 'gulp-ng-html2js';
import babel from 'gulp-babel';


const template = () => {
	debugger;
 gulp
  	.src('./src/templates/*.html')
  	.pipe(html2js({moduleName: 'ng-angular-fornly-templates-ionic-card'}))
  	.pipe(concat('templates.js'))
  	.pipe(gulp.dest('./src'))
};


const build = () => {
 	gulp
    .src('./src/*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./dist'));
};

gulp.task('template', template);

gulp.task('build', ['template'],  build);

gulp.task('watch', () => {
  gulp.run(['build']);
  gulp.watch('./src/lock-screen/lock-screen.js', ['build']);
});

gulp.task('default', ['build']);
