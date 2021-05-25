const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderListRoutes = require("./routes/orderListRoutes");
const biodataRoutes = require("./routes/biodataRoutes");
const artikelRoutes = require("./routes/artikelRoutes");
const tokoRoutes = require("./routes/tokoRoutes");
const commentRoutes = require("./routes/commentRoutes");
const threadsRoutes = require("./routes/threadsRoutes");
const User = require("./models/User");
const Biodata = require("./models/Biodata")
const Cart = require("./models/Cart");
const Product = require("./models/Product");
const Toko = require("./models/Toko");
const Comment = require("./models/Comment");
const Threads = require("./models/Threads");

const app = express();
const port = process.env.PORT || 5000;

// relation
Product.hasMany(Cart, {
  foreignKey: "id_barang",
});
Cart.belongsTo(Product, {
  foreignKey: "id_barang",
});
Toko.hasMany(Product, {
  foreignKey: "id_toko"
})
Product.belongsTo(Toko, {
  foreignKey: "id_toko",
});
Threads.hasMany(Comment, {
  foreignKey: "id_threads"
});
Comment.belongsTo(Threads, {
  foreignKey: "id_threads"
});
User.hasMany(Cart, {
  foreignKey: "id_user",
});
Cart.belongsTo(User, {
  foreignKey: "id_user",
})
User.hasOne(Biodata, {
  foreignKey: "id_user",
})
Biodata.belongsTo(User, {
  foreignKey: "id_user",
})

// middleware
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use('/uploads/foto_barang', express.static(path.join(__dirname, '/uploads/foto_barang')));
app.use('/uploads/profile_pict', express.static(path.join(__dirname, '/uploads/profile_pict')));
app.use('/uploads/foto_toko', express.static(path.join(__dirname, '/uploads/foto_toko')));
app.use('/uploads/foto_threads', express.static(path.join(__dirname, '/uploads/foto_threads')));
app.use('/uploads/foto_artikel', express.static(path.join(__dirname, '/uploads/foto_artikel')));
// view engine
app.set("view engine", "ejs");

app.listen(port, () => {
  console.log("Listening to port 5000");
});

// routes
app.get('/', (req, res) => {
  res.status(200).json({
      status: 200,
      success: true,
      data: 'Tanamart API is Already Running...'
  });
});


app.use(authRoutes);
app.use(productRoutes);
app.use(orderListRoutes);
app.use(cartRoutes);
app.use(biodataRoutes);
app.use(artikelRoutes);
app.use(tokoRoutes);
app.use(commentRoutes);
app.use(threadsRoutes);
