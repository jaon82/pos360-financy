import { Input as InputPrimitive } from '@base-ui/react/input';
import type { LucideIcon } from 'lucide-react';
import type * as React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  icon?: LucideIcon;
  prefix?: string;
  hasError?: boolean;
}

function Input({
  icon: Icon,
  prefix,
  hasError,
  className,
  type,
  ...props
}: InputProps) {
  return (
    <div className="flex items-center gap-3 py-3.5 px-3 rounded-lg border border-gray-300 bg-white has-disabled:opacity-50">
      {Icon && (
        <Icon
          size={16}
          className={cn(
            'text-gray-400',
            'group-has-[input:not(:placeholder-shown)]/field:text-gray-800',
            'group-focus-within/field:text-brand-base!',
            'group-has-aria-invalid/field:text-danger!',
            'group-has-[input:disabled]/field:text-black!',
          )}
        />
      )}
      <InputPrimitive
        type={type}
        data-slot="input"
        aria-invalid={hasError}
        className={cn(
          'h-5 w-full min-w-0 bg-transparent px-2.5 py-1 shadow-xs transition-[color,box-shadow] outline-none',
          'text-base placeholder-shown:text-gray-500 not-placeholder-shown:text-gray-800',
          'disabled:text-black',
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
