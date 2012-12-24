(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle) {
    for (var key in bundle) {
      if (has(bundle, key)) {
        modules[key] = bundle[key];
      }
    }
  }

  globals.require = require;
  globals.require.define = define;
  globals.require.brunch = true;
})();

window.require.define({"Application": function(exports, require, module) {
  /**
   * Application Bootstrapper
   * 
   * @langversion JavaScript
   * 
   * @author Christopher Pappas
   * @since 12.23.12
   */

  var GameConfig = require( 'config/GameConfig' );

  /**
   * CreateJS Namespace alias
   * @type {CreateJS}
   */
  c = createjs;

  /**
   * Primary Game object
   * @type {Object}
   */
  Application = {

    /**
     * The EaselJS stage
     * @type {c.Stage}
     */
    stage: null,

    /**
     * Primary canvas ref
     * @type {DOMElement}
     */
    canvas: null,

    /**
     * Canvas top level parent container
     * @type {c.Container}
     */
    container: null,

    /**
     * The onEnterFrame ticker
     * @type {Object}
     */
    ticker: {},

    /**
     * PreloadJS instance
     * @type {PreloadJS}
     */
    _preloadJS: null,


    //--------------------------------------
    //+ INHERITED / OVERRIDES
    //--------------------------------------

    /**
     * Initialize the app
     */
    initialize: function() {
      _.bindAll( this )

      // Import views
      var GameView = require('views/GameView');

      // Import router
      var ApplicationRouter = require('routers/ApplicationRouter');

      // Setup the canvas
      this.canvas = document.getElementById( 'canvas' );

      // Setup EaselJS
      this.stage = new c.Stage( this.canvas );
      this.stage.mouseEventsEnabled = true;
      this.stage.snapToPixelEnabled = true;
      this.stage.enableMouseOver();
      c.Touch.enable( this.stage );

      // Setup ticker
      c.Ticker.setFPS( GameConfig.STAGE_PROPERTIES.fps );
      this.ticker.tick = this.__onTickerUpdate;

      // Canvas container
      this.container = new c.Container();
      this.container.width = GameConfig.STAGE_PROPERTIES.width
      this.container.x = GameConfig.STAGE_PROPERTIES.width * .5 - this.container.width * .5;

      // Initialize views
      this.gameView = new GameView();
      this.applicationRouter = new ApplicationRouter();

      // Initialize the preloader and load assets
      this._preloadJS = new c.PreloadJS();
      this._preloadJS.onComplete = this.__onLoadComplete;
      this._preloadJS.loadManifest( GameConfig.MANIFEST );
    },


    //--------------------------------------
    //+ EVENT HANDLERS
    //--------------------------------------

    /**
     * Handler for preload complete events
     * 
     */
    __onLoadComplete: function() {
      this.start();
    },

    /**
     * Handler for ticker update events
     *
     */
    __onTickerUpdate: function() {
      Application.stage.update();
    },


    //--------------------------------------
    //+ PUBLIC METHODS / GETTERS / SETTERS
    //--------------------------------------

    /**
     * Starts the game
     *
     */
    start: function() {
      c.Ticker.addListener( this.ticker, false );
    },

    /**
     * Pauses the game
     *
     */
    pause: function() {
      c.Ticker.removeListener( this.ticker );
    },

    /**
     * Resumes the game
     *
     */
    resume: function() {
      c.Ticker.addListener( this.ticker );
    },

    /**
     * Stops the game
     *
     */
    stop: function() {

    }
  }

  module.exports = Application;
  
}});

window.require.define({"config/AppConfig": function(exports, require, module) {
  /**
   * Application Configuration
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  var AppConfig = {
  		
  	/**
  	 * The application base-url
  	 * @type {String}
  	 */
  	BASE_URL: "",

  	/**
  	 * Image asset base-url
  	 * @type {String}
  	 */
  	IMAGE_URL: 'images/', 

  	/**
  	 * Audio asset base-url
  	 * @type {String}
  	 */
  	AUDIO_URL: 'audio/'

  };

  module.exports = AppConfig;
}});

