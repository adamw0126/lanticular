import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Paper, TextField } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe("pk_test_51QRZ3WGMAEaY209O8cXUXK1BQ0vPxKVWA0iQmwv6OXZ3OHaIUtUQ8b3ZEvfOiKgsbxxEg1FlgAVO7MXf2ADnacb100or86dNnu");

function CheckoutForm({ totalPrice, buyCredits }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    let countryNames;
    fetch('https://restcountries.com/v3.1/all').then(response => response.json())
      .then(data => {
        countryNames = data.map(country => country.name.common);
        setCountries(countryNames);
      }).catch(error => console.error('Error fetching country data:', error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Replace this URL with your backend endpoint to handle payment intent creation
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(totalPrice) * 100, // Amount in cents (e.g., $5.00 = 500 cents)
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
        buyCredits();
      }
    } catch (error) {
      setErrorMessage("An error occurred during payment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Box
          sx={{
            backgroundColor: "#FFF",
            borderRadius: 1,
            p: '10px',
            mb: 2,
            fontFamily: 'Campton Webfont,Arial,sans-serif',
          }}
        >
          <CardElement options={{ style: { base: { fontSize: "15px" } } }} />
        </Box>

        {/* <div className="form-group">
          <label htmlFor="country">Country</label>
          <select id="country">
            {
              countries.map(val => (<option value={val} key={val}>{val}</option>))
            }
          </select>
        </div> */}

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#482bd9",
            color: "white",
            textTransform: "none",
            width: "100%",
            fontWeight: "400",
            fontFamily: 'Campton Webfont,Arial,sans-serif',
            fontSize: 17,
            borderRadius: 25
          }}
          disabled={!stripe || isLoading}
        >
          {isLoading ? <div style={{color:'white'}}>{"Processing..."}</div> : `Pay $${totalPrice}`}
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

function PricingPage({ totalPrice, buyCredits }) {
  return (
    <Elements stripe={stripePromise}>
      <Box>
        <CheckoutForm totalPrice={totalPrice} buyCredits={buyCredits} />
      </Box>
    </Elements>
  );
}

export default PricingPage;
