const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const app = express();

// configure the AWS SDK with your S3 bucket's region and access key
AWS.config.update({
  region: 'ap-southeast-1',
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECREAT_KEY,
});

// create an S3 client
const s3 = new AWS.S3();

// configure multer for file uploads
const uploadResume = multer({
  storage: multerS3({
    s3: s3,
    bucket: (request, file, cb) => {
      cb(process.env.BUCKET_NAME + '/' + request.decoded.id + '/resume/');
    },
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, {
        fieldName: file.fieldname,
      });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + file.originalname);
    },
  }),
});

const uploadVideo = multer({
  storage: multerS3({
    s3: s3,
    bucket: (request, file, cb) => {
      cb(process.env.BUCKET_NAME + '/' + request.decoded.id + '/video/');
    },
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, {
        fieldName: file.fieldname,
      });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + file.originalname);
    },
  }),
});

module.exports = { uploadResume, uploadVideo };
