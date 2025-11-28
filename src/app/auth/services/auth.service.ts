import dataSource from "@/database/data-source/data-source";
import { UserEntity } from "@/database/entities/user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  static async register(userData: Partial<UserEntity>) {
    const userRepository = dataSource.getRepository(UserEntity);

    const existingUser = await userRepository.findOneBy([
      { email: userData.email.toLowerCase() },
      { number: userData.number }
    ]);
    
    if (existingUser) {
      throw new Error("User with this email or number already exists");
    }

    const user = userRepository.create({ ...userData, email: userData.email.toLowerCase() });
    await userRepository.save(user);
    return user;
  }

  static async login(email: string, password: string) {
    const userRepository = dataSource.getRepository(UserEntity);
    const user = await userRepository.findOneBy({ email: email.toLowerCase() });
    if (!user) return { user: null, token: null };
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { user: null, token: null };

    const token = jwt.sign(
      { uuid: user.uuid, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return { user, token };
  }

}