import LoadingDots from '@frontend/components/LoadingDots';
import classNames from 'classnames';
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  FC,
  JSXElementConstructor,
  ReactNode,
} from 'react';

export type ButtonComponentType =
  | 'button'
  | 'a'
  | JSXElementConstructor<unknown>;

export interface ButtonProps<T extends ButtonComponentType = 'button'> {
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'violet' | 'black' | 'white';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  type?: 'button' | 'submit' | 'reset';
  component?: T;
  width?: string | number;
  loading?: boolean;
  disabled?: boolean;
  testId?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * The HTML props allowed by the Button component. These
 * props depend on the used component type (T).
 */

export type ButtonHTMLType<T extends ButtonComponentType = 'button'> =
  T extends 'a'
    ? AnchorHTMLAttributes<HTMLAnchorElement>
    : ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonFC<T extends ButtonComponentType = 'button'> = FC<
  ButtonHTMLType<T> & ButtonProps<T>
>;

type ButtonType = <T extends ButtonComponentType = 'button'>(
  ...args: Parameters<ButtonFC<T>>
) => ReturnType<ButtonFC<T>>;

const variants = {
  primary:
    'text-background bg-success border-success-dark hover:bg-success/90 shadow-[0_5px_10px_rgb(0,68,255,0.12)]',
  ghost: 'text-success hover:bg-[rgba(0,68,255,0.06)]',
  secondary:
    'text-accents-5 bg-background border-accents-2 hover:border-foreground hover:text-foreground',
  black:
    'bg-foreground text-background border-foreground hover:bg-background hover:text-foreground',
  white: 'bg-background text-foreground border-background hover:bg-accents-1',
  violet: 'text-background bg-violet border-violet-dark hover:bg-[#7123be]',
};

const sizes = {
  sm: 'h-8 leading-3 text-sm px-1.5 py-3',
  md: 'h-10 leading-10 text-[15px]',
  lg: 'h-12 leading-12 text-[17px]',
};

const Button: ButtonFC = ({
  className,
  variant = 'primary',
  size = 'md',
  active,
  component: Component = 'button',
  width,
  loading,
  style = {},
  testId,
  children,
  ...rest
}: ButtonProps) => {
  const rootClassName = classNames(
    'relative inline-flex items-center justify-center cursor pointer no-underline px-3.5 rounded-md',
    'font-medium outline-0 select-none align-middle whitespace-nowrap',
    'transition-colors ease-in duration-200',
    variant !== 'ghost' && 'border border-solid',
    variants[variant],
    sizes[size],
    { 'cursor-not-allowed': loading },
    className,
  );

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      className={rootClassName}
      data-testid={testId ?? 'button'}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {loading ? (
        <i className="m-0 flex">
          <LoadingDots />
        </i>
      ) : (
        children
      )}
    </Component>
  );
};
// Our Button component is built thinking of it as a button,
// but it can also be used as a link and include the anchor props
export default Button as ButtonType;
