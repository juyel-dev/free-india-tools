import { forwardRef, useState } from 'react';
import { clsx } from 'clsx';
import { Eye, EyeOff } from 'lucide-react';

const Input = forwardRef(({
  label,
  type = 'text',
  error,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  wrapperClassName = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={clsx('w-full', wrapperClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={18} />
          </div>
        )}
        <input
          ref={ref}
          type={inputType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={clsx(
            'w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-dark-800 text-gray-900 dark:text-white transition-all duration-200',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            'focus:outline-none focus:ring-2',
            error
              ? 'border-red-300 dark:border-red-800 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900'
              : 'border-gray-300 dark:border-dark-600 focus:border-primary-500 focus:ring-primary-200 dark:focus:ring-primary-900',
            Icon && iconPosition === 'left' && 'pl-10',
            (Icon && iconPosition === 'right' || isPassword) && 'pr-10',
            isFocused && 'shadow-sm',
            className
          )}
          {...props}
        />
        {Icon && iconPosition === 'right' && !isPassword && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={18} />
          </div>
        )}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
