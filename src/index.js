import express from "express";

const server = express();


const PORT = 4000;
server.listen(PORT, () => {console.log(`Server online at port ${PORT}`)});