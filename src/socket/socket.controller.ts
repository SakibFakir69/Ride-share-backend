

import { io } from "../server";




// socket initilaization


io.on("connection",(socket)=>{


    if(socket){
        console.log("socket conncted");
    }






      socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });

})