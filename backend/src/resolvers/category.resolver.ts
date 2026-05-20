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
import { UserModel } from '../models/user.model';
import { CategoryService } from '../services/category.service';
import { UserService } from '../services/user.service';

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private categoryService = new CategoryService();
  private userService = new UserService();

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

  @FieldResolver(() => UserModel)
  async author(@Root() category: CategoryModel): Promise<UserModel> {
    return this.userService.findUserById(category.authorId);
  }
}
