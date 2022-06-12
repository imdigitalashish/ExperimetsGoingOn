const { createServer } = require("http");
let server = createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(JSON.stringify({name: "ashish"}));
    response.end();
});
server.listen(8000);
console.log("Listening! (port 8000)");
