const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverconfig')


class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("something went wrong in service layer")
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '1d' })
            return result;
        } catch (error) {
            console.log('Something went wrong in token creation')
            throw error;

        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY)
            return response;
        } catch (error) {
            console.log('somethinf went wroong in service layer')
            throw error;
        }
    }

    checkPassword(userPlainPassword, encryptedPassword) {
     try {
        return bcrypt.compareSync(userPlainPassword,encryptedPassword)
     } catch (error) {
        console.log('somethinf went wroong in service layer')
        throw error;
     }
    }
}
module.exports = UserService