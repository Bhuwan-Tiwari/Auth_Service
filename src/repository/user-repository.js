const { User } = require("../models/index")


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
}
module.exports =UserRepository