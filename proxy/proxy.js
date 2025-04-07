import http from "http";
import httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer({});

http.createServer((req, res) => {
  const host = req.headers.host;

  if (host === "kodim.localhost") {
    proxy.web(req, res, { target: "http://127.0.0.1:8080" });
  } else if (host === "backoffice.kodim.localhost") {
    proxy.web(req, res, { target: "http://127.0.0.1:8055" });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Domain not found");
  }
}).listen(80, () => {
  console.log("Proxy server running on port 80...");
});
