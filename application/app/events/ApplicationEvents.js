/**
 * Application Events
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

var ApplicationEvents = {
	
	/**
	 * Dispatched when view animation completes
	 * @type {String}
	 */
	ANIMATION_IN_COMPLETE: 'onAnimationInComplete',

	/**
	 * Dispatched when view animation out completes
	 * @type {String}
	 */
	ANIMATION_OUT_COMPLETE: 'onAnimationOutComplete',

	/**
	 * Dispatched when application is initialized
	 * @type {String}
	 */
	APPLICATION_INITIALIZED: 'onApplicationInitialized',

	/**
	 * PubSub.  Dispatched when application requests a view cleanup
	 * @type {String}
	 */
	DISPOSE_VIEWS: 'views:dispose'
}

module.exports = ApplicationConfig;