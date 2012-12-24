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
  //JavaScript////////////////////////////////////////////////////////////////////
  // 
  // Copyright 2012 
  // 
  ////////////////////////////////////////////////////////////////////////////////

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

      // Start the ticker
      this.start();
    },


    //--------------------------------------
    //+ EVENT HANDLERS
    //--------------------------------------

    /**
     * The game ticker
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

window.require.define({"config/ApplicationConfig": function(exports, require, module) {
  /**
   * Application Configuration
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  var ApplicationConfig = (function() {

  	/*
     	 * @private
  	 */
  	var _baseUrl = "/";

  	/*
     	 * Public interface
  	 */
  	return {
  		BASE_URL: _baseUrl
  	}

  }).call()

  module.exports = ApplicationConfig;
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
  	}

  	/*
  		 * Public interface
  	 */
  	return {
  		STAGE_PROPERTIES: _stageProperties
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
      
      return this;
    },

    /**
     * Disposes of the view
     * @return {View}
     */
    dispose: function( options ) {
      options = options || {};
      
      this.rendered = false;

      if( options.currView === this ) 
        return;

      this.undelegateEvents();
      this.removeEventListeners();
      
      if( this.model && this.model.off ) 
        this.model.off( null, null, this );

      if( this.collection && this.collection.off ) 
        this.collection.off( null, null, this );

      if( !_.isNull( this.sprite ))
        this.sprite.removeAllChildren();
    },

    /**
     * Add event listeners
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
    animateIn: function() {},

    /**
     * Animate out
     * @type {noop}
     */
    animateOut: function() {}


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
   * @author 
   * @since  
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

window.require.define({"utils/BackboneView": function(exports, require, module) {
  /**
   * View Description
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  var View     = require('core/View');
  var template = require('templates/HomeViewTemplate');

  BackboneView = View.extend({

  	//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------

    	/*
     	 * @private
  	 */
  	id: 'view',
  	/*
     	 * @private
     	*/
  	template: template,

  	//--------------------------------------
    	//+ INHERITED / OVERRIDES
    	//--------------------------------------

  	/*
  	 * @private
  	 */
  	initialize: function() {
  		this.render = _.bind( this.render, this );
  	},

  	/*
  	 * @private
  	 */
  	render: function() {
  		this.$el.html( this.template( this.getRenderData() ) );

  		return this;
  	},

  	/*
  	 * @private
  	 */
  	getRenderData: function() {
  		return {
  			content: "View Content"
  		}
  	}

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

  module.exports = BackboneView;
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

  	//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------

  	/*
   	 * The id of the view
   	 * @type {String}
  	 */
  	id: 'gameView',


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
  	}

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

