import type { IconName } from 'lucide-react/dynamic';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface Category {
  id: string;
  title: string;
  description?: string;
  icon: IconName;
  color: string;
  transactions?: Transaction[];
  transactionsCount?: number;
}

export interface Transaction {
  id: string;
  type: 'income' | 'outcome';
  amount: number;
  date: string;
  description?: string;
  category: Category;
}
