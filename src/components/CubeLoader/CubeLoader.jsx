import React from 'react'
import './CubeLoader.css'

const CubeLoader = () => {
  return (
    <div className='container-loader'>
      <div
        className='cube'
      >
        <div className='top'></div>
        <div>
          <span style={{"--i" : 0}}></span>
          <span style={{"--i" : 1}}></span>
          <span style={{"--i" : 2}}></span>
          <span style={{"--i" : 3}}></span>
        </div>
      </div>
    </div>
  )
}

export default CubeLoader