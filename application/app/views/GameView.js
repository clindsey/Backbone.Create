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

