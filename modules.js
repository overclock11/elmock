const Base =  require('./modules/baseModule/TestModuleBoot');
const base = new Base();

class Modules {
    static registerRoutes(app) {
        app.use('/api',base.setup());
    }
}

module.exports = Modules;