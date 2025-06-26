import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface OrderSummaryProps {
  /** The total price of all items before shipping and taxes. */
  subtotal: number;
  /** The cost of shipping. Defaults to a flat rate if not provided. */
  shipping?: number;
  /** The tax rate as a decimal (e.g., 0.08 for 8%). Defaults to 8.5% if not provided. */
  taxRate?: number;
}

const DEFAULT_SHIPPING_COST = 5.99;
const DEFAULT_TAX_RATE = 0.085; // 8.5%

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shipping = DEFAULT_SHIPPING_COST,
  taxRate = DEFAULT_TAX_RATE,
}) => {
  console.log('OrderSummary component loaded.');

  const estimatedTaxes = subtotal * taxRate;
  const total = subtotal + shipping + estimatedTaxes;

  return (
    <Card className="w-full sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium">${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Taxes (Estimated)</span>
            <span className="font-medium">${estimatedTaxes.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;