const multer=require("multer");

// define storage

//diskStorage store images on hard disk not data base
const storage=multer.diskStorage({
    // define destination
    destination:(req,file,callback)=>{
    //   console.log(path.join(__dirname,"public/Images"))
    //   cb(null,path.join(__dirname,"public/Images"))  
    callback(null,"./uploads")
    },

    filename:(req,file,callback)=>{
        // callback(null,Date.now() + '-' + Math.round(Math.random() * 1E9)+"-"+file.originalname)
        callback(null,Date.now()+file.originalname);
    },
  });
  const upload=multer({
    storage:storage,
    limits:{
        fieldSize:1024 *1024*3,
    },
  });
  

module.exports =upload;
