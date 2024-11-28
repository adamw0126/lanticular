// src/components/LeftSection.jsx
import React from "react";
let gv = require('./config');

const LeftSection = ({ isMotion, isDepth, isAnagl }) => {
  const user = JSON.parse(localStorage.getItem('userInfo'));

  console.log('gv.anaglUrl', gv.anaglUrl)
  return (
    <div className="image-container">
      {
        isMotion ?
          <>
            <div id="depth-viewer" style={{display: `${isDepth ? 'block' : 'none'}`}}></div>
            <img
              src={isAnagl ? gv.anaglUrl : gv.depthURL}
              alt="depthmap"
              className="fuly-image"
              width={gv.canvasWidth}
              height={gv.canvasHeight}
              style={{display: `${isDepth ? 'none' : 'block'}`}}
            />
          </>
          :
          <img
            src={user.filePath ? user.filePath : ""}
            alt="IMAGE"
            className="fuly-image"
          />
      }
    </div>
  );
};

export default LeftSection;
