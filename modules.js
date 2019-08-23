const Hotels =  require('./modules/hotels/HotelsBoot');
const hotels = new Hotels();
const Base =  require('./modules/baseModule/TestModuleBoot');
const base = new Base();

class Modules {
    static registerRoutes(app) {
        app.use('/api',hotels.setup());
        app.use('/api',base.setup());
    }
}

module.exports = Modules;