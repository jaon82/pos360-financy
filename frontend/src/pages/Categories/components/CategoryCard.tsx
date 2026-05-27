import { SquarePen, Trash } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  onEdit?: () => void;
}

export default function CategoryCard({ category, onEdit }: CategoryCardProps) {
  const bgColor = `bg-${category.color}-light`;
  const iconColor = `text-${category.color}-base`;
  const textColor = `text-${category.color}-dark`;

  return (
    <Card className="flex flex-col justify-between gap-5 p-6">
      <CardHeader className="flex justify-between items-center p-0">
        <div
          className={`flex justify-center items-center w-10 h-10 rounded-lg ${bgColor}`}
        >
          <DynamicIcon
            name={category.icon}
            className={`w-4 h-4 ${iconColor}`}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Trash className="w-4 h-4 text-danger" />
          </Button>
          <Button variant="outline" size="icon" onClick={onEdit}>
            <SquarePen className="w-4 h-4 text-gray-700" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="text-base font-semibold text-gray-800">
          {category.title}
        </div>
        <div className="text-sm text-gray-600 min-h-5">
          {category.description}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-0">
        <Badge className={`${bgColor} ${textColor}`}>{category.title}</Badge>
        <div>{category.transactionsCount ?? 0} itens</div>
      </CardFooter>
    </Card>
  );
}
