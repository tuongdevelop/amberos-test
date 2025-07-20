import { AppDataSource } from "../config/database.config";
import { User } from "../database/entities/User.entity";
export const userRepository = AppDataSource.getRepository(User).extend({
    async findByEmailWithPassword(email: string) {
        return this.createQueryBuilder("user").addSelect("user.password").where("user.email = :email", { email }).getOne();
    }
});
