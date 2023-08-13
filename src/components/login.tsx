import { useMutation } from "react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Button,
  Input,
  useToast,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Inputs, schema } from "../../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

function Login() {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const login = useMutation(
    (body: { username: string; password: string }) =>
      axios.post(`http://localhost:8080/api/login`, body),
    {
      onSuccess: () => {
        toast({
          title: "Logged in",
          description: "Login Successful",
          status: "success",
        });
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
  };
  return (
    <form typeof="onSubmit" onSubmit={handleSubmit(submit)}>
      <FormControl>
        <FormLabel>username</FormLabel>
        <Input {...register("username")} />
        <FormErrorMessage style={{ color: "red" }}>
          {errors.username?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel>password</FormLabel>
        <Input {...register("password")} />
        <FormErrorMessage style={{ color: "red" }}>
          {errors.password?.message}
        </FormErrorMessage>
      </FormControl>

      <Button variant="solid" type="submit" isDisabled={!isValid}>
        Login
      </Button>
    </form>
  );
}

export default Login;
