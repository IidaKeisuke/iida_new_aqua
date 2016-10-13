// Karma configuration
// Generated on Tue Feb 16 2016 17:44:50 GMT+0900 (JST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha-debug', 'mocha', 'requirejs', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      { pattern: '**/*.json', included: false },
      { pattern: 'dummy.js', included: false},

      'karma/test-main.js',
      { pattern: 'src/**/*.js', included: false, watched: true},
      { pattern: 'res/**/*', included: false, watched: false},
      { pattern: 'frameworks/cocos2d-html5/**/*', included: false, watched: false},
      { pattern: 'test/**/*.js', included: false }
    ],


    // list of proxies
    proxies: {
      '/dummy.js': '/base/dummy.js',
      '/main.js': '/base/main.js',
      '/project.json': '/base/project.json',
      '/src/': '/base/src/',
      '/res/': '/base/res/',
      '/frameworks/cocos2d-html5/': '/base/frameworks/cocos2d-html5/',
    },


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],


    mochaReporter: {
      colors: {
        success: 'blue',
        info: 'bgGreen',
        warning: 'cyan',
        error: 'bgRed'
      }
    },


    jenkinsReporter: {
      outputFile: 'report/test-results.xml'
    },


    coverageReporter: {
      dir: 'report/',
      subdir: function(browser) {
        return browser.toLowerCase().split(/[ /-]/)[0];
      },
      
      reporters: [
        { type : 'html' },
        { type : 'cobertura', file: 'clover.xml' }
      ]
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // Chrome/Firefox/Opera/Safari
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}