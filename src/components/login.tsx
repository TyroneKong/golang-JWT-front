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
import { Inputs, schema } from "../../schemas/loginSchema";
import useUser from "../contexts/userContext";
import axiosRequest from "../requests/requests";

function Login() {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const navigate = useNavigate();

  const { setAuthorized } = useUser();
  const login = useMutation(
    (body: { email: string; password: string }) =>
      axiosRequest.post("/login", body),
    {
      onSuccess: () => {
        setAuthorized(true);
        toast({
          title: "Logged in",
          description: "Login Successful",
          status: "success",
        });
        navigate("/users");
      },
      onError: () => {
        toast({
          title: "Not logged in",
          description: "Login Unsuccessful",
          status: "error",
        });
      },
    }
  );

  const submit = (data: Inputs) => {
    login.mutate(data);
    reset();
  };

  return (
    <VStack>
      <Button onClick={() => navigate("/register")} colorScheme="blue">
        Register
      </Button>
      <Text as="h2">Login Page</Text>
      <form onSubmit={handleSubmit(submit)}>
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
            {" "}
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
          isLoading={isSubmitting}
        >
          Login
        </Button>
      </form>
    </VStack>
  );
}

export default Login;
