
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