window.require.define({"config/GameConfig": function(exports, require, module) {
  /**
   * Game Configuration
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  var AppConfig = require('config/AppConfig');

  var GameConfig = (function() {

  	/**
  	 * Basic stage properties
  	 * @type {Object}
  	 */
  	var _stageProperties = {
  		width: 1000,
  		height: 500,
  		background: '#000',
  		fps: 60
  	};

  	/**
  	 * Application manifest for external assets and asset descriptors
  	 * @type {Array}
  	 */
  	var _manifest = [
  		{}
  	];


  	//--------------------------------------
  	//+ PUBLIC INTERFACE
  	//--------------------------------------
  	
  	return {

  		/**
  		 * @type {Object}
  		 */
  		STAGE_PROPERTIES: _stageProperties,

  		/**
  		 * @type {Array}
  		 */
  		MANIFEST: _manifest

  	}

  }).call()

  module.exports = GameConfig;
}});

window.require.define({"core/Collection": function(exports, require, module) {
  /**
   * Base Class for all Backbone Collections
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  var Collection = Backbone.Collection.extend({

  	//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------

  	//--------------------------------------
  	//+ INHERITED / OVERRIDES
  	//--------------------------------------
  	
  	//--------------------------------------
    	//+ PUBLIC METHODS / GETTERS / SETTERS
    	//--------------------------------------

    	//--------------------------------------
    	//+ EVENT HANDLERS
    	//--------------------------------------

    	//--------------------------------------
    	//+ PRIVATE AND PROTECTED METHODS
    	//--------------------------------------

  });

  module.exports = Collection;
}});

window.require.define({"core/Model": function(exports, require, module) {
  /**
   * Base Class for all Backbone Models
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  var Model = Backbone.Model.extend({

  	//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------

  	//--------------------------------------
  	//+ INHERITED / OVERRIDES
  	//--------------------------------------
  	
  	//--------------------------------------
    	//+ PUBLIC METHODS / GETTERS / SETTERS
    	//--------------------------------------

    	//--------------------------------------
    	//+ EVENT HANDLERS
    	//--------------------------------------

    	//--------------------------------------
    	//+ PRIVATE AND PROTECTED METHODS
    	//--------------------------------------
    
  });

  module.exports = Model;
  
}});

window.require.define({"core/Router": function(exports, require, module) {
  /**
   * Backbone Primary Router
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  var Router = Backbone.Router.extend({

  	//--------------------------------------
      //+ INHERITED / OVERRIDES
      //--------------------------------------
      
  	routes: {},

      /**
       * Initializes the Base router
       * @param  {Object} options 
       * 
       */
      initialize: function( options ) {

      }
  });

  module.exports = Router;
}});

window.require.define({"core/View": function(exports, require, module) {
  /**
   * View Base Class
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  var Model = require('core/Model');

  var View = Backbone.View.extend({

    /**
     * Base c.Container reference
     * @type {CreateJS.Container}
     */
    sprite: null,

    /**
     * If a view is a MovieClip, all animation should be referencable by this
     * @type {CreateJS.SpriteSheet}
     */
    spritesheet: null,

    /**
     * @type {Backbone.Model}
     */
    model: null,

    /**
     * @type {Backbone.Collection}
     */
    collection: null,

    /**
     * Flag for render detection
     * @type {Boolean}
     */
    rendered: false,


    //--------------------------------------
    //+ INHERITED / OVERRIDES
    //--------------------------------------
    
    /*
     * @private
     */
    initialize: function( options ) {
      _.bindAll( this );

      this.options = options || {};
      this.sprite = new c.Container();
    },

    /*
     * @private
     */
    render: function( data ) {
      data = data || this.model || {};
      
      if( data instanceof Model ) 
        data = this.model.attributes;
      
      this.delegateEvents();
      this.addEventListeners();
      this.rendered = true;
      
      return this;
    },

    /**
     * Disposes of the view
     * @param  {Object} options
     *  - animated : {Boolean}
     *  - currView : {Object}
     */
    dispose: function( options ) {
      options = options || {};

      if( options.currView === this || !this.rendered ) 
        return;
      
      this.rendered = false;
      this.undelegateEvents();
      this.removeEventListeners();
      
      if( this.model && this.model.off ) 
        this.model.off( null, null, this );

      if( this.collection && this.collection.off ) 
        this.collection.off( null, null, this );

      var self = this;

      if( !_.isNull( this.sprite ))
        if( !_.isUndefined( options.animated ) && options.animated )
          this.animateOut(function() {
            self.sprite.removeAllChildren();
          });
        else 
          this.sprite.removeAllChildren();
    },


    //--------------------------------------
    //+ PUBLIC METHODS / GETTERS / SETTERS
    //--------------------------------------

    /**
     * Add event listeners
     * @type {noop}
     */
    addEventListeners: function() {},

    /**
     * Remove event listeners
     * @type {noop}
     */
    removeEventListeners: function() {},

    /**
     * Animate in
     * @type {noop}
     */
    animateIn: function( callback ) {
      if( !_.isUndefined( callback ))
        callback();
    },

    /**
     * Animate out
     * @type {noop}
     */
    animateOut: function( callback ) {
      if( !_.isUndefined( callback ))
        callback();
    }


    //--------------------------------------
    //+ EVENT HANDLERS
    //--------------------------------------

    //--------------------------------------
    //+ PRIVATE AND PROTECTED METHODS
    //--------------------------------------

  });

  module.exports = View;
  
}});

