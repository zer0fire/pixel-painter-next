import express from "express";
import http from "http";
import { Server } from "socket.io";
import Jimp from "jimp";
import fs from "fs";
import path from "path";

// app.use(express.static(path.join(__dirname, "../fe/build")));

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

export async function startServer() {
  // console.log(path.join(process.cwd(), "/src/utils/23333.png"));
  const pixelData = await Jimp.read(
    path.join(process.cwd(), "/src/utils/23333.png")
  ); // new Jimp.create(20, 20, 0xffff00ff)
  let onlineCount = 0;
  let bufDataAry: any[] = [];
  // console.log("------------", pixelData)
  io.on("connection", async (socket: any) => {
    onlineCount++;

    io.emit("online-count", onlineCount);
    // socket.broadcast.emit('online-count', onlineCount)
    // socket.emit('online-count', onlineCount)

    var pngBuffer = await pixelData.getBufferAsync(Jimp.MIME_PNG);

    socket.emit("initial-pixel-data", pngBuffer);

    socket.on(
      "draw-dot",
      async ({
        row,
        col,
        color,
      }: {
        row: number;
        col: number;
        color: string;
      }) => {
        var hexColor = Jimp.cssColorToHex(color);

        pixelData.setPixelColor(hexColor, col, row); // [col][row] = color

        io.emit("update-dot", {
          row,
          col,
          color,
        });
        // socket.broadcast.emit('update-dot', {row, col, color})
        // socket.emit('update-dot', {row, col, color})

        var buf = await pixelData.getBufferAsync(Jimp.MIME_PNG);
        bufDataAry.push(buf);
        if (bufDataAry.length > 4) {
          for (var item of bufDataAry) {
            fs.writeFile("./23333.png", item, (err: Error | null) => {
              if (err) {
                console.error(err);
              } else {
                console.info("save data success!");
              }
            });
          }
        }
      }
    );

    socket.on("disconnect", () => {
      onlineCount--;
      console.info("some one leave");
    });
  });
}

server.listen(3001, () => {
  console.info("listening on *:3001");
});
