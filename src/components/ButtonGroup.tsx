import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  testId?: string;
}

const ButtonGroup = ({ children, testId }: Props) => {
  return (
    <div className="flex items-center justify-center mb-3">
      <div
        className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
        role="group"
        data-testid={testId}
      >
        {children}
      </div>
    </div>
  );
};
export default ButtonGroup;
