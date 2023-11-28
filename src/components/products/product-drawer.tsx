import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  Box,
  FormLabel,
  FormControl,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { productSchema, Inputs } from "../../schemas/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axiosRequest from "../../requests/requests";
import { useQueryClient } from "@tanstack/react-query";

function ProductDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<Inputs>({
    resolver: zodResolver(productSchema),
  });

  const createProduct = useMutation({
    mutationFn: (body: { name: string; serial_number: string }) =>
      axiosRequest.post("/createproduct", body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast({
        title: "Product Created",
        description: "Product created Successfully",
        status: "success",
      });
    },
  });

  const submit = (input: Inputs) => {
    const body: Inputs = {
      ...input,
    };

    createProduct.mutate(body);
    reset();
  };

  return (
    <Box mt={10}>
      <Button colorScheme="teal" onClick={onOpen}>
        Open Drawer
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create a new Product</DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit(submit)} id="create product">
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input {...register("name")} placeholder="Type here..." />
                <FormErrorMessage></FormErrorMessage>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Serial Number</FormLabel>
                <Input {...register("serial_number")} />
                <FormErrorMessage></FormErrorMessage>
              </FormControl>
            </form>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isDisabled={!isValid}
              type="submit"
              form="create product"
              colorScheme="blue"
              onClick={onClose}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default ProductDrawer;
