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
   *   - animated : {Boolean} should we animate out the view?
   */
  __cleanupViews: function( options ) {
    Backbone.Mediator.pub( ApplicationEvent.DISPOSE_VIEWS, options );
  }


});

module.exports = ApplicationRouter;