const http=require("http");
const app=require("./router");

const server=http.createServer(app);

server.listen("8000",()=>console.log("server is running on 8000"))