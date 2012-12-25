/**
 * View Description
 *
 * @langversion JavaScript
 *
 * @author
 * @since
 */

var View				= require('core/View');
var Utils 			= require('utils/Utils');
var CreateUtils = require('utils/CreateUtils');
var GameConfig	= require('config/GameConfig');

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

		var self = this;
		var sprite = this.sprite;

		/**
		 * Local method to create and move box on stage
		 */
		function createBox() {
			var w = Math.random() * 200,
					h = w;

			var square = CreateUtils.createRect( Utils.returnRandomHexColor(), w, h, 1 );
			square.x = 0;
			square.y = 0;
			sprite.addChild( square );
			
			var mouseSprite = CreateUtils.createSpriteSheet( 'mouse' );
			sprite.addChild( mouseSprite );
			mouseSprite.gotoAndPlay('up');

			function moveBox( square ) {
				var scale = Math.random() * 2;

				TweenMax.to( square, 2, {
					x: Math.random() * GameConfig.STAGE.stageWidth,
					y: Math.random() * GameConfig.STAGE.stageHeight,
					rotation: Math.random() * 360,
					scaleX: scale,
					scaleY: scale,
					ease: Expo.easeInOut,
					overwrite: 'none',
					onComplete: function() {
						moveBox( this.target );
					}
				});
			}

			moveBox( mouseSprite );
			moveBox( square );
		}

		for( var i = 0; i < 50; ++i )
			createBox();
	},

	/**
	 * Disposes of the view
	 *
	 */
	dispose: function( options ) {
		this._super( options );
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