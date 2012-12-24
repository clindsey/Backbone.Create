/**
 * Application Bootstrapper
 * 
 * @langversion JavaScript
 * 
 * @author Christopher Pappas
 * @since 12.23.12
 */

var CreateUtils = require('utils/CreateUtils')
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
    c.Ticker.setFPS( GameConfig.STAGE.fps );
    this.ticker.tick = this.__onTickerUpdate;

    // Initialize the preloader
    this._preloadJS = new c.PreloadJS();
    this._preloadJS.onProgress = this.__onOverallProgress;
    this._preloadJS.onFileProgress = this.__onFileProgress;
    this._preloadJS.onFileLoad = this.__onFileLoad;
    this._preloadJS.onError = this.__onError;
    this._preloadJS.setMaxConnections( 5 );

    // Canvas container
    this.container = new c.Container();
    this.container.width = GameConfig.STAGE.width
    this.container.x = GameConfig.STAGE.width * .5 - this.container.width * .5;

    // Initialize views
    this.gameView = new GameView();
    this.applicationRouter = new ApplicationRouter();

    // Add views to canvas
    this.container.addChild( this.gameView.sprite );
    this.stage.addChild( this.container );

    // And load assets
    this._preloadJS.loadManifest( _.map( GameConfig.MANIFEST, function( asset ) { return asset.src }));
  },


  //--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------

  /**
   * Handler for ticker update events
   *
   */
  __onTickerUpdate: function() {
    Application.stage.update();
  },

  /**
   * Handle individual file progress events
   * @param {[type]} event [description]
   */
  __onFileProgress: function( event ) {},

  /**
   * Handle individual file load successes
   * @param {Event} event 
   */
  __onFileLoad: function( event ) {},

  /**
   * Handler for preload complete events
   * 
   */
  __onError: function( error ) {
    console.error( error )
  },

  /**
   * Handle overall load progress
   * @param {Event} event 
   */
  __onOverallProgress: function( event ) {
    if( event.loaded === event.total )
      this.start();
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
