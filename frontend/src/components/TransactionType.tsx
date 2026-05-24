import { CircleArrowDown, CircleArrowUp } from 'lucide-react';

interface TransactionTypeIndicatorProps {
  type: 'income' | 'outcome';
  variant?: 'default' | 'icon';
}
export default function TransactionTypeIndicator({
  type,
  variant = 'default',
}: TransactionTypeIndicatorProps) {
  return (
    <div className="flex items-center gap-2 font-medium text-sm">
      {type === 'income' ? (
        <>
          <CircleArrowUp size={16} className=" text-green-base" />
          {variant === 'default' ? (
            <span className="text-green-dark">Entrada</span>
          ) : null}
        </>
      ) : (
        <>
          <CircleArrowDown size={16} className=" text-red-base" />
          {variant === 'default' ? (
            <span className="text-red-dark">Saída</span>
          ) : null}
        </>
      )}
    </div>
  );
}
