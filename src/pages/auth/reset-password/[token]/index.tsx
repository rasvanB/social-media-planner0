/* eslint-disable @typescript-eslint/no-misused-promises */
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { type GetServerSideProps, type NextPage } from "next";
import { useForm } from "react-hook-form";
import AuthLayout from "~/components/auth-layout";
import Button from "~/components/button";
import { prisma } from "~/server/db";
import { inputStyles } from "~/styles/input-styles";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "~/types/auth-types";
import Error from "~/components/error";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { resetPassword } from "~/utils/services";

type Props =
  | {
      userId: null;
      error: string;
    }
  | {
      userId: string;
      error: null;
    };

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { token } = context.query;
  if (token && typeof token === "string") {
    const resetToken = await prisma.resetToken.findUnique({
      where: { token: token },
    });
    if (!resetToken)
      return { props: { error: "This reset link is invalid.", userId: null } };

    if (new Date(resetToken.expires).getTime() < Date.now()) {
      await prisma.resetToken.deleteMany({
        where: { id: resetToken.id },
      });
      return { props: { error: "This reset link has expired", userId: null } };
    }
    return { props: { error: null, userId: resetToken.id } };
  }
  return { props: { error: "This reset link is invalid.", userId: null } };
};

const ResetPasswordForm: NextPage<Props> = (props: Props) => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onTouched",
    criteriaMode: "firstError",
  });

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      setTimeout(async () => {
        await push("/auth/sign-in");
      }, 1000);
    },
  });

  const onSubmit = (data: ResetPasswordSchema) => {
    if (!props.userId) return;
    mutation.mutate({
      password: data.password,
      userId: props.userId,
    });
  };

  return (
    <AuthLayout>
      {props.error ? (
        <div className="text-center text-xl font-medium text-gray-900">
          {props.error}
        </div>
      ) : (
        <>
          <h2 className="my-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Reset your password
          </h2>
          {mutation.isError && (
            <div className="text-center text-red-600">
              There was an error resetting your password. Please try again.
            </div>
          )}
          {mutation.isSuccess && (
            <div className="text-center text-green-600">
              Password successfully reset! Redirecting...
            </div>
          )}
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
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
              <label htmlFor="password">Confirm Password</label>
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
            <Button
              role="auth"
              text="Reset Password"
              type="submit"
              disabled={!isValid}
            />
          </form>
        </>
      )}
    </AuthLayout>
  );
};

export default ResetPasswordForm;
