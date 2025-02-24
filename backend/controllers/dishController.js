import dishSchema from "./../models/Dish.js";

export const getDishes = async (req, res) => {
  try {
    const dishes = await dishSchema.find();
    if (dishes.length === 0) {
      return res.status(404).json({ message: "No dishes found" });
    }
    res.status(200).json({ dishes });
  } catch (error) {
    console.error("Error retrieving dishes:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
