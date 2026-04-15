const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// TEST route (important for checking)
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

const razorpay = new Razorpay({
  key_id: "rzp_live_SdrFsfK0urHabE",
  key_secret: "6JV8y0lnJrOt7MatnLKBVugh",
});

app.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR"
    });

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating order");
  }
});

// 🔥 THIS LINE MUST BE THERE
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});

