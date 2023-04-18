import { useMutation } from "@tanstack/react-query";
import { type NextPage } from "next";
import { useState } from "react";
import AuthLayout from "~/components/auth-layout";
import Button from "~/components/button";
import Error from "~/components/error";
import { inputStyles } from "~/styles/input-styles";
import { sendResetPasswordEmail } from "~/utils/services";

const ResetPassword: NextPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");

  const mutation = useMutation({ mutationFn: sendResetPasswordEmail });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter an email");
      return;
    }
    mutation.mutate(email);
  };

  return (
    <AuthLayout>
      <h2 className="my-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Reset your password
      </h2>
      {mutation.isSuccess && (
        <div className="text-center">
          <p className="text-green-600">
            {"We've sent you an email with a link to reset your password."}
          </p>
        </div>
      )}
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className={inputStyles({ intent: "auth" })}
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {error && <Error message={error} />}
        <Button role="auth" text="Reset Password" type="submit" />
      </form>
    </AuthLayout>
  );
};
export default ResetPassword;
