const City = require('../../../models/city');

class CityController{
    constructor(router){
        router.get('/', this.getAll.bind(this));
    }

    getAll(req, res){
        City.find((err, data) =>{
            if(err){
                return res.send(err);
            }

            return res.json(data);
        });
    }
}

module.exports = CityController;