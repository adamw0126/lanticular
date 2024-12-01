import React from 'react'
import { Animation, Visibility, Undo, Redo } from '@mui/icons-material'

function DepthMapLeftSection() {
  const user = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <div className="image-container">
      <img
        src={user.filePath ? user.filePath : ""}
        alt="Display"
        className="fuly-image"
      />
      <div style={{width: '40%', display: 'flex', justifyContent: 'space-evenly', position: 'absolute', bottom: '30px', left: '20vw'}}>
        <button className='btn-enabled'><Animation/>Overlay</button>
        <button className='btn-enabled'><Visibility/>Preview</button>
        <button className='btn-enabled' style={{width: '40px', height: '40px'}}><Undo/></button>
        <button className='btn-disabled' style={{width: '40px', height: '40px'}}><Redo/></button>
      </div>
    </div>
  )
}

export default DepthMapLeftSection