window.require.define({"events/ApplicationEvents": function(exports, require, module) {
  /**
   * Application Events
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  var ApplicationEvents = {
  	
  	/**
  	 * Dispatched when view animation completes
  	 * @type {String}
  	 */
  	ANIMATION_IN_COMPLETE: 'onAnimationInComplete',

  	/**
  	 * Dispatched when view animation out completes
  	 * @type {String}
  	 */
  	ANIMATION_OUT_COMPLETE: 'onAnimationOutComplete',

  	/**
  	 * Dispatched when application is initialized
  	 * @type {String}
  	 */
  	APPLICATION_INITIALIZED: 'onApplicationInitialized',

  	/**
  	 * PubSub.  Dispatched when application requests a view cleanup
  	 * @type {String}
  	 */
  	DISPOSE_VIEWS: 'views:dispose'
  }

  module.exports = ApplicationConfig;
}});

window.require.define({"initialize": function(exports, require, module) {
  
  /**
   * Application Initializer
   * 
   * @langversion JavaScript
   * 
   * @author Christopher Pappas
   * @since 12.23.12
   */

  var Application = require('Application');

  $(function() {

    // Initialize Application
    Application.initialize();

    // Start Backbone router
    Backbone.history.start();
  });
  
}});

window.require.define({"routers/ApplicationRouter": function(exports, require, module) {
  /**
   * Backbone Primary Router
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  var Router = require('core/Router');
  var Application = require('Application');

  var ApplicationRouter = Router.extend({

    //--------------------------------------
  	//+ Routes
  	//--------------------------------------
  	
    /**
     * A hash of application routes
     * @type {Object}
     */
  	routes: {
      '': 'gameViewRoute'
  	},
    

  	//--------------------------------------
  	//+ Route Handlers
  	//--------------------------------------

    /**
     * Handler for game route
     */
  	gameViewRoute: function() {
      Application.gameView.render();
  	},


    //--------------------------------------
    //+ PRIVATE AND PROTECTED METHODS
    //--------------------------------------

    /**
     * Generic method which publishes cleanup event to all registered views
     * @param {Object} options  an options has consisting of
     *   - animated : {Boolean}  should we animate out the view?
     */
    __cleanupViews: function( options ) {
      Backbone.Mediator.pub( ApplicationEvent.DISPOSE_VIEWS, options );
    }


  });

  module.exports = ApplicationRouter;
}});

