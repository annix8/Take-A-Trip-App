class MongooseQueryObject {
    constructor(find, select) {
        this.find = find;
        this.select = select;
    }
}

module.exports = MongooseQueryObject;