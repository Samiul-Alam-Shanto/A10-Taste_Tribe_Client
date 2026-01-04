import React from "react";
import { useLocation, Navigate } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { FaShieldAlt } from "react-icons/fa";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentPage = () => {
  const location = useLocation();
  // ★ Retrieve the data
  const { selectedPackage } = location.state || {};

  // ★ SAFETY CHECK: If no package selected, go back to selection screen
  if (!selectedPackage) {
    return <Navigate to="/dashboard/go-premium" replace />;
  }

  return (
    <div className="min-h-screen py-12 px-4 flex justify-center items-start">
      <title>Checkout - TasteTribe</title>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-secondary text-secondary-content p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
            <h2 className="text-2xl font-bold opacity-80 mb-1">
              Order Summary
            </h2>
            <h1 className="text-4xl font-black mb-8">
              {selectedPackage.name} Plan
            </h1>

            <div className="space-y-4 border-t border-white/10 pt-6">
              <div className="flex justify-between items-center text-2xl font-black text-primary">
                <span>Total</span>
                {/* Use displayPrice if available, else format the number */}
                <span>
                  {selectedPackage.displayPrice || `$${selectedPackage.price}`}
                </span>
              </div>
            </div>
          </div>

          {/* Security Badge */}
          <div className="flex items-center gap-4 bg-base-100 p-4 rounded-2xl border border-base-200 shadow-sm opacity-80">
            <FaShieldAlt className="text-3xl text-success" />
            <div>
              <p className="font-bold text-secondary text-sm">
                Secure SSL Encryption
              </p>
              <p className="text-xs text-base-content/60">
                Your transaction is protected by Stripe.
              </p>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="bg-base-100 p-8 rounded-[2.5rem] shadow-xl border border-base-200">
          <h3 className="text-2xl font-bold text-secondary mb-6">
            Payment Details
          </h3>
          <Elements stripe={stripePromise}>
            <CheckoutForm selectedPackage={selectedPackage} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
