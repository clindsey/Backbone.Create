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
  animateIn: function() {},

  /**
   * Animate out
   * @type {noop}
   */
  animateOut: function() {}


  //--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------

  //--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------

});

module.exports = View;
