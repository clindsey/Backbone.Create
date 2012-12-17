/**
 * View Description
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

var View     = require('core/View');
var template = require('templates/homeViewTemplate');

HomeView = View.extend({

	//--------------------------------------
	//+ PUBLIC PROPERTIES / CONSTANTS
	//--------------------------------------

  	/*
   	 * @private
	 */
	id: 'home-view',
	/*
   	 * @private
   	*/
	template: template,

	//--------------------------------------
  	//+ INHERITED / OVERRIDES
  	//--------------------------------------

	/*
	 * @private
	 */
	initialize: function() {
		this.render = _.bind( this.render, this );
	},

	/*
	 * @private
	 */
	render: function() {
		this.$el.html( this.template( this.getRenderData() ) );

		return this;
	},

	/*
	 * @private
	 */
	getRenderData: function() {
		return {
			artist: "Robert Ashley",
			operas: [
				"Music with Roots in the Aether (television opera) (1976)",
				"Perfect Lives (television opera) (1978–83)",
				"Atalanta (Acts of God) (1982–91)",
				"Improvement (Don Leaves Linda) (1985)",
				"eL/Aficionado (1987)",
				"Now Eleanor's Idea (1993)",
				"Foreign Experiences (1994)",
				"Celestial excursions (2003)",
				"Concrete (2006)"
			]
		}
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

module.exports = HomeView;