window.require.define({"utils/CreateUtils": function(exports, require, module) {
  /**
   * CreateJS Utilities and helper method-wrappers
   *
   * @author Christopher Pappas
   * @since 12.23.12
   */

  var GameConfig = require('config/GameConfig');

  var Utils = (function() {

  	/**
  	 * Set the default search key for asset queries
  	 * @type {String}
  	 */
  	var DEFAULT_KEY = 'name';


  	//--------------------------------------
  	//+ PUBLIC INTERFACE
  	//--------------------------------------

  	return {

  		/**
  		 * Animates a spritesheet once and then returns to old position
  		 * @param  {c.BitmapAnimation} spritesheet
  		 * @param  {String} frameLabel the frame label
  		 */
  		animateOnce: function( spritesheet, frameLabel ) {
  			spritesheet.onAnimationEnd = function() { this.gotoAndStop( frameLabel ) };
  			spritesheet.gotoAndPlay( frameLabel );
  		},

  		/**
  		 * Moves all frame reg-points to the center.
  		 * USE WITH CAUTION:  Adjusting the internals invalidates pixel-snapping
  		 * @param  {BitmapAnimation} bitmapAnimation
  		 */
  		centerSpriteSheetRegPoint: function( bitmapAnimation ) {
  			_.each( bitmapAnimation.spriteSheet._frames, function( frame ) {
  				frame.regX = frame.rect.width * .5
  				frame.regY = frame.rect.height * .5
  			});
  		},

  		/**
  		 * Creates a bitmap
  		 * @param  {*} value the value-pair of the asset
  		 * @param  {String} key to search under
  		 * @return {c.Bitmap}  The bitmap
  		 */
  		createBitmap: function( value, lookupKey ) {
  			if( _.isUndefined( lookupKey )) 
  				lookupKey = DEFAULT_KEY;

  			return new c.Bitmap( CreateUtils.returnAssetImage( value, lookupKey ));
  		},

  		/**
  		 * Creates a spritesheet and returns c.BitmapAnimation object
  		 * @param  {*} value the value-pair of the asset
  		 * @param  {String} key to search under
  		 * @return {c.BitmapAnimation}  The animated spritesheet
  		 */
  		createSpriteSheet: function( value, lookupKey ) {
  			if( _.isUndefined( lookupKey )) 
  				lookupKey = DEFAULT_KEY;

  			return new c.BitmapAnimation( new c.SpriteSheet( CreateUtils.returnAssetSpriteSheet( value, lookupKey )));
  		},

  		/**
  		 * Creates a hit area for DisplayObjects
  		 * @param  {DisplayObject} parent
  		 * @param  {Number} width
  		 * @param  {Number} height
  		 */
  		createHitArea: function( parent, width, height ) {
  			width = width || 0;
  			height = height || 0;

  			parent.hitArea = new c.Shape( new c.Graphics().beginFill("#f00").drawRect( 0, 0, width, height ));
  		},

  		/**
  		 * Util for dragging display objects to aproximate positioning
  		 * @param  {Array} objArr An array of display objects to drag
  		 *
  		 */
  		dragObject: function( objArr ) {
  			_.each( objArr, function( displayObject ) {
  				
  				if( displayObject instanceof c.BitmapAnimation ) {
  					name = displayObject.spriteSheet._images[0].attributes[0].nodeValue;
  				}
  				else if( displayObject instanceof c.Bitmap) {
  					name = displayObject.image.attributes[0].nodeValue;
  				}
  				else {
  					name = '';
  				}

  				displayObject.onPress = function( event ) {
  					var offset = { x:displayObject.x - event.stageX, y: displayObject.y - event.stageY };

  					evt.onMouseMove = function(ev) {
  						var x = ev.stageX + offset.x;
  						var y = ev.stageY + offset.y;

  						displayObject.x = x;
  						displayObject.y = y;

  						console.log( x + ', ' + y, ' > ' + name );
  					}
  				}
  			});
  		},

  		/**
  		 * Returns a game asset
  		 * @param  {String} name the asset name
  		 * @return {Object}	  the asset
  		 */
  		returnAsset: function( value, lookupKey ) {
  			if( _.isUndefined( lookupKey )) 
  				lookupKey = DEFAULT_KEY;

  			var len = GameConfig.MANIFEST.length;
  			for( var i = 0; i < len; ++i ) {
  				var asset = GameConfig.MANIFEST[i];
  				if( asset.hasOwnProperty( lookupKey )) {
  					if( asset[lookupKey] === value ) {
  						return asset;
  					}
  				}
  			};
  			
  			return false; 
  		},

  		/**
  		 * Returns an image url
  		 * // TODO: Merge image and spritesheet into one returnAsset method
  		 * @param  {String} value the asset value-pair
  		 * @return {String}	  the asset url
  		 */
  		returnAssetImage: function( value, lookupKey ) {
  			var len = GameConfig.MANIFEST.length;
  			for( var i = 0; i < len; ++i ) {
  				var asset = GameConfig.MANIFEST[i];
  				if( asset.hasOwnProperty( lookupKey )) {
  					if( asset[lookupKey] === value ) {
  						return asset.src;
  					}
  				}
  			};

  			return false; 
  		},

  		/**
  		 * Returns a spritesheet object
  		 * // TODO: Merge image and spritesheet into one returnAsset method
  		 * @param  {String} value the asset value
  		 * @return {Object}	  the asset spritesheet
  		 */
  		returnAssetSpriteSheet: function( value, lookupKey ) {
  			var len = GameConfig.MANIFEST.length;
  			for( var i = 0; i < len; ++i ) {
  				var asset = GameConfig.MANIFEST[i];
  				if( asset.hasOwnProperty( lookupKey )) {
  					if( asset[lookupKey] === value ) {
  						return asset.spritesheet;
  					}
  				}
  			};

  			return false; 
  		}
  	}

  }).call();

  module.exports = CreateUtils;
}});

