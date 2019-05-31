const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();

app.set('view-engine','ejs');
app.use(express.static("./uploads"));

const upload = multer({
    dest: "C:\\Users\\iiitmk\\Desktop\\test\\galleryApp\\uploads",
})

app.get("/",function(request,response){
    
    fs.readdir("C:\\Users\\iiitmk\\Desktop\\test\\galleryApp\\uploads",function(error,files){
        
        response.render('gallery.ejs',{
            images:files,
        })
    })
})



app.get("/upload",function(request,response){
    
    response.render("upload.ejs");
})


app.post("/upload",upload.single("image"),function(request,response){
    
    fileName = request.file.originalname;

    if(path.extname(fileName).toLowerCase() == ".jpg"){
        fileNameWithExtension = request.file.path + ".jpg";
        console.log(fileNameWithExtension)
        fs.rename(request.file.path,fileNameWithExtension,function(error){
            if(error){
                return console.error;
            }
            else
                response.status(200).send("<b>Photo successfully uploaded!</b><br><a href='/'>Go home<a>")
        })
    }
    else{
        response.status(415).send("<b>Unsupported media type! Only .jpg files are allowed.</b><br><a href='/'>Go home<a>")
        
    }
    
})

app.listen(4000,function(error){
    if(error)
        console.error;
    console.log("Listening at: http://localhost:4000/")
})