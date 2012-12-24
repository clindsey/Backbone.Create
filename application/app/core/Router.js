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

  /**
   * Initializes the Base router
   * @param  {Object} options 
   * 
   */
  initialize: function( options ) {
    this._super( options );
  }

});

module.exports = Router;