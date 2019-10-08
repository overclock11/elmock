const Base =  require('./modules/baseModule/TestModuleBoot');
const base = new Base();

class Modules {
    static async registerBase(app) {
        app.use('/api',base.setup());
        return app;
    }

    static async registerModule(app, instance) {
        app.use('/api',instance.setup());
        console.log("abasdad");
        return app;
    }
}

module.exports = Modules;