const {Server} =  require ("socket.io");

const io =  new Server(9090,{
    cors:true,
});


const emailToSocketIdMap = new Map();
const socketIdToEmailMap = new Map();


io.on("connection",(socket)=>{
    socket.on("room:join",data =>{
        const {email,room} = data;
        emailToSocketIdMap.set(email,socket.id);
socketIdToEmailMap.set(socket.id,email);
io.to(room).emit("user:joined",{email,id:socket.id})
socket.join(room);
io.to(socket.id).emit("room:join",data);
    })

    socket.on("call:user",({to,offer})=>{
        io.to(to).emit("incomming:call",{from:socket.id,offer})
    })

    socket.on("call:accepted",({to,ans})=>{
        io.to(to).emit("call:accepted",{from:socket.id,ans})
    })
    socket.on("peer:nego:needed",({to,offer})=>{
        io.to(to).emit("peer:nego:needed",{from:socket.id,offer})
       
    })
    socket.on("peer:nego:done",({to,ans})=>{
        io.to(to).emit("peer:nego:final",{from:socket.id,ans})
    })
})