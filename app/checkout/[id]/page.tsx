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
import { useParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { checkOutSchema, CheckOutSchemaType } from "../../schema/checkOut.schma";
import { onlinePayment } from "../../checkout.action/onlineCheckOut.action";

export default function CheckOut() {
  
  const params = useParams();
  const id = params.id as string;
  
  console.log("Checkout params:", params);
  console.log("Cart ID:", id);
  
  const router = useRouter();
  const form = useForm<CheckOutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkOutSchema),
  });

  async function handleCheckOut(values: CheckOutSchemaType) {
    let res = await onlinePayment(id, "http://localhost:3000", values);
if (res.status === "success") {
  window.location.href = res.session.url;
  toast.success("✅ Redirecting to payment page...", {
    position: "top-center",
    duration: 2000,});

  }
  }
  return (
    <div className="flex items-center justify-center">
      <div className="w-[400px] space-y-6 rounded-2xl bg-white p-6 shadow-xl">
        <h1 className="text-center text-2xl font-bold text-cyan-900">Checkout Now</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCheckOut)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Details" {...field} />
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
                    <Input
                      placeholder="Enter Your Phone"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your City"
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
              Pay Now
            </Button>
            
          </form>
        </Form>
        
      </div>
    </div>
  );
}
