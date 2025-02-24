import User from "../models/Users.js";

export const saveUserEmail = async (req, res) => {
  const { email, username } = req.body;

  if (!email || !username) {
    return res.status(400).json({ message: "Email and username are required" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json({ message: "Welcome Back!", existingUser });
    }

    const newUser = new User({
      email,
      username,
    });
    await newUser.save();

    res.status(201).json({ message: "Welcome", newUser });
  } catch (error) {
    console.error("Error saving user:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getAllUserDetails = async (req, res) => {
  const username = req.query.username;

  try {
    const user = await User.findOne({ username });
    if (user) {
      res.status(200).json({
        username: user.username,
        cartItems: user.cartItems,
        favorites: user.favorites,
        email: user.email,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const addToCart = async (req, res) => {
  const { username, name, description, price, image, types, quantity } =
    req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingItem = user.cartItems.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cartItems.push({ name, description, price, quantity, image, types });
    }

    await user.save();

    res.status(200).json({ message: "Food added to cart successfully" });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const removeItem = async (req, res) => {
  const { name } = req.params;
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newCartItems = user.cartItems.filter((item) => item.name !== name);

    if (newCartItems.length !== user.cartItems.length) {
      user.cartItems = newCartItems;

      await user.save();
      return res.status(200).json({ message: "Item removed from cart" });
    }

    return res.status(404).json({ message: "Item not found in cart" });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateItemQuantity = async (req, res) => {
  const { name } = req.params;
  const { username, change } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send({ message: "No user Found" });
    }
    const item = user.cartItems.find((item) => item.name === name);

    if (!item) {
      return res.status(404).send({ message: "No item found in user cart" });
    }

    if (item.quantity === 1 && change < 0) {
      res.status(404).json({ message: " item cannot be less than 1" });
    }

    if (item.quantity + change > 0) {
      item.quantity += change;
      await user.save();
      res.status(200).json({ message: "Item quantity updated", item });
    } else {
      res.status(404).json({ message: " item cannot be less than 1" });
    }
  } catch (err) {
    console.error(err);
  }
};

export const toggleFavorite = async (req, res) => {
  const { username, name, description, price, image, types, quantity } =
    req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingItemIndex = user.favorites.findIndex(
      (item) => item.name === name
    );

    if (existingItemIndex !== -1) {
      user.favorites.splice(existingItemIndex, 1);
      await user.save();
      return res.status(200).json({ message: "Food removed from favorites" });
    } else {
      user.favorites.push({
        name,
        description,
        price,
        quantity,
        image,
        types,
      });
      await user.save();
      return res.status(200).json({ message: "Food added to favorites" });
    }
  } catch (error) {
    console.error("Error toggling favorite item:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
