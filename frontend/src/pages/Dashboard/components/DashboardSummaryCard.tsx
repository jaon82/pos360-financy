import type { LucideIcon } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface DashboardSummaryCardProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
}

export default function DashboardSummaryCard({
  icon: Icon,
  iconColor,
  title,
  description,
}: DashboardSummaryCardProps) {
  return (
    <Card className="w-full max-w-md p-6">
      <CardHeader className="flex flex-col gap-4">
        <CardTitle className="flex gap-3 items-center p-0 ">
          <Icon className={`w-6 h-6 ${iconColor}`} />
          <span className="font-medium text-xs text-gray-500 uppercase">
            {description}
          </span>
        </CardTitle>
        <CardDescription className="font-bold text-[1.75rem] text-gray-800 leading-6">
          {title}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
