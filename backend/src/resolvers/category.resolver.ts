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
  CategoryInput,
  UpdateCategoryInput,
} from '../dtos/input/category.input';
import { GqlUser } from '../graphql/decorators/user.decorator';
import { IsAuth } from '../middlewares/auth.middleware';
import { CategoryModel } from '../models/category.model';
import { TransactionModel } from '../models/transaction.model';
import { UserModel } from '../models/user.model';
import { CategoryService } from '../services/category.service';
import { TransactionService } from '../services/transaction.service';
import { UserService } from '../services/user.service';

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private categoryService = new CategoryService();
  private userService = new UserService();
  private transactionsService = new TransactionService();

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg('data', () => CategoryInput) data: CategoryInput,
    @GqlUser() user: User,
  ): Promise<CategoryModel> {
    return this.categoryService.create(data, user.id);
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg('data', () => UpdateCategoryInput) data: UpdateCategoryInput,
    @Arg('id', () => String) id: string,
  ): Promise<CategoryModel> {
    return this.categoryService.updateCategory(id, data);
  }

  @Query(() => [CategoryModel])
  async listCategories(): Promise<CategoryModel[]> {
    return this.categoryService.findAllCategories();
  }

  @Query(() => CategoryModel)
  async getCategory(
    @Arg('id', () => String) id: string,
  ): Promise<CategoryModel> {
    return this.categoryService.findCategoryById(id);
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Arg('id', () => String) id: string): Promise<boolean> {
    await this.categoryService.deleteCategory(id);
    return true;
  }

  @FieldResolver(() => UserModel)
  async author(@Root() category: CategoryModel): Promise<UserModel> {
    return this.userService.findUserById(category.authorId);
  }

  @FieldResolver(() => [TransactionModel])
  async transactions(
    @Root() category: CategoryModel,
  ): Promise<TransactionModel[]> {
    return this.transactionsService.findTransactionsByCategoryId(category.id);
  }

  @FieldResolver(() => Number)
  async transactionsCount(@Root() category: CategoryModel): Promise<number> {
    return this.transactionsService.countTransactionsByCategoryId(category.id);
  }
}
