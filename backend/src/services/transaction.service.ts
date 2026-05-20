import { prismaClient } from '../../prisma/prisma';
import type {
  TransactionInput,
  UpdateTransactionInput,
} from '../dtos/input/transaction.input';
import type { TransactionModel } from '../models/transaction.model';

export class TransactionService {
  async create(
    data: TransactionInput,
    authorId: string,
  ): Promise<TransactionModel> {
    const transaction = await prismaClient.transaction.create({
      data: {
        type: data.type,
        description: data.description,
        date: data.date,
        amount: data.amount,
        categoryId: data.categoryId,
        authorId: authorId,
      },
    });

    return transaction;
  }

  async updateTransaction(
    id: string,
    data: UpdateTransactionInput,
    authorId: string,
  ): Promise<TransactionModel> {
    const existingTransaction = await prismaClient.transaction.findUnique({
      where: { id },
    });

    if (!existingTransaction) {
      throw new Error('Transação não encontrada');
    }

    if (existingTransaction.authorId !== authorId) {
      throw new Error('Apenas o autor da transação pode atualizá-la');
    }

    const updatedTransaction = await prismaClient.transaction.update({
      where: { id },
      data: {
        type: data.type ?? existingTransaction.type,
        description: data.description ?? existingTransaction.description,
        date: data.date ?? existingTransaction.date,
        amount: data.amount ?? existingTransaction.amount,
        categoryId: data.categoryId ?? existingTransaction.categoryId,
        authorId: authorId,
      },
    });

    return updatedTransaction;
  }

  async findTransactionById(
    id: string,
    authorId: string,
  ): Promise<TransactionModel> {
    const transaction = await prismaClient.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new Error('Transação não encontrada');
    }

    if (transaction.authorId !== authorId) {
      throw new Error('Apenas o autor da transação pode visualizá-la');
    }

    return transaction;
  }

  async findAllTransactions(authorId: string): Promise<TransactionModel[]> {
    const transactions = await prismaClient.transaction.findMany({
      where: { authorId },
    });
    return transactions;
  }

  async deleteTransaction(id: string, authorId: string): Promise<void> {
    const transaction = await prismaClient.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new Error('Transação não encontrada');
    }

    if (transaction.authorId !== authorId) {
      throw new Error('Apenas o autor da transação pode deletá-la');
    }

    await prismaClient.transaction.delete({
      where: { id },
    });
  }

  async findTransactionsByCategoryId(categoryId: string) {
    const transactions = await prismaClient.transaction.findMany({
      where: { categoryId },
    });

    return transactions;
  }

  async countTransactionsByCategoryId(categoryId: string): Promise<number> {
    const count = await prismaClient.transaction.count({
      where: { categoryId },
    });

    return count;
  }
}
