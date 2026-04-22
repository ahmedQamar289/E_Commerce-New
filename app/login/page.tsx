"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginSchema, type LoginSchemaValues } from "../schema/login.schma";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const form = useForm<LoginSchemaValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(values: LoginSchemaValues) {
    try {
      // التحقق من أن المستخدم مسجل
      const savedUser = localStorage.getItem("user_" + values.email);
      if (!savedUser) {
        toast.error("❌ Email not registered. Please register first!", {
          position: "top-center",
          duration: 2000,
        });
        router.push("/register");
        return;
      }

      const userData = JSON.parse(savedUser);
      
      // التحقق من كلمة المرور
      if (userData.password !== values.password) {
        toast.error("❌ Wrong password!", {
          position: "top-center",
          duration: 2000,
        });
        return;
      }

      // تسجيل الدخول
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // حفظ حالة المستخدم في localStorage
      localStorage.setItem("loggedInUser", values.email);
      localStorage.setItem("userToken", userData.email);

      toast.success("✅ Login successful!", {
        position: "top-center",
        duration: 2000,
      });
      router.push("/");
      router.refresh();
    } catch (error: any) {
      const message = error?.message || "❌ Login failed";
      toast.error("❌" + message, {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-[400px] space-y-6 rounded-2xl bg-white p-6 shadow-xl">
        <h1 className="text-center text-2xl font-bold text-cyan-900">Login</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full cursor-pointer bg-cyan-800 text-white hover:bg-cyan-700"
            >
              Login
            </Button>
            
          </form>
        </Form>
        <Button
              type="submit"
              className="w-full cursor-pointer bg-cyan-800 text-white hover:bg-cyan-700"
              onClick={() => router.push("/register")}
            >
              Register
            </Button>
      </div>
    </div>
  );
}
