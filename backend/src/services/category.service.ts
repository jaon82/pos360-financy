import { prismaClient } from '../../prisma/prisma';
import type { CategoryInput } from '../dtos/input/category.input';
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
}
