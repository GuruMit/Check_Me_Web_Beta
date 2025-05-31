import React from 'react';
import { cn } from '@/lib/utils';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  icon,
  iconPosition = 'left',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:ring-offset-2';
  
  const variantClasses = {
    default: 'bg-brand-500 text-white hover:bg-brand-500/90',
    outline: 'border border-brand-500/50 text-brand-500 hover:bg-brand-500/10',
    ghost: 'text-brand-500 hover:bg-brand-500/10',
    link: 'text-brand-500 underline-offset-4 hover:underline',
  };
  
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  const iconSpacing = iconPosition === 'left' ? 'mr-2' : 'ml-2';
  
  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className={iconSpacing}>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className={iconSpacing}>{icon}</span>}
    </button>
  );
};

export default PrimaryButton;
