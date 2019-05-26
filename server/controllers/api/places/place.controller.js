class PlaceController{
    constructor(router){
        router.get('/', this.getAll.bind(this));
    }

    getAll(req, res){
        res.send("All places");
    }
}

module.exports = PlaceController;