class Util {
    handleResponse(res, err, data) {
        if (err) {
            return res.send(err);
        }

        return res.json(data);
    }

    getExcludeParams(request) {
        let excludeParams = [];
        if (request.query.exclude) {
            excludeParams = request.query.exclude
                .replace(/\s/g, '')
                .split(',')
                .map(x => `-${x}`);
        }
    
        return excludeParams;
    }
}

module.exports = new Util();