const  express = require("express");

const router = express.Router();
const fileuploadController = require("../controller/fileuploadController");
const upload = require("../uploadfiles/uploadfile");

// upload singlefile 
router.post("/singleFile",upload.single('file'),fileuploadController.singleFileUpload);
// get single file data
router.get("/getSingleFile",upload.single('file'),fileuploadController.getSingleFile);
router.delete("deleteSignleFile/:id",upload.single('file'),fileuploadController.deleteSingleFile)
// upload multiple file
router.post("/multipleFile",upload.array('files'),fileuploadController.multipleUploadFile);
// get multiple file data
router.get("/getMultipleFile",upload.single('file'),fileuploadController.getMultipleFile);

module.exports = router;