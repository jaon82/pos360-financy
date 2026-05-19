import { prismaClient } from '../../prisma/prisma';
import type { LoginInput, RegisterInput } from '../dtos/input/auth.input';
import type { LoginOutput, RegisterOutput } from '../dtos/output/auth.output';
import type { UserModel } from '../models/user.model';
import { comparePassword, hashPassword } from '../utils/hash';
import { signJwt } from '../utils/jwt';

export class AuthService {
  generateToken(user: UserModel): RegisterOutput {
    const token = signJwt({ id: user.id, email: user.email }, '15m');

    const refreshToken = signJwt({ id: user.id, email: user.email }, '1d');

    return { token, refreshToken, user };
  }

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

  async login(data: LoginInput): Promise<LoginOutput> {
    const existingUser = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (!existingUser) {
      throw new Error('Email ou senha inválidos');
    }

    const isPasswordValid = await comparePassword(
      data.password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new Error('Email ou senha inválidos');
    }

    return this.generateToken(existingUser);
  }
}
