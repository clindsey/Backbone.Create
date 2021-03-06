exports.config =
  # See docs at http://brunch.readthedocs.org/en/latest/config.html.

  # Application build path.  Default is public
  paths:
    public: '../public'

  files:
    javascripts:
      defaultExtension: 'js'
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/
        'test/javascripts/test.js': /^test(\/|\\)(?!vendor)/
        'test/javascripts/test-vendor.js': /^test(\/|\\)(?=vendor)/
      order:
        before: [
          'vendor/scripts/console-helper.js',
          'vendor/scripts/jquery-1.8.3.min.js',
          'vendor/scripts/lodash.js',
          'vendor/scripts/backbone-0.9.9.js',
          'vendor/scripts/backbone-mediator.js',
          'vendor/scripts/backbone.super.js',
          'vendor/scripts/greensock/TweenMax.min.js',
          'vendor/scripts/greensock/easing/EasePack.min.js'
        ]

    stylesheets:
      defaultExtension: 'scss'
      joinTo:
        'stylesheets/app.css': /^(app|vendor)/
        'test/stylesheets/test.css': /^test/
      order:
        before: ['vendor/styles/normalize.css']
        after: ['vendor/styles/helpers.css']

    templates:
      defaultExtension: 'hbs'
      joinTo: 'javascripts/templates.js'

  minify: no
