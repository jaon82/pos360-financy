import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import type { User } from '../../prisma/generated/client';
import {
  TransactionInput,
  UpdateTransactionInput,
} from '../dtos/input/transaction.input';
import { GqlUser } from '../graphql/decorators/user.decorator';
import { IsAuth } from '../middlewares/auth.middleware';
import { CategoryModel } from '../models/category.model';
import { TransactionModel } from '../models/transaction.model';
import { UserModel } from '../models/user.model';
import { CategoryService } from '../services/category.service';
import { TransactionService } from '../services/transaction.service';
import { UserService } from '../services/user.service';

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private transactionService = new TransactionService();
  private userService = new UserService();
  private categoryService = new CategoryService();

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg('data', () => TransactionInput) data: TransactionInput,
    @GqlUser() user: User,
  ): Promise<TransactionModel> {
    return this.transactionService.create(data, user.id);
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg('data', () => UpdateTransactionInput) data: UpdateTransactionInput,
    @Arg('id', () => String) id: string,
    @GqlUser() user: User,
  ): Promise<TransactionModel> {
    return this.transactionService.updateTransaction(id, data, user.id);
  }

  @Query(() => [TransactionModel])
  async listTransactions(@GqlUser() user: User): Promise<TransactionModel[]> {
    return this.transactionService.findAllTransactions(user.id);
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg('id', () => String) id: string,
    @GqlUser() user: User,
  ): Promise<boolean> {
    await this.transactionService.deleteTransaction(id, user.id);
    return true;
  }

  @FieldResolver(() => CategoryModel)
  async category(
    @Root() transaction: TransactionModel,
  ): Promise<CategoryModel> {
    return this.categoryService.findCategoryById(transaction.categoryId);
  }

  @FieldResolver(() => UserModel)
  async author(@Root() transaction: TransactionModel): Promise<UserModel> {
    return this.userService.findUserById(transaction.authorId);
  }
}
