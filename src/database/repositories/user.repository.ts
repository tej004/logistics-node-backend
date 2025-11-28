import dataSource from "../data-source/data-source";
import { UserEntity } from "../entities/user.entity";

export const userRepository = dataSource.getRepository(UserEntity);