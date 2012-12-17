//JavaScript////////////////////////////////////////////////////////////////////
// 
// Copyright 2012 
// 
////////////////////////////////////////////////////////////////////////////////

/**
 * Application Bootstrapper
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

Application = {

    //--------------------------------------
    //+ PUBLIC PROPERTIES / CONSTANTS
    //--------------------------------------

    //--------------------------------------
    //+ INHERITED / OVERRIDES
    //--------------------------------------

    initialize: function() {

        // Import views
        var HomeView = require('views/HomeView');
        var ApplicationRouter = require('routers/ApplicationRouter');

        // Initialize views
        this.homeView = new HomeView();
        this.applicationRouter = new ApplicationRouter();

        if (typeof Object.freeze === 'function') Object.freeze(this);
    }
}

module.exports = Application;
