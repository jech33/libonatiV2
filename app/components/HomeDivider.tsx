import { HTMLProps } from 'react';

const HomeDivider = (props: HTMLProps<HTMLHRElement>) => {
  const { className, ...hrProps } = props;
  return (
    <hr
      className={`mx-auto mb-[4.5rem] h-[0.25rem] w-6/12 border-0 bg-libonatiGold lg:hidden ${className}`}
      {...hrProps}
    />
  );
};

export default HomeDivider;
