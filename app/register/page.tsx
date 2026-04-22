"use client"

import { useForm } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterSchemaValues } from "../schema/register.schma"
import axios from "axios"
import type { AxiosError } from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
  
  const form = useForm<RegisterSchemaValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  })

  async function handleRegister(values: RegisterSchemaValues) {
    console.log(values)
    try {
      // Simulate registration by storing user data in localStorage
      const userData = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
      }
      
      // Store in localStorage
      localStorage.setItem('user_' + values.email, JSON.stringify(userData))
      localStorage.setItem('loggedInUser', values.email)
      
      toast.success("✅ Registration successful!", {
        position: "top-center",
        duration: 2000,
      })
      
      router.push('/login')
    } catch (error: any) {
      toast.error("❌ Registration failed", {
        position: "top-center",
        duration: 2000,
      })
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-[400px] space-y-6 rounded-2xl bg-white p-6 shadow-xl">
        <h1 className="text-center text-2xl font-bold text-cyan-900">Register</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    <Input placeholder="Enter Your Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Re-enter Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Re-enter Your Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Phone Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full cursor-pointer bg-cyan-800 text-white hover:bg-cyan-700">
              Register
            </Button>
          </form>
        </Form>
        <Button
                      type="submit"
                      className="w-full cursor-pointer bg-cyan-800 text-white hover:bg-cyan-700"
                      onClick={() => {
                        router.push("/login")}}
                    >
                      Login
        </Button>
      </div>
    </div>
  )
}
