// 1 to find if the value is existed or not in a array

const products = await Product.find({ _id: { $in: req.user.cartItems } });

// 2
// add quantity for each product
const cartItems = products.map((product) => {
  const item = req.user.cartItems.find(
    (cartItem) => cartItem.id === product.id
  );
  return { ...product.toJSON(), quantity: item.quantity };
});

// 3 to check if a product is existed or not in the cart
const existingItem = user.cartItems.find((item) => item.id === productId);
if (existingItem) {
  existingItem.quantity += 1;
} else {
  user.cartItems.push(productId);
}

// 4 remove item from the cart
if (!productId) {
  user.cartItems = [];
} else {
  user.cartItems = user.cartItems.filter((item) => item.id !== productId);
}

// 5 check item is existed or not in the cart its for update the product quantity
const existingItem = user.cartItems.find((item) => item.id === productId);

if (existingItem) {
  if (quantity === 0) {
    user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    await user.save();
    return res.json(user.cartItems);
  }

  existingItem.quantity = quantity;
  await user.save();
  res.json(user.cartItems);
} else {
  res.status(404).json({ message: "Product not found" });
}

// 6    if coupon is expired
if (coupon.expirationDate < new Date()) {
  coupon.isActive = false;
  await coupon.save();
  return res.status(404).json({ message: "Coupon expired" });
}

// 7 lean method of javascript
featuredProducts = await Product.find({ isFeatured: true }).lean();

// 8 toggle the product status
const product = await Product.findById(req.params.id);
if (product) {
  product.isFeatured = !product.isFeatured;
  const updatedProduct = await product.save();
  await updateFeaturedProductsCache();
  res.json(updatedProduct);
} else {
  res.status(404).json({ message: "Product not found" });
}

// 8 