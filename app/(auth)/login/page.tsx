"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { ensureDefaultAdmin } from "@/lib/actions/auth-seed";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, Loader2, AlertCircle } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // Guarantee the default admin account exists in Better Auth on mount
  React.useEffect(() => {
    ensureDefaultAdmin().catch(() => {});
  }, []);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@gmail.com",
      password: "admin@1234",
    },
  });

  const handleSignIn = async (values: LoginFormValues) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      let res = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });

      // If user doesn't exist yet, ensure seed and retry once
      if (res.error && values.email === "admin@gmail.com") {
        await ensureDefaultAdmin();
        res = await authClient.signIn.email({
          email: values.email,
          password: values.password,
        });
      }

      if (res.error) {
        setErrorMessage(
          res.error.message || "Invalid credentials. Please verify your email and password."
        );
        setIsLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "Authentication request failed"
      );
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
          <Lock className="size-5" />
        </div>
        <CardTitle>Administrative Portal</CardTitle>
        <CardDescription>
          Sign in to access ORÉVA catalogue management and client enquiries.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-6">
          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={loginForm.handleSubmit(handleSignIn)} className="flex flex-col gap-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="login-email">Email Address</FieldLabel>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="admin@gmail.com"
                  {...loginForm.register("email")}
                />
                {loginForm.formState.errors.email && (
                  <FieldError>{loginForm.formState.errors.email.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="login-password">Password</FieldLabel>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••••••"
                  {...loginForm.register("password")}
                />
                {loginForm.formState.errors.password && (
                  <FieldError>{loginForm.formState.errors.password.message}</FieldError>
                )}
              </Field>
            </FieldGroup>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 data-icon="inline-start" className="animate-spin" />
              ) : null}
              <span>{isLoading ? "Authenticating..." : "Access Admin Console"}</span>
            </Button>
          </form>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Default CMS credentials: <span className="font-mono text-foreground font-medium">admin@gmail.com</span> / <span className="font-mono text-foreground font-medium">admin@1234</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
