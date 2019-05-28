class Util {
    handleResponse(res, err, data) {
        if (err) {
            return res.send(err);
        }

        return res.json(data);
    }
}

module.exports = new Util();