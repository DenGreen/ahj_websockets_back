const http = require("http");
const Koa = require("koa");
const WS = require("ws");
const router = require("./routes");
const koaBody = require("koa-body");
const app = new Koa();
const subscriptions = require("./db/subscriptions");

app.use(
  koaBody({
    json: true,
  })
);

app.use(async (ctx, next) => {
  const origin = ctx.request.get("Origin");
  if (!origin) {
    return await next();
  }

  const headers = { "Access-Control-Allow-Origin": "*" };

  if (ctx.request.method !== "OPTIONS") {
    ctx.response.set({ ...headers });
    try {
      return await next();
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
      throw e;
    }
  }

  if (ctx.request.get("Access-Control-Request-Method")) {
    ctx.response.set({
      ...headers,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
    });

    if (ctx.request.get("Access-Control-Request-Headers")) {
      ctx.response.set(
        "Access-Control-Allow-Headers",
        ctx.request.get("Access-Control-Request-Headers")
      );
    }

    ctx.response.status = 204;
  }
});

app.use(router());

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());

const wsServer = new WS.Server({
  server,
});

wsServer.on("connection", (ws, req) => {
  const ip = req.socket.remoteAddress;
  ws.on("message", (e) => {
    const { method, data } = JSON.parse(e);
    switch (method) {
      case "massedgeAdd":
        Array.from(wsServer.clients)
          .filter((client) => client.readyState === WS.OPEN)
          .forEach((client) =>
            client.send(
              JSON.stringify({
                method: method,
                objData: [subscriptions.addMesseges(data)],
              })
            )
          );
        return;
      case "nicnameAdd":
        console.log('open  ' + ip);
        subscriptions.add(data, ip);
        console.log(subscriptions.receiveNicname())
        return;
      case "nicnameReceive":
        Array.from(wsServer.clients)
          .filter((client) => client.readyState === WS.OPEN)
          .forEach((client) =>
            client.send(
              JSON.stringify({
                method: method,
                objData: subscriptions.receiveNicname(),
              })
            )
          );
        return;
    }
  });

  ws.on("close", (e) => {
    const res = subscriptions.remove(ip);

    console.log('close  ' + ip);
    Array.from(wsServer.clients)
      .filter((client) => client.readyState === WS.OPEN)
      .forEach((client) =>
        client.send(
          JSON.stringify({
            method: "delete",
            objData: res,
          })
        )
      );

    subscriptions.deleteMessege();
  });
});

server.listen(port, () => {
  console.log(`Server ready and listening on ${port}`);
});
