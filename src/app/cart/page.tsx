import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Shopping Cart | GearHub",
  description: "Review your GearHub cart and continue shopping.",
};

export default function CartPage() {
  return <CartView />;
}
