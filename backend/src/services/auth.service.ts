import { prismaClient } from '../../prisma/prisma';
import type { RegisterInput } from '../dtos/input/auth.input';
import type { RegisterOutput } from '../dtos/output/auth.output';
import type { UserModel } from '../models/user.model';
import { hashPassword } from '../utils/hash';
import { signJwt } from '../utils/jwt';

export class AuthService {
  async register(data: RegisterInput): Promise<RegisterOutput> {
    const existingUser = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await prismaClient.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return this.generateToken(user);
  }

  generateToken(user: UserModel): RegisterOutput {
    const token = signJwt({ id: user.id, email: user.email }, '15m');

    const refreshToken = signJwt({ id: user.id, email: user.email }, '1d');

    return { token, refreshToken, user };
  }
}
