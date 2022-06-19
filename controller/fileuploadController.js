
const SingleFile = require("../models/singleFile");
const MultipleFile = require("../models/multiplefile");

const fileuploadController = {
    singleFileUpload:async(req,res, next)=>{
        try{
            const file = new SingleFile({
                fileName: req.file.originalname,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
            });
            await file.save();
            res.status(201).json({
               message: 'File Uploaded Successfully'});

        }catch(err){
            return res.status(500).json({message:err.message});
        }
    },

    // get single file 
    getSingleFile:async(req,res, next)=>{
        try{
          const singleFileData = await SingleFile.find();
          return res.status(200).json({
            message:"Getting Single file successfully",
            data:singleFileData
          })
        }catch(err){
            return res.status(500).json({
               message:err.message
            })
        }

    },

    
    // get single file 
    deleteSingleFile:async(req,res, next)=>{
        try{
            const _id = req.params.id
          const deleteFileData = await SingleFile.findByIdAndDelete(_id,{new:true});
          return res.status(200).json({
            message:"Getting Single file successfully",
            data:deleteFileData
          })
        }catch(err){
            return res.status(500).json({
               message:err.message
            })
        }

    },

    // multiple upload file 
    multipleUploadFile:async(req,res,next)=>{
        try{
            let filesArray = [];
            req.files.forEach(element => {
                const file = {
                    fileName: element.originalname,
                    filePath: element.path,
                    fileType: element.mimetype,
                    fileSize: fileSizeFormatter(element.size, 2)
                }
                filesArray.push(file);
            });
            const multipleFiles = new MultipleFile({
                title: req.body.title,
                files: filesArray 
            });
            await multipleFiles.save();
            res.status(201).send('Files Uploaded Successfully');
        }catch(err){
           return res.status(500).json({
               message:err.message
           });
        }
    },

    // get single file 
    // get single file 
    getMultipleFile:async(req,res, next)=>{
        try{
          const multipleFileData = await MultipleFile.find();
          return res.status(200).json({
            message:"Getting Multiple file  data successfully",
            data:multipleFileData
          })
      
        }catch(err){
            return res.status(500).json({
               message:err.message
            })
        }

    },
}
const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

module.exports = fileuploadController;