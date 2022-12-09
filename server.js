const http = require('http');
const app = require('./app');
const debug = require("debug")("anode-angular")

const normalizePort = val =>{

  var port = parseInt(val,10);

  if(isNaN(port))
  {
    return val;
  }
  if(port>=0)
  {
    return port;
  }
  return port;
}


const onError = error =>{

  if(error.svscall != "listen"){
    throw error;
  }

  const bind = typeof addr === "string" ? "pipe"+addr: "port"+port;

  switch(error.code){
    case "EACCES":
      console.error(bind+"requires elevated privilages");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind+"is already in use ");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening =()=>{
  const addr= server.address();
  const bind = typeof addr === "string" ? "pipe"+addr: "port"+port;
  debug("Listening on"+bind);
}

const PORT =process.env.port || 3000;

app.set('port',PORT);

const server= http.createServer(app);
server.on("error",onError);
server.on("listening",onListening);
// server.listen(3000);
server.listen(PORT, ()=>{
  console.log('Listening on port ${PORT}')
})
