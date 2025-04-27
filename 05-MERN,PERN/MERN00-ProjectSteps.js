

// first the  setup the backend and then the frontend


// 1. Setup the backend with Express and MongoDB



// db connection 

mongoose
  .connect("db_url")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));




// cors setup 
const cors = require("cors");   
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));


// cookier parser setup
const cookieParser = require("cookie-parser");
app.use(cookieParser());    
















// uploading files setup 

// const cloudinary = require("cloudinary").v2;
// const multer = require("multer");

// cloudinary.config({
//   cloud_name: "",
//   api_key: "",
//   api_secret: "",
// });

// const storage = new multer.memoryStorage();

// async function imageUploadUtil(file) {
//   const result = await cloudinary.uploader.upload(file, {
//     resource_type: "auto",
//   });

//   return result;
// }

// const upload = multer({ storage });

// module.exports = { upload, imageUploadUtil };


// route setup 
// const { upload } = require("../../helpers/cloudinary");
// router.post("/upload-image", upload.single("my_file"), handleImageUpload);



// const { imageUploadUtil } = require("../../helpers/cloudinary");


// const handleImageUpload = async (req, res) => {
//   try {
//     const b64 = Buffer.from(req.file.buffer).toString("base64");
//     const url = "data:" + req.file.mimetype + ";base64," + b64;
//     const result = await imageUploadUtil(url);

//     res.json({
//       success: true,
//       result,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: "Error occured",
//     });
//   }
// };