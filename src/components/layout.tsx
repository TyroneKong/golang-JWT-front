import { ReactNode } from "react";
import { Flex, Box } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <Flex gap={15}>
      {/* <Sidebar /> */}
      <Box>{children}</Box>
    </Flex>
  );
}

export default Layout;
