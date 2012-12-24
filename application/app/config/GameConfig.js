/**
 * Game Configuration
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

var GameConfig = (function() {

	/**
	 * Basic stage properties
	 * @type {Object}
	 */
	var _stageProperties = {
		width: 1000,
		height: 500,
		background: '#000',
		fps: 60
	};

	/**
	 * Application manifest for external assets and asset descriptors
	 * @type {Array}
	 */
	var _manifest = [

	];


	//--------------------------------------
	//+ PUBLIC INTERFACE
	//--------------------------------------
	
	return {

		/**
		 * @type {Object}
		 */
		STAGE_PROPERTIES: _stageProperties
	}

}).call()

module.exports = GameConfig;