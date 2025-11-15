import { clsx } from 'clsx';

export const Card = ({ children, className = '', padding = 'md', ...props }) => {
  const paddings = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    none: 'p-0',
  };

  return (
    <div
      className={clsx(
        'bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 shadow-card dark:shadow-card-dark transition-all duration-200',
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div
      className={clsx('mb-4 pb-4 border-b border-gray-200 dark:border-dark-700', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3
      className={clsx('text-lg font-semibold text-gray-900 dark:text-white', className)}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p
      className={clsx('text-sm text-gray-600 dark:text-gray-400', className)}
      {...props}
    >
      {children}
    </p>
  );
};

export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={clsx('', className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div
      className={clsx('mt-4 pt-4 border-t border-gray-200 dark:border-dark-700', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
