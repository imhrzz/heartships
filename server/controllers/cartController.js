import Cart from "../models/Cart.js";
import Gift from "../models/Gift.js";

// 🛒 Add item to cart
export const addToCart = async (req, res) => {
  const { userId, giftId, quantity } = req.body;

  try {
    const gift = await Gift.findById(giftId);
    if (!gift) return res.status(404).json({ error: "Gift not found" });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ gift: giftId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex((item) =>
        item.gift.toString() === giftId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ gift: giftId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

// 📦 Get all cart items for a user
export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.gift");
    if (!cart) return res.status(404).json({ message: "Cart is empty" });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

// ❌ Remove an item from cart
export const removeFromCart = async (req, res) => {
  const { userId, giftId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.gift.toString() !== giftId
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item" });
  }
};

// 🧹 Clear entire cart
export const clearCart = async (req, res) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOneAndDelete({ userId });
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to clear cart" });
  }
};
