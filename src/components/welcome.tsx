import { PropsWithChildren } from "react";

type Props<T extends React.ElementType> = {
  as?: T;
};

const defaultElement = "div" as const;

type TagProps<E extends React.ElementType> = Props<E> &
  Omit<React.ComponentProps<E>, keyof Props<E>>;

function Welcome<E extends React.ElementType>({
  children,
  as,
  ...otherprops
}: PropsWithChildren<TagProps<E>>) {
  const Tag = as || defaultElement;

  return <Tag {...otherprops}>{children}</Tag>;
}

export default Welcome;
