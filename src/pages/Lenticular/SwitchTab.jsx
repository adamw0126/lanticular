import React, { useState } from 'react'

function SwitchTab({setIsMotion, isMotion}) {

  return (
    <div style={{
        backgroundColor: 'rgb(34, 34, 53)',
        border: 'none',
        borderRadius: '28px',
        height: '44px',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingLeft: '10px',
        paddingRight: '10px',
    }}>
        <button className={isMotion ? 'tab-btn-selected' : ''} style={{width: '50%', transition: 'color 0.3s'}} onClick={()=>setIsMotion(true)}>3D Motion</button>
        <button className={!isMotion ? 'tab-btn-selected' : ''} style={{width: '50%', transition: 'color 0.3s'}} onClick={()=>setIsMotion(false)}>3D Image</button>
    </div>
  )
}

export default SwitchTab;