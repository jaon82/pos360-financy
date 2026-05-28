import { prismaClient } from '../../prisma/prisma';
import type {
  CategoryInput,
  UpdateCategoryInput,
} from '../dtos/input/category.input';
import type { CategoryModel } from '../models/category.model';

export class CategoryService {
  async create(data: CategoryInput, authorId: string): Promise<CategoryModel> {
    const existingCategory = await prismaClient.category.findUnique({
      where: { title_authorId: { title: data.title, authorId } },
    });

    if (existingCategory) {
      throw new Error('Categoria já cadastrada');
    }

    const category = await prismaClient.category.create({
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        color: data.color,
        authorId: authorId,
      },
    });

    return category;
  }

  async updateCategory(
    id: string,
    data: UpdateCategoryInput,
    authorId: string,
  ): Promise<CategoryModel> {
    if (!id) {
      throw new Error('Id da categoria obrigatório');
    }

    const category = await prismaClient.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    if (category.authorId !== authorId) {
      throw new Error('Apenas o autor da categoria pode atualizá-la');
    }

    const updatedCategory = await prismaClient.category.update({
      where: { id },
      data: {
        title: data.title ?? category.title,
        description: data.description ?? category.description,
        icon: data.icon ?? category.icon,
        color: data.color ?? category.color,
      },
    });

    return updatedCategory;
  }

  async findCategoryById(id: string): Promise<CategoryModel> {
    const category = await prismaClient.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    return category;
  }

  async findCategoryByIdAndUser(
    id: string,
    authorId: string,
  ): Promise<CategoryModel> {
    const category = await prismaClient.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    if (category.authorId !== authorId) {
      throw new Error('Apenas o autor da categoria pode visualizá-la');
    }

    return category;
  }

  async findAllCategories(authorId: string): Promise<CategoryModel[]> {
    const categories = await prismaClient.category.findMany({
      where: { authorId },
    });
    return categories;
  }

  async deleteCategory(id: string, authorId: string): Promise<void> {
    const category = await prismaClient.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    if (category.authorId !== authorId) {
      throw new Error('Apenas o autor da categoria pode deletá-la');
    }

    await prismaClient.category.delete({
      where: { id },
    });
  }
}
