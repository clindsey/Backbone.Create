
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
