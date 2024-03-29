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
            if(error.name=='SequelizeValidationError')
            {
                throw error
            }
            console.log("something went wrong in service layer")
            throw error 
            
            `new AppError('ServerError',
            'Something went wrong in service',
            'Logical Issue found',
            500);`
        }
    }

    //in signin we create a token afetr matching the password
    async signIn(email, plainPassword) {
        try {
            const user = await this.userRepository.getByEmail(email)
            const passwordsMatch = this.checkPassword(plainPassword,user.password)

            if (!passwordsMatch) {
                console.log('password doesnot match')
                throw { error: 'Incorrect password' }
            }

            const newJWT = this.createToken({email : user.email,id : user.id })
            return newJWT ;
        } catch (error) {
            console.log("something went wrong in service layer")
            throw error;
        }
    }
    async isAuthenticated(token)
    {
         try {
           const response = await this.verifyToken(token)    //we get  the email and id from response token after varifcation
           if(!response)
           {
            throw{error:'invalid token'}
           }
           const user =await  this.userRepository.getById(response.id) //we get full user object
           if(!user)
           {
            throw{error:'no user with this corrosponding token exixts'}
           }
           return user.id;
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
            return bcrypt.compareSync(userPlainPassword, encryptedPassword)
        } catch (error) {
            console.log('somethinf went wroong in service layer')
            throw error;
        }
        
    }
    isAdmin(userId)
    {
        try {
            return this.userRepository.isAdmin(userId)
        } catch (error) {
            console.log('something went wrong in service layer')
            throw error;
        }
    }



}
module.exports = UserService