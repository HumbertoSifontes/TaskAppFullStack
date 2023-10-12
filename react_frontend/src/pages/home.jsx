import React from 'react'
import ButtonHome from '../components/button_home'
import { DefaultPlayer as Video } from 'react-html5video'
import VideoApp from '../video/videoapp.mp4'


const Inicio = () => {
  return (
    <div className="container-fluid homepage">
      <div className="row m-0">
        <div className="col-md-12 p-0 pt-4 pb-4 homevideo">
              <p className='hometext'>Particpantes: <hr /> 
               Humberto Sifontes <hr />
               Mateo Saldías <hr /> 
               De Bernardi Constanza <hr /> 
               Micaela Pérez</p>
              <Video width={600} height={400} autoPlay loop>
                <source src={VideoApp} type='video/mp4'/>
              </Video>
              <ButtonHome/>
        </div>
      </div>
    </div>
    
  )
}

export default Inicio