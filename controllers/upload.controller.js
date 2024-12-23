const cloudinaryConnect = require('../config/cloudinary.config.js');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Multer with Cloudinary Storage 
const demoStorage = new CloudinaryStorage({
  cloudinary: cloudinaryConnect,
  params: {
    folder: 'demouploads', //Cloudinary folder name
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf', 'gif', 'mp4'], // Allowed file types
    resource_type: 'auto',
  },
});

// Configure Multer with Cloudinary Storage 
// const documentStorage = new CloudinaryStorage({
//   cloudinary: cloudinaryConnect,
//   params: {
//     folder: 'imageuploads', //Cloudinary folder name
//     allowed_formats: ['jpg', 'png', 'jpeg', 'pdf', 'gif', 'mp4'], // Allowed file types
//     resource_type: 'auto',
//   },
// });

const demoUpload = multer({ storage: demoStorage });

//const documentUpload = multer({ documentStorage });

//Controller for handling file upload
const demoUploadFiles = async (req, res) => {
  try {
    // File uploaded successfully by Multer middleware
    //const file = req.file; //for single 'file'
    const files = req.files; //for multiple 'files'
    console.log("files: ",req.files);
    
    /*if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }*/

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    //added here for multiple files
    // Map through uploaded files to get their Cloudinary URLs
    const fileUrls = files.map((file) => ({
        fileName: file.originalname,
        fileUrl: file.path, // Cloudinary file URL 
      }));

      console.log(fileUrls);
      
    res.status(200).json({
      message: 'File uploaded successfully',
      //fileUrl: files.path, // Cloudinary 1file URL
      UploadedfileUrls: fileUrls, // Cloudinary multiple files URL

    });
  } catch (error) {
    console.error('Error uploading file:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

//Controller for handling file upload
// const documentUploadFiles = async (req, res) => {
//   try {
//     // File uploaded successfully by Multer middleware
//     //const file = req.file; //for single 'file'
//     const tenth = req.tenth; //for multiple 'files'
//     const twelfth = req.twelfth;
//     const d_licence = req.d_licence;
//     const d_certificate = req.d_certificate;
//     const aadhar = req.aadhar;
//     const pan = req.pan; //for multiple 'files'
//     //console.log("files: ",req.files);
    
//     //validation all documents must present
//     if (!tenth || !twelfth || !d_licence || !d_certificate || !aadhar ||!pan ) {
//       return res.status(400).json({ message: 'Document not uploaded' });
//     }
      
//     res.status(200).json({
//       message: 'All File uploaded successfully',
//       TenthDocumentName :  tenth.originalname,
//       TenthDocumentUrl : tenth.path,
//       twelfthDocumentName :  twelfth.originalname,
//       twelfthDocumentUrl : twelfth.path,
//       d_licenceDocumentName :  d_licence.originalname,
//       d_licenceDocumentUrl : d_licence.path,
//       d_certificateDocumentName :  d_certificate.originalname,
//       d_certificateDocumentUrl : d_certificate.path,
//       aadharDocumentName :  aadhar.originalname,
//       aadharDocumentUrl : aadhar.path,
//       panDocumentName :  pan.originalname,
//       panDocumentUrl : pan.path // Cloudinary 1file URL
//       //UploadedfileUrls: fileUrls, // Cloudinary multiple files URL

//     });
//   } catch (error) {
//     console.error('Error uploading file:', error.message);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// };

module.exports = { demoUpload, demoUploadFiles};
