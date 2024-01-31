const { User,Role} = require("../models/index")


class UserRepository {
    async create(data) {
        try {
            const userr = await User.create(data);
            return userr;

        } catch (error) {
            console.log("something went wrong at repository layer")
            throw error
        }
    }

    async destroy(userId) {
        try {
            await User.destroy({
                where: {
                    id: userId
                }
            })
            return true;
        } catch (error) {
            console.log("something went wrong at repository layer")
            throw error;
        }
    }
    async getById(userId) {
        try {
            const user = await User.findByPk(userId,{
                attributes : ['email','id',]
            })
            return user
        } catch (error) {
            console.log("something went wrong repositiry layer")
            throw error
        }
    }
    async getByEmail(userEmail) {
        try {
            const user = await User.findOne({where: {
                email: userEmail
            }});
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
    async isAdmin(userId)
    {
try {
    const user = await User.findByPk(userId)
    const adminRole = await Role.findOne({
        name:'AMDIN'
    })
    return user.hasRole(adminRole)
} catch (error) {
    console.log("Something went wrong on repository layer");
    throw error;
}
    }
}
module.exports = UserRepository