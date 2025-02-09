import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput, PasswordInput, Button, Alert, Card, Title, Stack, Center } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../utility/services/authService";

// Yup validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema), // Integrate Yup validation
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate("/"); // Redirect to dashboard on success
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <Center style={{ height: "100vh" }}>
      <Card shadow="lg" padding="xl" radius="md" withBorder style={{ width: 400 }}>
        <Title order={2} align="center" mb="md">
          Admin Login
        </Title>
        {error && (
          <Alert color="red" radius="md" mb="md">
            {error}
          </Alert>
        )}
        {/* Start: Login form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextInput
              placeholder="Enter your email"
              {...register("email")}
              error={errors.email?.message}
              radius="md"
            />

            <PasswordInput
              placeholder="Enter your password"
              {...register("password")}
              error={errors.password?.message}
              radius="md"
            />

            <Button type="submit" fullWidth mt="md" radius="md">
              Login
            </Button>
          </Stack>
        </form>
          {/* End: Login form */}
      </Card>
    </Center>
  );
};

export default Login;
