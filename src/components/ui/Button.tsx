import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-grizzly-black disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-grizzly-amber hover:bg-grizzly-amber-hover text-white shadow-lg shadow-grizzly-amber/20 focus:ring-grizzly-amber',
    secondary: 'bg-grizzly-card hover:bg-grizzly-border text-grizzly-bone border border-grizzly-border focus:ring-grizzly-border',
    outline: 'border-2 border-grizzly-amber text-grizzly-amber hover:bg-grizzly-amber hover:text-white focus:ring-grizzly-amber',
    ghost: 'text-grizzly-muted hover:text-grizzly-bone hover:bg-grizzly-card/50',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
