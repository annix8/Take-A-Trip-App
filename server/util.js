const jwtService = require('./services/jwt.service');

class Util {
    requireJwt(req, res, next) {
        const auth = req.headers.authorization;
        if (!auth) {
            return res.status(401).send({ success: false, error: "Unauthorized. Missing json web token." });
        }
        else {
            const token = auth.split(' ')[1];
            const decodedToken = jwtService.validateToken(token);
            if (!decodedToken.success) {
                return res.status(401).send({ success: false, error: "Unauthorized. Invalid json web token" });
            }

            res.locals.token_payload = decodedToken.response.payload;

            return next();
        }
    }

    handleJsonResponse(res, err, data) {
        if (err) {
            return res.send(err);
        }

        return res.json(data);
    }

    handleFileResponse(res, err, data) {
        if (err) {
            return res.send(err);
        }

        return res.end(data, 'binary');
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

    createResponseObject(isSuccess, responseBody) {
        return {
            success: isSuccess,
            response: responseBody
        };
    }
}

module.exports = new Util();