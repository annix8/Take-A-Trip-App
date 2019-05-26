class CountryController{
    constructor(router){
        router.get('/', this.getAll.bind(this));
    }

    getAll(req, res){
        res.send("All countries");
    }
}

module.exports = CountryController;