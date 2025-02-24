import OrderSchema from "../models/Order.js";
import User from "../models/Users.js";

export const submitOrder = async (req, res) => {
  const { userOrder } = req.body;

  try {
    const order = new OrderSchema({
      orderDetails: userOrder,
    });
    await order.save();

    const user = await User.findOne({ username: userOrder.fullN });

    if (user) {
      user.cartItems = [];
      await user.save();
    }
    res.status(200).json({ message: "Order Submitted" });
  } catch (error) {
    console.error("Error placing order:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getOrderDetails = async (req, res) => {
  const { username } = req.params;

  try {
    const orders = await OrderSchema.find({ "orderDetails.fullN": username });
    const orderDetails = orders.map((order) => order.orderDetails);

    const orderCount = {};

    orders.forEach((order) => {
      order.orderDetails.forEach((detail) => {
        detail.cartItems.forEach((item) => {
          // if item already exists in orderCount, increment count
          if (orderCount[item.name]) {
            orderCount[item.name].count += item.quantity;
          } else {
            orderCount[item.name] = { name: item.name, count: item.quantity };
          }
        });
      });
    });

    // Sort items by quantity from highest to lowest
    const mostFrequentOrder = Object.values(orderCount).sort(
      (a, b) => b.count - a.count
    );

    res.status(200).json({ mostFrequentOrder, orderDetails });
  } catch (error) {
    console.error("Error getting order details:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
