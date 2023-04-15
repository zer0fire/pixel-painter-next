import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";
import PixelGrid from "./component/PixelGrid/index";
import ColorSelect from "./component/ColorSelect/index";
import OnlineCount from "./component/OnlineCount/index";
import _ from "lodash";
// import { produce } from "immer";

/**
 * 放大、拖拽、取色、限制频率、人数、页面内实时聊天
 * 批量更新而不是单点更新
 * PureComponent
 * Hooks
 * ReactDOM.createPortal
 * socket.io
 * canvas
 * Jimp
 * ArrayBuffer to image
 */
const socket = io("http://localhost:3001");

function App() {
  const [pixelData] = useState([]);
  const [currentColor, setColor] = useState("#ff0000");

  const handlePixelClick = (row: number, col: number) => {};

  const changeCurrentColor = (color: any) => {
    // console.log(color)
    setColor(() => color);
  };

  // console.log(this.state.pixelData)
  return (
    <div>
      {/* <h1>pixel data</h1> */}
      <PixelGrid
        onPickColor={changeCurrentColor}
        width={200}
        height={200}
        currentColor={currentColor}
        onPixelClick={handlePixelClick}
        socket={socket}
      ></PixelGrid>
      <ColorSelect
        onChange={changeCurrentColor}
        color={currentColor}
      ></ColorSelect>
      <OnlineCount socket={socket}></OnlineCount>
      <span id="color-pick-placeholder"></span>
    </div>
  );
}

export default App;
