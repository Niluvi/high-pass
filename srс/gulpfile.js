const { src, dest, series, watch } = require('gulp');
// npm i -D gulp-concat = //// -D = (--seve-dev)
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css')
const svgSprite = require('gulp-svg-sprite')
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel')
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const image = require('gulp-image') //Пришлось сделать откат на 6.2.1
const imageMin = require('gulp-imagemin'); //Пришлось сделать откат на 7.0.0
const browserSync = require('browser-sync').create()
// Tasks \\
// Clean
const cleanDev = () => {
    return del('dist')
};

const cleanProd = () => {
    return del('prod')
};
// Resources
const resourcesDev = () => {
    return src('src/js/resources/**.*')
    .pipe(dest('dist/resources'))
};

const resourcesProd = () => {
    return src('src/js/resources/**.*')
    .pipe(dest('prod/resources'))
};
// Sass
const scssDev = () => {
    return src('src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(concat('main.css'))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const scssProd = () => {
    return src('src/scss/style.scss')
    .pipe(concat('main.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer ({
        cascade: false
    }))
    .pipe(cleanCSS ({
        level: 2
    }))
    .pipe(dest('prod'))
    .pipe(browserSync.stream())
}
// Styles!
const stylesDev = () => {
    return src('src/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
};

const stylesProd = () => {
    return src('src/css/**/*.css')
    .pipe(autoprefixer ({
        cascade: false
    }))
    .pipe(cleanCSS ({
        level: 2
    }))
    .pipe(dest('prod'))
    .pipe(browserSync.stream())
};
// HTML
const htmlMinifyDev = () => {
    return src('src/**/*.html')
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
};

const htmlMinifyProd = () => {
    return src('src/**/*.html')
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(dest('prod'))
    .pipe(browserSync.stream())
};
// Font 
const fontDev = () => {
        return src([
            'src/font/**/*.woff2',
            'src/font/**/*.woff'
        ])
        .pipe(dest('dist/font'))
        .pipe(browserSync.stream())
    };

    const fontProd = () => {
        return src([
            'src/font/**/*.woff2',
            'src/font/**/*.woff'
        ])
        .pipe(dest('prod/font'))
        .pipe(browserSync.stream())
    };
// Sprite
const svgSpritesDev = () => {
    return src('src/images/sprite/**/*.svg')
    .pipe(svgSprite({
        mode: {
           stack:{
            sprite:  '../sprite.svg' 
           }
        }
    }))
    .pipe(dest('dist/images/sprite'))
    .pipe(browserSync.stream())
};

const svgSpritesProd = () => {
    return src('src/images/sprite/**/*.svg')
    .pipe(svgSprite({
        mode: {
           stack:{
            sprite:  '../sprite.svg' 
           }
        }
    }))
    .pipe(image())
    .pipe(imageMin())
    .pipe(dest('prod/images/sprite'))
    .pipe(browserSync.stream())
};
// Script
const scriptsDev = () => {
    return src([
                'src/js/myJs.js'
            ])
            .pipe(sourcemaps.init())
            .pipe(concat('app.js'))
            .pipe(sourcemaps.write())
            .pipe(dest('dist'))
            .pipe(browserSync.stream())
};

const scriptsProd = () => {
    return src([
                'src/js/myJs.js'
            ])
            .pipe(concat('app.js'))
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(uglify({
                toplevel: true
            }).on('error', notify.onError()))
            .pipe(dest('prod'))
            .pipe(browserSync.stream())
};
// Watch
const watchFilesDev = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
};

const watchFilesProd = () => {
    browserSync.init({
        server: {
            baseDir: 'prod'
        }
    })
};
// Image
const imagesDev = () => {
    return src([
        'src/images/**/*.jpg',
        'src/images/**/*.png',
        'src/images/svg/**/*.svg',
        'src/images/**/*.jpeg',
    ])
      .pipe(dest('dist/images'));
};
// imageMin
const imagesProd = () => {
    return  src([
        'src/images/**/*.jpg',
        'src/images/**/*.png',
        'src/images/*.svg',
        'src/images/**/*.jpeg',
    ])
    .pipe(image())
    .pipe(imageMin())
      .pipe(dest('prod/images'));
};
// Watch Files \\
// dev
watch('src/scss/**/*.scss', scssDev)
watch('src/styles/**/*.css', stylesDev)
watch('src/font/**/*.*', fontDev)
watch('src/**/*.html', htmlMinifyDev)
watch('src/images/sprite/*.svg', svgSpritesDev)
watch(['src/images/**/*.png', 'src/images/**/*.jpg', 'src/images/**/*.jpeg', 'src/images/svg/**/*.svg'], imagesDev) 
watch('src/js/**/*.js', scriptsDev) 
watch('src/js/resources/**.*', resourcesDev)

// prod
watch('src/scss/**/*.scss', scssProd)
watch('src/styles/**/*.css', stylesProd)
watch('src/font/**/*.*', fontProd)
watch('src/**/*.html', htmlMinifyProd)
watch('src/images/sprite/*.svg', svgSpritesProd)
watch(['src/images/**/*.png', 'src/images/**/*.jpg', 'src/images/**/*.jpeg', 'src/images/svg/**/*.svg'], imagesProd) 
watch('src/js/**/*.js', scriptsProd) 
watch('src/js/resources/**.*', resourcesProd)

// Exports \\
exports.pro = series(cleanProd, htmlMinifyProd, scssProd, stylesProd, fontProd, imagesProd, scriptsProd, resourcesProd, svgSpritesProd, watchFilesProd)

exports.default = series(cleanDev, htmlMinifyDev, scssDev, stylesDev, fontDev, imagesDev, scriptsDev, resourcesDev, svgSpritesDev, watchFilesDev)