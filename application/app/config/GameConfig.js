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
	}

	/*
		 * Public interface
	 */
	return {
		STAGE_PROPERTIES: _stageProperties
	}

}).call()

module.exports = GameConfig;