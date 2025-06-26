import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OrderSummary from "@/components/OrderSummary";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Define the validation schema using Zod
const checkoutFormSchema = z.object({
  // Shipping Information
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Please enter a valid address." }),
  city: z.string().min(2, { message: "Please enter a valid city." }),
  postalCode: z.string().min(4, { message: "Please enter a valid postal code." }),
  country: z.string({ required_error: "Please select a country." }),

  // Shipping Method
  shippingMethod: z.enum(["standard", "express"], {
    required_error: "You need to select a shipping method.",
  }),

  // Payment Details
  cardName: z.string().min(2, { message: "Name on card is required." }),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits."),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format."),
  cardCvc: z.string().regex(/^\d{3,4}$/, "CVC must be 3 or 4 digits."),
});

const CheckoutPage = () => {
  console.log("CheckoutPage loaded");
  const navigate = useNavigate();

  // Initialize react-hook-form
  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      shippingMethod: "standard",
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
    },
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof checkoutFormSchema>) {
    console.log("Checkout form submitted:", values);
    toast.success("Order Placed!", {
      description: "Thank you for your purchase. A confirmation has been sent to your email.",
    });
    // Redirect to home page after a short delay to allow user to see the toast
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight">Checkout</h1>
            <p className="text-lg text-muted-foreground mt-2">Complete your order by providing the details below.</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column: Form Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                  <CardDescription>Enter the address where you want to receive your order.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Address</FormLabel>
                      <FormControl><Input placeholder="123 Main St, Apt 4B" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl><Input placeholder="New York" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                   <FormField control={form.control} name="postalCode" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl><Input placeholder="10001" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="country" render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Country</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a country" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="mx">Mexico</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </CardContent>
              </Card>

              {/* Shipping Method Card */}
              <Card>
                <CardHeader><CardTitle>Shipping Method</CardTitle></CardHeader>
                <CardContent>
                  <FormField control={form.control} name="shippingMethod" render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-4">
                                <Label htmlFor="standard" className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                                    <div className="flex items-center space-x-3">
                                        <RadioGroupItem value="standard" id="standard" />
                                        <div className="flex flex-col">
                                            <span>Standard Shipping</span>
                                            <span className="text-sm text-muted-foreground">4-6 business days</span>
                                        </div>
                                    </div>
                                    <span className="font-semibold">$5.99</span>
                                </Label>
                                <Label htmlFor="express" className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                                    <div className="flex items-center space-x-3">
                                        <RadioGroupItem value="express" id="express" />
                                         <div className="flex flex-col">
                                            <span>Express Shipping</span>
                                            <span className="text-sm text-muted-foreground">1-2 business days</span>
                                        </div>
                                    </div>
                                    <span className="font-semibold">$15.99</span>
                                </Label>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )} />
                </CardContent>
              </Card>

              {/* Payment Details Card */}
              <Card>
                <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                    <CardDescription>Enter your credit card information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField control={form.control} name="cardName" render={({ field }) => (
                        <FormItem><FormLabel>Name on Card</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="cardNumber" render={({ field }) => (
                        <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="1111 2222 3333 4444" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="cardExpiry" render={({ field }) => (
                            <FormItem><FormLabel>Expiry (MM/YY)</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="cardCvc" render={({ field }) => (
                            <FormItem><FormLabel>CVC</FormLabel><FormControl><Input placeholder="123" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <OrderSummary subtotal={499.99} />
                <Button type="submit" size="lg" className="w-full text-lg bg-yellow-500 text-black hover:bg-yellow-600">
                  Place Your Order
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;