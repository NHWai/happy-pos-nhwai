import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";

dotenv.config();

// Set S3 endpoint to DigitalOcean Spaces
const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID as string,
    secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
  },
  endpoint: process.env.DG_ENDPOINT,
  region: "sgp1",
});

//set upload func
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "msquarefdc",
    acl: "public-read",
    key: function (request, file, cb) {
      cb(null, `happy-pos/nhwai/${Date.now()}_${file.originalname}`);
    },
  }),
}).array("menuImg", 1);

export default upload;
