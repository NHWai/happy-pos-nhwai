import { Request, request } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import s3Storage from "multer-s3";

// Set S3 endpoint to DigitalOcean Spaces
const s3 = new S3Client({
  credentials: {
    accessKeyId: "DO00DPELDPV9CNAZL7N7",
    secretAccessKey: "Rkx+IUc77EpCuilDjSOmEZwijtMPvI0Tjba2iKsWZOI",
  },
  endpoint: "https://sgp1.digitaloceanspaces.com",
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
