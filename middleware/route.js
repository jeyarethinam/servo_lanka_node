
'use strict';
module.exports = function(app) {
    var auth = require('./validateRequest');
    // app.all('/api/v1/*', [require('./middlewares/validateRequest')]);
    // app.use( config.baseUrl + '/user', require('../api/user/index')); //user related Api
    app.use( config.baseUrl + '/industry', require('../api/industry/index'));
    app.use( config.baseUrl + '/product', require('../api/product/index'));
    
}
