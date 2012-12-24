/**
 * CreateJS Utilities and helper method-wrappers
 *
 * @author Christopher Pappas
 * @since 12.23.12
 */

var AppConfig  = require('config/AppConfig');
var GameConfig = require('config/GameConfig');

var Utils = (function() {

	/**
	 * Set the default search key for asset queries
	 * @type {String}
	 */
	var DEFAULT_KEY = 'name';


	//--------------------------------------
	//+ PUBLIC INTERFACE
	//--------------------------------------

	return {

		/**
		 * Animates a spritesheet once and then returns to old position
		 * @param  {c.BitmapAnimation} spritesheet
		 * @param  {String} frameLabel the frame label
		 */
		animateOnce: function( spritesheet, frameLabel ) {
			spritesheet.onAnimationEnd = function() { this.gotoAndStop( frameLabel ) };
			spritesheet.gotoAndPlay( frameLabel );
		},

		/**
		 * Moves all frame reg-points to the center.
		 * USE WITH CAUTION:  Adjusting the internals invalidates pixel-snapping
		 * @param  {BitmapAnimation} bitmapAnimation
		 */
		centerSpriteSheetRegPoint: function( bitmapAnimation ) {
			_.each( bitmapAnimation.spriteSheet._frames, function( frame ) {
				frame.regX = frame.rect.width * .5
				frame.regY = frame.rect.height * .5
			});
		},

		/**
		 * Creates a bitmap
		 * @param  {*} value the value-pair of the asset
		 * @param  {String} key to search under
		 * @return {c.Bitmap}  The bitmap
		 */
		createBitmap: function( value, lookupKey ) {
			if( _.isUndefined( lookupKey )) 
				lookupKey = DEFAULT_KEY;

			return new c.Bitmap( CreateUtils.returnAssetImage( value, lookupKey ));
		},

		/**
		 * Creates a spritesheet and returns c.BitmapAnimation object
		 * @param  {*} value the value-pair of the asset
		 * @param  {String} key to search under
		 * @return {c.BitmapAnimation}  The animated spritesheet
		 */
		createSpriteSheet: function( value, lookupKey ) {
			if( _.isUndefined( lookupKey )) 
				lookupKey = DEFAULT_KEY;

			return new c.BitmapAnimation( new c.SpriteSheet( CreateUtils.returnAssetSpriteSheet( value, lookupKey )));
		},

		/**
		 * Creates a hit area for DisplayObjects
		 * @param  {DisplayObject} parent
		 * @param  {Number} width
		 * @param  {Number} height
		 */
		createHitArea: function( parent, width, height ) {
			width = width || 0;
			height = height || 0;

			parent.hitArea = new c.Shape( new c.Graphics().beginFill("#f00").drawRect( 0, 0, width, height ));
		},

		/**
		 * Util for dragging display objects to aproximate positioning
		 * @param  {Array} objArr An array of display objects to drag
		 *
		 */
		dragObject: function( objArr ) {
			_.each( objArr, function( displayObject ) {
				
				if( displayObject instanceof c.BitmapAnimation ) {
					name = displayObject.spriteSheet._images[0].attributes[0].nodeValue;
				}
				else if( displayObject instanceof c.Bitmap) {
					name = displayObject.image.attributes[0].nodeValue;
				}
				else {
					name = '';
				}

				displayObject.onPress = function( event ) {
					var offset = { x:displayObject.x - event.stageX, y: displayObject.y - event.stageY };

					evt.onMouseMove = function(ev) {
						var x = ev.stageX + offset.x;
						var y = ev.stageY + offset.y;

						displayObject.x = x;
						displayObject.y = y;

						console.log( x + ', ' + y, ' > ' + name );
					}
				}
			});
		},

		/**
		 * Returns a game asset
		 * @param  {String} name the asset name
		 * @return {Object}	  the asset
		 */
		returnAsset: function( value, lookupKey ) {
			if( _.isUndefined( lookupKey )) 
				lookupKey = DEFAULT_KEY;

			var len = GameConfig.MANIFEST.length;
			for( var i = 0; i < len; ++i ) {
				var asset = GameConfig.MANIFEST[i];
				if( asset.hasOwnProperty( lookupKey )) {
					if( asset[lookupKey] === value ) {
						return asset;
					}
				}
			};
			
			return false; 
		},

		/**
		 * Returns an image url
		 * // TODO: Merge image and spritesheet into one returnAsset method
		 * @param  {String} value the asset value-pair
		 * @return {String}	  the asset url
		 */
		returnAssetImage: function( value, lookupKey ) {
			var len = GameConfig.MANIFEST.length;
			for( var i = 0; i < len; ++i ) {
				var asset = GameConfig.MANIFEST[i];
				if( asset.hasOwnProperty( lookupKey )) {
					if( asset[lookupKey] === value ) {
						return asset.src;
					}
				}
			};

			return false; 
		},

		/**
		 * Returns a spritesheet object
		 * // TODO: Merge image and spritesheet into one returnAsset method
		 * @param  {String} value the asset value
		 * @return {Object}	  the asset spritesheet
		 */
		returnAssetSpriteSheet: function( value, lookupKey ) {
			var len = GameConfig.MANIFEST.length;
			for( var i = 0; i < len; ++i ) {
				var asset = GameConfig.MANIFEST[i];
				if( asset.hasOwnProperty( lookupKey )) {
					if( asset[lookupKey] === value ) {
						return asset.spritesheet;
					}
				}
			};

			return false; 
		}
	}

}).call();

module.exports = CreateUtils;