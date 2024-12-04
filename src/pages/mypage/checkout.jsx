import React, { useState } from "react";
import { Box, Typography, Button, Grid, Paper, TextField } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe("YOUR_STRIPE_PUBLISHABLE_KEY");

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            // Replace this URL with your backend endpoint to handle payment intent creation
            const response = await fetch("https://your-backend.com/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: 500, // Amount in cents (e.g., $5.00 = 500 cents)
                    currency: "usd",
                }),
            });

            const { clientSecret } = await response.json();

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: "Customer Name", // Replace with the user's name
                    },
                },
            });

            if (result.error) {
                setErrorMessage(result.error.message);
            } else if (result.paymentIntent.status === "succeeded") {
                setPaymentStatus("Payment successful!");
            }
        } catch (error) {
            setErrorMessage("An error occurred during payment.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box
                sx={{
                    backgroundColor: "#1A1A1A",
                    p: 3,
                    borderRadius: 2,
                    textAlign: "center",
                    mb: 2,
                }}
            >
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Enter Payment Details
                </Typography>
                <Box
                    sx={{
                        backgroundColor: "#FFF",
                        borderRadius: 1,
                        p: 2,
                        mb: 2,
                    }}
                >
                    <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        backgroundColor: "#7D6FF0",
                        color: "#FFF",
                        textTransform: "none",
                        width: "100%",
                        fontWeight: "bold",
                    }}
                    disabled={!stripe || isLoading}
                >
                    {isLoading ? "Processing..." : "Pay $5.00"}
                </Button>
                {errorMessage && (
                    <Typography variant="body2" sx={{ color: "red", mt: 2 }}>
                        {errorMessage}
                    </Typography>
                )}
                {paymentStatus && (
                    <Typography variant="body2" sx={{ color: "green", mt: 2 }}>
                        {paymentStatus}
                    </Typography>
                )}
            </Box>
        </form>
    );
}

function PricingPage() {
    return (
        <Elements stripe={stripePromise}>
            <Box
                sx={{
                    color: "#FFF",
                    minHeight: "100vh",
                    backgroundColor: "#0A0A0A",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    px: 2,
                    py: 4,
                }}
            >
                {/* Title */}
                <Typography variant="h2" sx={{ fontWeight: "bold", mb: 3 }}>
                    Pricing
                </Typography>

                {/* Pricing Section */}
                <Paper
                    elevation={3}
                    sx={{
                        backgroundColor: "#1A1A1A",
                        color: "#FFF",
                        borderRadius: 2,
                        p: 3,
                        textAlign: "center",
                        width: "100%",
                        maxWidth: 500,
                        mb: 4,
                    }}
                >
                    <Grid container sx={{ mb: 2 }}>
                        <Grid item xs={6}>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                Credits
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                Price
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box sx={{ mb: 2 }}>
                        <Grid container sx={{ mb: 1 }}>
                            <Grid item xs={6}>
                                <Typography>500</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>$5.00</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>

                {/* Checkout Form */}
                <CheckoutForm />
            </Box>
        </Elements>
    );
}

export default PricingPage;
