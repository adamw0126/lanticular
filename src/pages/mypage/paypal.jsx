import React, { useEffect, useRef } from "react";

const PayPalButton = ({ totalPrice, buyCredits }) => {
  const paypalRef = useRef();

  useEffect(() => {
    // Load the PayPal SDK script
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AeDQGDqHflUWKGaAc8u3b3A0sTbvNUpuuIRvw2-LVB-o33bAF2Out6FlZIAp_cSiyDWIQZwtk5KSzLHO&currency=USD";
    script.async = true;

    // Append the script to the document body
    script.onload = () => {
      // Initialize the PayPal button after the script has loaded
      window.paypal
        .Buttons({
          fundingSource: window.paypal.FUNDING.PAYPAL,
          createOrder: (data, actions) => {
            console.log('data.paymentSource ===>', data.paymentSource)
            if(data.paymentSource != "card"){
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: totalPrice, // Replace with your item price
                    },
                  },
                ],
              });
            }
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              console.log(
                `Transaction completed by ${details.payer.name.given_name}`
              );
              console.log("Transaction Details:", details);
              if(details.status == "COMPLETED"){
                buyCredits();
              }
            });
          },
          onError: (err) => {
            console.error("PayPal Checkout Error", err);
          },
        })
        .render(paypalRef.current);
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
    //   document.body.removeChild(script);
    };
  }, [totalPrice, buyCredits]);

  return <div ref={paypalRef}></div>;
};

export default PayPalButton;
