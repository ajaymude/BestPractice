


// how to host frontend and backend together 
// frontend and backend are at same level

import express from "express";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});





// package.json 

// {
// 	"name": "mern-crash-course",
// 	"version": "1.0.0",
// 	"description": "",
// 	"main": "index.js",
// 	"scripts": {
// 		"dev": "NODE_ENV=development nodemon backend/server.js",
// 		"build": "npm install && npm install --prefix frontend && npm run build --prefix frontend",
// 		"start": "NODE_ENV=production node backend/server.js"
// 	},
// 	"type": "module",
// 	"keywords": [],
// 	"author": "",
// 	"license": "ISC",
// 	"dependencies": {
// 		"dotenv": "^16.4.5",
// 		"express": "^4.19.2",
// 		"mongoose": "^8.5.1"
// 	},
// 	"devDependencies": {
// 		"nodemon": "^3.1.4"
// 	}
// }