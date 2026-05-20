import { prismaClient } from '../../prisma/prisma';
import type {
  CategoryInput,
  UpdateCategoryInput,
} from '../dtos/input/category.input';
import type { CategoryModel } from '../models/category.model';

export class CategoryService {
  async create(data: CategoryInput, authorId: string): Promise<CategoryModel> {
    const existingCategory = await prismaClient.category.findUnique({
      where: { title: data.title },
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

  async findAllCategories(): Promise<CategoryModel[]> {
    const categories = await prismaClient.category.findMany();
    return categories;
  }

  async deleteCategory(id: string): Promise<void> {
    const category = await prismaClient.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    await prismaClient.category.delete({
      where: { id },
    });
  }
}
