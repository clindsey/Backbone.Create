/**
 * View Base Class
 *
 * @langversion JavaScript
 *
 * @author Christopher Pappas
 * @since 12.23.12
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
   * @param {Object} options
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

    // Check if view contains a sprite
    if( !_.isNull( this.sprite ) || !_.isNull( this.spritesheet ))

      // Check if animated
      if( !_.isUndefined( options.animated ) && options.animated )

        // Animate view out and then remove children
        this.animateOut(function() {
          if( !_.isNull( this.sprite ))
            self.sprite.removeAllChildren();
          else
            self.spritesheet.removeAllChildren();
        });

      // or just remove children
      else
        if( !_.isNull( this.sprite ))
          self.sprite.removeAllChildren();
        else
          self.spritesheet.removeAllChildren();
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