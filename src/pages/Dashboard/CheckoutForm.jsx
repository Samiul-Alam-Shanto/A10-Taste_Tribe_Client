import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import {
  FaCreditCard,
  FaLock,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";

import useAxiosSecure from "../../hooks/Axios/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useThemeToggle from "../../hooks/useThemeToggle";

const CheckoutForm = ({ selectedPackage }) => {
  // Hooks - must be at the top
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { theme } = useThemeToggle();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // State Management
  const [clientSecret, setClientSecret] = useState("");
  const [isLoadingIntent, setIsLoadingIntent] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [cardholderName, setCardholderName] = useState(user?.displayName || "");
  const [cardComplete, setCardComplete] = useState(false);

  // Fetch Payment Intent on Mount
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        setIsLoadingIntent(true);
        setError("");

        // Prepare payload
        const payload = selectedPackage.id
          ? { packageName: selectedPackage.id }
          : { price: selectedPackage.price };

        // Make API call
        const response = await axiosSecure.post(
          "/create-payment-intent",
          payload
        );

        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.error("Payment Intent Error:", err);
        setError("Unable to initialize payment. Please refresh and try again.");
      } finally {
        setIsLoadingIntent(false);
      }
    };

    if (selectedPackage) {
      fetchPaymentIntent();
    }
  }, [selectedPackage, axiosSecure]);

  // Handle Payment Submission
  const handlePayment = async () => {
    // Validation checks
    if (!stripe || !elements) {
      setError("Payment system is still loading. Please wait.");
      return;
    }

    if (!clientSecret) {
      setError("Payment is not ready yet. Please wait a moment.");
      return;
    }

    if (!cardholderName.trim()) {
      setError("Please enter the cardholder name.");
      return;
    }

    // Start processing
    setProcessing(true);
    setError("");

    try {
      const cardElement = elements.getElement(CardElement);

      // Confirm payment with Stripe
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: cardholderName.trim(),
              email: user?.email,
            },
          },
        });

      // Handle errors
      if (confirmError) {
        throw new Error(confirmError.message);
      }

      // Payment succeeded
      if (paymentIntent.status === "succeeded") {
        // Update backend
        await axiosSecure.patch("/users/make-premium", {
          paymentId: paymentIntent.id,
          package: selectedPackage.name,
        });

        // Refresh cached data
        queryClient.invalidateQueries(["user_profile"]);
        queryClient.invalidateQueries(["user-stats"]);

        // Show success message
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: `Welcome to ${selectedPackage.name}! Your premium features are now active.`,
          confirmButtonColor: "#d96c4e",
          confirmButtonText: "Go to Dashboard",
        }).then(() => {
          navigate("/dashboard/user-home");
        });
      }
    } catch (err) {
      console.error("Payment Error:", err);
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  // Stripe Card Element Styles - adjusted for better input height and alignment
  const cardElementOptions = {
    style: {
      base: {
        color: theme === "dark" ? "#ffffff" : "#000000",
        fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        lineHeight: "40px",
        fontWeight: "400",
        "::placeholder": {
          color: theme === "dark" ? "#9ca3af" : "#6b7280",
        },
      },
      invalid: {
        color: "#ef4444",
        iconColor: "#ef4444",
      },
      complete: {
        color: theme === "dark" ? "#ffffff" : "#000000",
      },
    },
    hidePostalCode: false,
  };

  // Format price with currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Loading State
  if (isLoadingIntent) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="loading loading-spinner loading-lg text-primary"></div>
        <p className="text-base-content/60 font-medium">
          Preparing secure checkout...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Package Summary Card */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 mb-8 border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-secondary mb-1">
              {selectedPackage.name}
            </h3>
            <p className="text-base-content/60 text-sm">Premium Membership</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-black text-primary">
              {formatPrice(selectedPackage.price)}
            </div>
            <p className="text-xs text-base-content/50 font-semibold">
              one-time payment
            </p>
          </div>
        </div>
      </div>

      {/* Checkout Form */}
      <div className="space-y-6">
        {/* Cardholder Name Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold text-secondary text-sm uppercase tracking-wider">
              Cardholder Name
            </span>
            <span className="label-text-alt text-xs text-base-content/40">
              Required
            </span>
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="input input-lg bg-base-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-base-100 transition-all font-medium text-secondary"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            disabled={processing}
          />
        </div>

        {/* Card Details Input - ADDED PADDING FOR BETTER INTERACTIVITY */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold text-secondary text-sm uppercase tracking-wider">
              Card Details
            </span>
            <span className="label-text-alt flex items-center gap-1 text-base-content/40">
              <FaLock className="text-xs" />
              <span className="text-xs">Secure</span>
            </span>
          </label>

          <div
            className={`p-3 bg-base-200 rounded-xl border-2 transition-all ${
              cardComplete
                ? "border-success bg-base-100"
                : "border-transparent focus-within:border-primary focus-within:bg-base-100"
            }`}
          >
            <CardElement
              options={cardElementOptions}
              onChange={(e) => {
                setCardComplete(e.complete);
                if (e.error) {
                  setError(e.error.message);
                } else {
                  setError("");
                }
              }}
            />
          </div>

          {cardComplete && (
            <label className="label">
              <span className="label-text-alt text-success flex items-center gap-1">
                <FaCheckCircle />
                Card details verified
              </span>
            </label>
          )}
        </div>

        {/* Error Alert */}
        {error && (
          <div role="alert" className="alert alert-error rounded-xl shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            onClick={handlePayment}
            disabled={!stripe || processing || !clientSecret || !cardComplete}
            className="btn btn-lg w-full rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:shadow-2xl hover:scale-[1.02] border-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? (
              <>
                <span className="loading loading-spinner"></span>
                Processing Payment...
              </>
            ) : (
              <>
                <FaLock className="text-lg" />
                Pay {formatPrice(selectedPackage.price)}
              </>
            )}
          </button>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <FaShieldAlt className="text-success text-xl" />
          <p className="text-xs text-base-content/60 font-semibold">
            Secured by Stripe • SSL Encrypted • PCI Compliant
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-base-300">
          <div className="text-center">
            <FaLock className="text-2xl text-primary mx-auto mb-2" />
            <p className="text-xs font-bold text-base-content/70">
              256-bit SSL
            </p>
          </div>
          <div className="text-center">
            <FaShieldAlt className="text-2xl text-success mx-auto mb-2" />
            <p className="text-xs font-bold text-base-content/70">PCI DSS</p>
          </div>
          <div className="text-center">
            <FaCreditCard className="text-2xl text-secondary mx-auto mb-2" />
            <p className="text-xs font-bold text-base-content/70">All Cards</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
