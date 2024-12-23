const express = require('express');
const router = express.Router();

const { demoUpload, demoUploadFiles} = require('../controllers/upload.controller');

// POST route for file upload
//router.post('/upload', upload.single('file'), uploadFile); //to upload single 'file' at a time
router.post('/demo_upload', demoUpload.array('files', 10), demoUploadFiles); // to upload multiple 'files' at a time

//router.post('/upload_documents', documentUpload.single('tenth','twelfth','d_licence','d_certificate','aadhar','pan'), documentUploadFiles);

module.exports = router;
