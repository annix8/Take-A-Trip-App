class CityController{
    constructor(router){
        router.get('/', this.getAll.bind(this));
    }

    getAll(req, res){
        res.send("All cities");
    }
}

module.exports = CityController;