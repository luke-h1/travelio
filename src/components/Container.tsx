import { ReactNode } from 'react';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Container = ({ children, size = 'lg' }: Props) => {
  return <div>{children}</div>;
};

export default Container;
