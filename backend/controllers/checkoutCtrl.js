const stripe = require("stripe")("sk_test_51QRZ3WGMAEaY209OYoHvjh76mpqTdaeIHC7GghoeTrhFH5TdQ3Hf2SUUHIdLwe5x49wclPilehb8KaTgPjsSziWC00rZiSpu7x");

exports.paymentIntent = async (req, res) => {
    const { amount } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount, // Amount in cents
        currency: "usd",
        payment_method_types: ["card"],
      });
  
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}