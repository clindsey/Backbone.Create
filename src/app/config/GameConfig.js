/**
 * Game Configuration
 *
 * @langversion JavaScript
 *
 * @author
 * @since
 */

var AppConfig = require('config/AppConfig');

var GameConfig = (function() {

	/**
	 * Basic stage properties
	 * @type {Object}
	 */
	var _stage = {
		stageWidth: 1000,
		stageHeight: 1000,
		background: '#000',
		fps: 60
	};

	/**
	 * Default sprite playback frequency
	 * @type {Number}
	 */
	var spriteFrequency = 4;

	/**
	 * Application manifest for external assets and asset descriptors
	 * @type {Array}
	 */
	var _manifest = [
		{
			id: 'mouse',
			src: AppConfig.IMAGE_PATH + 'spritesheets/sprite-mouse.png',
			spritesheet: {
				"frames": [
					[218, 2, 23, 33, 0, 0, 0],
					[191, 2, 23, 33, 0, 0, 0],
					[299, 2, 23, 33, 0, 0, 0],
					[606, 2, 31, 25, 0, 0, 0],
					[571, 2, 31, 25, 0, 0, 0],
					[536, 2, 31, 25, 0, 0, 0],
					[501, 2, 31, 25, 0, 0, 0],
					[466, 2, 31, 25, 0, 0, 0],
					[431, 2, 31, 25, 0, 0, 0],
					[137, 2, 23, 33, 0, 0, 0],
					[110, 2, 23, 33, 0, 0, 0],
					[272, 2, 23, 33, 0, 0, 0],
					[83, 2, 23, 33, 0, 0, 0],
					[164, 2, 23, 33, 0, 0, 0],
					[245, 2, 23, 33, 0, 0, 0],
					[361, 2, 31, 25, 0, 0, 0],
					[396, 2, 31, 25, 0, 0, 0],
					[326, 2, 31, 25, 0, 0, 0],
					[676, 2, 31, 25, 0, 0, 0],
					[711, 2, 31, 25, 0, 0, 0],
					[641, 2, 31, 25, 0, 0, 0],
					[56, 2, 23, 33, 0, 0, 0],
					[29, 2, 23, 33, 0, 0, 0],
					[2, 2, 23, 33, 0, 0, 0]
				],
				"animations": {
					"scared-down": {"frames": [21, 22, 23], "frequency": spriteFrequency },
					"all": {"frames": [23], "frequency": spriteFrequency},
					"down": {"frames": [9, 10, 11], "frequency": spriteFrequency},
					"left": {"frames": [3, 4, 5], "frequency": spriteFrequency},
					"scared-right": {"frames": [18, 19, 20], "frequency": spriteFrequency},
					"scared-left": {"frames": [15, 16, 17], "frequency": spriteFrequency},
					"up": {"frames": [0, 1, 2], "frequency": spriteFrequency},
					"right": {"frames": [6, 7, 8], "frequency": spriteFrequency},
					"scared-up": {"frames": [12, 13, 14], "frequency": spriteFrequency}
				},
				"images": [AppConfig.IMAGE_PATH + 'spritesheets/sprite-mouse.png']
			}
		}
	];


	//--------------------------------------
	//+ PUBLIC INTERFACE
	//--------------------------------------

	return {

		/**
		 * @type {Object}
		 */
		STAGE: _stage,

		/**
		 * @type {Array}
		 */
		MANIFEST: _manifest

	}

}).call()

module.exports = GameConfig;