import React from 'react'
import {Layout, Button} from '@q4/nimbus-ui';  

import './../../App.css';
import socketIOClient from "socket.io-client"


//establish connection for stream to encoded on server-side using FFMPEG
const socket = socketIOClient("ws://localhost:4000") //path to encoding server

 


class BroadcastCanvas extends React.Component {
    constructor(props) {
      super(props);
      this.paint = this.paint.bind(this);
      this.state = {
          broadcasting:false
      }
    }
  
    componentDidUpdate() {
      this.paint();
    }

   
  //using the canvas element as the main broadcasting stage and adding some animation so latency can stand out easily
    paint() {
      const { width, height, rotation } = this.props;
      let date = new Date();

      const context = this.refs.canvas.getContext("2d");
        context.fillStyle = "white";
        context.fillRect(0, 0, width,height);   
        context.clearRect(0, 0, width, height); 
        context.save();
        context.font = '30px sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle'; 
        context.fillText("Zalmy Test "+date.toISOString(), this.refs.canvas.width/2, this.refs.canvas.height/2);
        context.strokeStyle='#000';
        context.translate(100, 100);
        context.rotate(rotation, 100, 100);
        context.fillStyle = "#F00";
        context.fillRect(-50, -50, 100, 100);
        context.restore();
    }
 
      
//starting broadcast and initializing socket connection
    broadcast = (data) => { 
      
      if(this.state.broadcasting){
        
        //to-do disconnect logic client to server 
      }
      else {
           
        //capturing stream from canvas with 20 FPS
        let mediaStream =this.refs.canvas.captureStream(20);  

        let finalStream = new MediaStream(mediaStream); 
   
        let mediaRecorder = new MediaRecorder(finalStream, {
           mimeType: 'video/webm;codecs=h264',
           videoBitsPerSecond : 3000000
         });
   
         mediaRecorder.addEventListener('dataavailable', (e) => {
             console.log(e.data);
             socket.emit("event", e.data);
         });
   
         mediaRecorder.addEventListener('stop',(e) => {console.log('stopped')});
   
         mediaRecorder.start(500); // Start recording, and dump data every second
         this.setState({
             broadcasting:true
         })
      }
    }
 
   
      
    render() {
        
        
      const { width, height } = this.props; 
      return (
        <Layout theme="light-grey"  flex={true} direction="column" padding="none" height="full">
 
             <Button 
                theme="rain"
                label={this.state.broadcasting ? "Now Broadcasting Live...": "Broadcast this Canvas" }
                size="default"
                onClick={() => this.broadcast()}
                    />  
        <canvas
          className="broadcast-canvas"
          ref="canvas"
          width={width}
          height={height} 
        />
        </Layout>
      );
    }
  }
   

  export default BroadcastCanvas;