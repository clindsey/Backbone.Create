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
