import React, { useState } from 'react'
import { Colorize, Gavel, FileUpload, Refresh } from '@mui/icons-material'
import { Slider } from '@mui/material'

function DepthMapRightSidebar() {

  const [isSavable, setIsSavable] = useState(false);

  return (
    <div className='sidebar-container' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <div className="tab" style={{ color: "rgb(175, 175, 182)", fontSize: '22px', borderBottom: '1px solid gray', width: '100%', padding: '20px' }}>Depth Map Brush</div>
      <div style={{borderBottom: '1px solid gray', paddingBottom: '20px'}}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
          <div style={{ width: '50%' }}>Depth</div>
          <div style={{ display: 'flex', width: '50%', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: 'rgb(128, 128, 128)', borderRadius: '4px' }}></div>
            <div><Colorize /></div>
            <div><Gavel /></div>
          </div>
        </div>
            <Slider
              defaultValue={0}
              valueLabelDisplay="auto"
              shiftStep={0.01}
              step={0.01}
              marks={[{ value: 0 }]}
              min={-1}
              max={1}
            />
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px'}}>
              <span>Far(black)</span>
              <span>Near(white)</span>
            </div>
      </div>
      <div style={{borderBottom: '1px solid gray', paddingBottom: '20px'}}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
          <div style={{ width: '50%' }}>Size</div>
        </div>
            <Slider
              aria-label="Temperature"
              defaultValue={0}
              valueLabelDisplay="auto"
              shiftStep={0.01}
              step={0.01}
              marks={[{ value: 0 }]}
              min={-1}
              max={1}
            />
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px'}}>
              <span>Small</span>
              <span>Large</span>
            </div>
      </div>
      <div style={{borderBottom: '1px solid gray', paddingBottom: '20px'}}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
          <div style={{ width: '50%' }}>Hardness</div>
        </div>
            <Slider
              aria-label="Temperature"
              defaultValue={0}
              valueLabelDisplay="auto"
              shiftStep={0.01}
              step={0.01}
              marks={[{ value: 0 }]}
              min={-1}
              max={1}
            />
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px'}}>
              <span>Soft</span>
              <span>Hard</span>
            </div>
      </div>
      <div style={{borderBottom: '1px solid gray', paddingBottom: '20px'}}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
          <div style={{ width: '50%' }}>Opacity</div>
        </div>
            <Slider
              aria-label="Temperature"
              defaultValue={0}
              valueLabelDisplay="auto"
              shiftStep={0.01}
              step={0.01}
              marks={[{ value: 0 }]}
              min={-1}
              max={1}
            />
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px'}}>
              <span>0</span>
              <span>100</span>
            </div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px',borderBottom: '1px solid gray', paddingBottom: '20px' }}>
        <span>Replace Depth Map</span>
        <span><FileUpload/></span>
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px',borderBottom: '1px solid gray', paddingBottom: '20px' }}>
        <span>Restore Depth Map</span>
        <span><Refresh/></span>
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', justifySelf: 'flex-end', width: '100%', gap: '24px', bottom: '0px', marginTop: '80px', borderTop: '1px solid gray', paddingTop: '20px'}}>
        <button className='btn-enabled'>Discard</button>
        <button className={isSavable ? 'btn-enabled' : 'btn-disabled'}>Save</button>
      </div>
    </div>
  )
}

export default DepthMapRightSidebar