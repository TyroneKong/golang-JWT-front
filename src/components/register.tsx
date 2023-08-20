import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import {
  Button,
  Input,
  useToast,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Text,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Inputs, schema } from "../../schemas/registerSchema";
import axiosRequest from "../requests/requests";

function Register() {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const navigate = useNavigate();

  const registerUser = useMutation(
    (body: { email: string; password: string }) =>
      axiosRequest.post(`/register`, body),
    {
      onSuccess: () => {
        toast({
          title: "Register",
          description: "Register Successful",
          status: "success",
        });
        navigate("/login");
      },
      onError: () => {
        toast({
          title: "Not registered",
          description: "Register Unsuccessful",
          status: "error",
        });
      },
    }
  );

  const submit = (data: Inputs) => {
    registerUser.mutate(data);
    reset();
  };
  return (
    <VStack>
      <Button colorScheme="blue" onClick={() => navigate("/login")}>
        Log in
      </Button>
      <Text as="h2">Register Page</Text>
      <form typeof="onSubmit" onSubmit={handleSubmit(submit)}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input {...register("name")} />
          <FormErrorMessage style={{ color: "red" }}>
            {errors.name?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input {...register("username")} />
          <FormErrorMessage style={{ color: "red" }}>
            {errors.username?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input {...register("email")} />
          <FormErrorMessage style={{ color: "red" }}>
            {errors.email?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>password</FormLabel>
          <Input {...register("password")} />
          <FormErrorMessage style={{ color: "red" }}>
            {errors.password?.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          mt={10}
          size="lg"
          variant="solid"
          colorScheme="blue"
          type="submit"
          isDisabled={!isValid}
        >
          Register
        </Button>
      </form>
    </VStack>
  );
}

export default Register;
