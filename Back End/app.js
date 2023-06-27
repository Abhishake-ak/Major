const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer")
const url =
  "mongodb+srv://abhishake_123:abhishake123@major.hxezwtf.mongodb.net/?retryWrites=true&w=majority";

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}))

const port = process.env.PORT || 5000;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

// multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb){
    return cb(null, '../Front End/front/public/upload')
  }, 

  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`)
  }
});

const upload = multer({storage})


// schemas
const comment = mongoose.Schema(
  {
    userID: String,
    subject: String,
    commentDes: String,
  },
  {
    timestamps: true,
  }
);

const commentDetials = mongoose.model("Comment", comment);

const Schema = mongoose.Schema(
  {
    name1: String,
    name2: String,
    name3: String,
    roll1: String,
    roll2: String,
    roll3: String,
    tittle: String,
    description: String,
    file: Object,
  },
  {
    timestamps: true,
  }
);

const detailsModel = mongoose.model("Details", Schema);


/// api creation
app.get("/names", async (req, res) => {
  await detailsModel
    .find({}, { name1: 1, name2: 2, name3: 3, _id: 1 })
    .then((ans) => {
      console.log(ans);
      res.send(ans);
    });
});

app.post("/details", upload.single('file'), async (req, res) => {
  console.log("file: ",req.file);
  const data = await new detailsModel({
    name1: req.body.name1,
    name2: req.body.name2,
    name3: req.body.name3,
    roll1: req.body.roll1,
    roll2: req.body.roll2,
    roll3: req.body.roll3,
    tittle: req.body.tittle,
    description: req.body.description,
    file: {
      filename: req.file.filename,
      path: req.file.path
    }
  });

  await data.save();

  res.status(200).send("file uploaded successfully");
});

app.get("/:name", async (req, res) => {
  const q = req.params.name;
  await detailsModel.findOne({ name1: q }).then((ans) => {
    console.log(ans);
    res.send(ans);
  });
});

app.post("/comment", async (req, res) => {
  const { userID, subject, commentDes } = req.body;
  // console.log(userID,subject,commentDes);
  try {
    
    const userdata = await detailsModel.findById(userID);
  if (!userdata) {
    return res.status(403).send("App crashed");
  }
  // console.log("printing Userdata",userdata);

    if (userdata) {
      const commentData = new commentDetials({
        userID: userID,
        subject: subject,
        commentDes: commentDes,
      });
     await commentData.save();
     return res.status(200).json(commentData);
    } else {
     return res.status(401).send("User Not found");
    }
  } catch (err) {
    console.log(err);
   return res.status(500).send("Internal server error");
  }
});

app.get("/commentsData/:id", async (req, res) => {
  console.log(req.params.id);
  await commentDetials.find({ userID: req.params.id }).then((response) => {
    // console.log(response);
    res.status(200).send(response);
  });
});

app.listen(port, () => {
  console.log("Server is running");
});
