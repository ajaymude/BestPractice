// 1 to find if the value is existed or not in a array

const products = await Product.find({ _id: { $in: req.user.cartItems } });