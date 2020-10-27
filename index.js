const http = require("http");
const path = require("path");
const fs = require("fs");
const moment = require("moment");
function getPage(page){
    const filePath = path.join(__dirname,page);
    return fs.readFileSync(filePath)
}
function getFiles(req,res){
    const fileType = path.extname(req.url) || ".html"; // || = or , && = and
    if (fileType === ".html"){
        res.setHeader("Content-Type","Text/html");
        res.writeHead(200);
        if (req.url === "/"){
            res.write(getPage("index.html")); } 
        else {
        res.write(getPage(`${req.url}.html`));
        res.end()};}

    else if (fileType === ".css"){
        res.setHeader("Content-Type","Text/css");
        res.writeHead(200);
        res.write(getPage(req.url));
        res.end();
    }
    else{
        res.writeHead(404);
        res.end();
}}
function getData(url){
    let data;
    if (url === "/apis/users"){
        data = [{name:"Varayut"},{name:"John"}];
    }
    else if (url === "/apis/posts"){
        data = [{title:"A",publishedDate:"a day ago"},
        {title:"B",publishedDate:"5 months ago"}
    ]}
    return data
}
function handleAPIs(req,res){
    let data = getData(req.url);
    if (data){
        res.setHeader("Content-Type","application/json");
        res.write(JSON.stringify(data));
        res.end();
    }
    else {
        res.writeHead(404);
        res.end();
    }
}
http.createServer((req,res)=>{
    if (req.url.startsWith("/apis/")){
        handleAPIs(req,res);
    }
    else {
        getFiles(req,res);
    }
    }).listen(3000);