window.require.define({"utils/Utils": function(exports, require, module) {
  /**
   * Miscellenious utilities
   *
   * @author Christopher Pappas
   * @since 11.27.12
   */

  var AppConfig = require('config/AppConfig');
  var GameConfig = require('config/GameConfig');

  var Utils = {

  	/**
  	 * Returns a random nunber within two ranges
  	 * @param {Number} min
  	 * @param {Number} max
  	 */
  	randRange: function( min, max ) {
  		return Math.floor(Math.random() * (max - min + 1)) + min;
  	},

  	/**
  	 * Returns a random hex color
  	 *
  	 */
  	returnRandomHexColor: function() {
  		var letters = '0123456789ABCDEF'.split('');
  		var color = '#';
  		for ( var i = 0; i < 6; i++ ) {
  			color += letters[ Math.round( Math.random() * 15 ) ];
  		}

  		return color;
  	},

  	/**
  	 * Rotates a 2-Dimensional array to the right
  	 * @param  {Array} array
  	 */
  	rotateArrayRight: function( array ) {
  		var transformedArray = new Array();
  		var aLen = array[0].length;

  		for( var i = 0; i < aLen; i++ ) {
  			transformedArray[i] = new Array();

  			var transformedArrayColumn = -1;
  			var bLen = array.length - 1;
  			for ( var j = bLen; j > -1; j-- ) {
  				transformedArrayColumn++;
  				transformedArray[i][transformedArrayColumn] = array[j][i]
  			}
  		}

  		return transformedArray;
  	},

  	/**
  	 * Rotates a 2-Dimensional array to the left
  	 * @param  {Array} array
  	 */
  	rotateArrayLeft: function( array )  {
  		var transformedArray = new Array();
  		var aLen = array[0].length;
  		var row = -1;

  		for( var i = aLen - 1; i > -1; i-- ) {
  			row++;
  			transformedArray[row] = new Array();

  			var bLen = array.length;
  			for ( var j = 0; j < bLen; j++ ) {
  				transformedArray[row][j] = array[j][i];
  			}
  		}

  		return transformedArray;
  	}
  }

  module.exports = Utils;
}});

window.require.define({"views/GameView": function(exports, require, module) {
  /**
   * View Description
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  var View  = require('core/View');

  var GameView = View.extend({

  	/*
   	 * The id of the view
   	 * @type {String}
  	 */
  	id: 'gameView',

  	/**
  	 * Backbone.Mediator subscriptions
  	 * @type {Object}
  	 */
  	subscriptions: {
  		'views:dispose': 'dispose'
  	},


  	//--------------------------------------
  	//+ INHERITED / OVERRIDES
  	//--------------------------------------

  	/*
  	 * Initializes the view
  	 */
  	initialize: function( options ) {
  		this._super( options );
  	},

  	/*
  	 * @private
  	 */
  	render: function( options ) {
  		this._super( options );
  		
  		return this;
  	},

  	/**
  	 * Disposes of the view
  	 * 
  	 */
  	dispose: function( options ) {
  		this._super( options );
  	},

  	//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------

  	//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------

  	//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------

  });

  module.exports = GameView;

  
}});

