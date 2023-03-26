/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import { useForm } from "react-hook-form";
import AuthLayout from "~/components/auth-layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SignInSchema, signInSchema } from "~/types/authTypes";
import { type SubmitHandler } from "react-hook-form/dist/types";
import { inputStyles } from "~/styles/input-styles";
import { signIn } from "next-auth/react";
import { ErrorMessage } from "@hookform/error-message";
import Error from "~/components/error";
import Button from "~/components/button";
import { useState } from "react";
import { useRouter } from "next/router";

const SignIn: NextPage = () => {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: "onTouched",
    criteriaMode: "firstError",
  });

  const { push } = useRouter();

  const onSubmit: SubmitHandler<SignInSchema> = async (data) => {
    await signIn("credentials", {
      ...data,
      redirect: false,
    }).then(async (res) => {
      if (res) {
        if (res.ok) {
          await push("/");
        } else {
          setError(res.error || "Something went wrong");
        }
      }
    });
  };

  return (
    <AuthLayout>
      <h2 className="my-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>
      <form className=" flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        {error && <Error message={error} />}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email")}
            className={inputStyles({ intent: "auth" })}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <Error message={message} />}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password")}
            className={inputStyles({ intent: "auth" })}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <Error message={message} />}
          />
        </div>
        <Button role="auth" text="Sign In" type="submit" disabled={!isValid} />
      </form>
    </AuthLayout>
  );
};
export default SignIn;
