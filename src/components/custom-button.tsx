import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

// how to build a polymorphic button

// this is a default button
const DefaultType = "button" as const;

type ButtonDefaultType = typeof DefaultType;

// this take a generic E which will end up being the type of button i.e. as Link
type ButtonOWnProps<E extends React.ElementType> = {
  children: ReactNode;
  as?: E;
};

type ButtonProps<E extends React.ElementType> = ButtonOWnProps<E> &
  Omit<React.ComponentProps<E>, keyof ButtonOWnProps<E>>;

// main component which takes generic E which can be any element type and takes the following props
// children (text of the button),as which defined the type of element and otherprops which
// are the attributes of the button, the other props are inherited automatically once the Button is defined
function Button<E extends React.ElementType = ButtonDefaultType>({
  children,
  as,
  ...otherprops
}: ButtonProps<E>) {
  const Tag = as || DefaultType;

  return <Tag {...otherprops}>{children}</Tag>;
}

export default Button;

// below are examples of using the polymorphic button
export function Main() {
  return (
    <>
      <Button as={Link} to="/">
        Link
      </Button>
      <Button>Submit</Button>
      <Button as="a" href="/">
        anchor
      </Button>
    </>
  );
}
