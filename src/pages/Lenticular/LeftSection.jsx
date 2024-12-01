import React, { useEffect, useRef } from "react";
require('../DepthyDrawer'); // Ensure the DepthyDrawer class is loaded globally
let gv = require('./config');

const LeftSection = ({ isMotion, isDepth, isAnagl }) => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isDepth && isMotion && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = isAnagl ? gv.anaglUrl : gv.depthURL;
      img.onload = () => {
        canvas.width = gv.canvasWidth;
        canvas.height = gv.canvasHeight;
        ctx.drawImage(img, 0, 0, gv.canvasWidth, gv.canvasHeight);

        // Initialize DepthyDrawer after the image is loaded
        gv.drawer = new window.DepthyDrawer(canvas);

        // Optionally, set initial brush options
        gv.drawer.setOptions({
          depth: 0.5,
          size: 20,
          hardness: 0.5,
          opacity: 1.0,
        });
      };
    }
  }, [isMotion, isDepth, isAnagl]);

  const handleCanvasClick = () => {
    return;
  };

  return (
    <div className="image-container">
      {isMotion ? (
        <>
          <div
            id="depth-viewer"
            style={{ display: `${isDepth ? "block" : "none"}` }}
          ></div>
          <canvas
            id="depth_edit"
            ref={canvasRef}
            style={{ display: `${isDepth ? "none" : "block"}` }}
            onClick={handleCanvasClick}
          ></canvas>
        </>
      ) : (
        <img
          src={user.filePath ? user.filePath : ""}
          alt="IMAGE"
          className="fuly-image"
        />
      )}
    </div>
  );
};

export default LeftSection;
