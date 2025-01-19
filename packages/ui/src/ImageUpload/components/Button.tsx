import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import './Button.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  active?: boolean;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  active = false,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        'image-editor-button',
        active && 'image-editor-button--active',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
