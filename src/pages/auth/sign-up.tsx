/* eslint-disable @typescript-eslint/no-misused-promises */
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { type NextPage } from "next";
import { useForm } from "react-hook-form";
import AuthLayout from "~/components/auth-layout";
import { inputStyles } from "~/styles/input-styles";
import { signUpSchema, type SignUpSchema } from "~/types/auth-types";
import Error from "~/components/error";
import Button from "~/components/button";
import axios from "axios";
import { type User } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

const signUp = async (data: SignUpSchema) => {
  try {
    await axios.post<User>("/api/auth", data);
  } catch (error) {
    throw error;
  }
};

const SignUp: NextPage = () => {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
  });

  const { push } = useRouter();

  const onSubmit = async (data: SignUpSchema) => {
    await signUp(data)
      .then(() => push("/auth/sign-in"))
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          if (e.response && e.response.data) {
            setError(e.response.data as string);
          } else {
            console.log(e);
            setError("Something went wrong");
          }
        }
      });
  };

  return (
    <AuthLayout>
      <h2 className="my-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Create an account
      </h2>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        {error && <Error message={error} />}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email")}
            className={inputStyles({ intent: "auth" })}
            autoComplete="email"
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <Error message={message} />}
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            {...register("username")}
            className={inputStyles({ intent: "auth" })}
            autoComplete="username"
          />
          <ErrorMessage
            errors={errors}
            name="username"
            render={({ message }) => <Error message={message} />}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password")}
            className={inputStyles({ intent: "auth" })}
            autoComplete="new-password"
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <Error message={message} />}
          />
        </div>
        <div>
          <label htmlFor="password">Confirm password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className={inputStyles({ intent: "auth" })}
            autoComplete="new-password"
          />
          <ErrorMessage
            errors={errors}
            name="confirmPassword"
            render={({ message }) => <Error message={message} />}
          />
        </div>
        <Button role="auth" text="Sign Up" type="submit" disabled={!isValid} />
      </form>
      <div className="font-regular mt-3 text-gray-900">
        {"Already have an account?"}
        <Link href="/auth/sign-in" className="ml-1 font-medium text-blue-700">
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
