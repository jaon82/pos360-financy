import type { LucideIcon } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface CategorySummaryCardProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
}

export default function CategorySummaryCard({
  icon: Icon,
  iconColor,
  title,
  description,
}: CategorySummaryCardProps) {
  return (
    <Card className="w-full max-w-md p-6">
      <CardHeader className="flex gap-4">
        <Icon className={`w-6 h-6 ${iconColor}`} />
        <div className="flex flex-col gap-2 items-start p-0">
          <CardTitle className="font-bold text-[1.75rem] text-gray-800 leading-6">
            {title}
          </CardTitle>
          <CardDescription className="font-medium text-xs text-gray-500 uppercase">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
