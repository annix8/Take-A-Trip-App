const bcrypt = require('bcrypt');
const saltRounds = 10;

class PasswordService {
    hashPassword(password) {
        return bcrypt.hashSync(password, saltRounds);
    }

    checkPassword(password, hash){
        return bcrypt.compareSync(password, hash);
    }
}

module.exports = new PasswordService();