# POC attempt #1 - Web-based live streaming


![Alt Text](https://previewpod.com/gifSample.gif)



# Part 1: The Broadcast Client
- Using web-based technologies to capture a staged canvas on the browser for live streaming. 
- Captures canvas stream
- makes a socket connection to pass stream to server
- encodes stream for RTMP
- passes stream to an AWS Elemental MediaLive RTMP input, AWS transcodes and connects HLS output via MediaPackage
- MediaPackage output to Cloudfront CDN for distribution
- HLS players use Cloudfront CDN url for live stream 


- Broadcast - client built on React.js and is using Q4's nimbus-ui because it's super quick to implement 
- why a canvas? To replicate a staged area for slide management 
- why an animated canvas? To measure latency on the viewers end through HLS viewer

## Basic Installation

- make sure you have authorized .npmrc for nimbus-ui

```sh
$ https://github.com/zkarimi22/poc-livestream-with-CDN.git
$ npm install
$ npm start
``` 

## Part 2: Encoding Server 

- [clone the encoding server from here](https://github.com/zkarimi22/poc-livestream_encoding-server)
- make sure you have [ffmpeg](https://www.ffmpeg.org/download.html) installed for audio/video processing 
- run the server through terminal: 

```sh
$ node index.js 
```  

## Part 3: AWS Elemental MediaLive integration

- Currently pointing to a (limited) service instance in us-east-1 that will idle or be turned off 
- can be connected to record + save each stream to S3, but not the purpose of this poc



## Putting it All Together 

- To quickly demo an HLS viewer experience, I've.used basic video.js implementation
- copy the code below into a viewer.html file. It will be used to test the live stream 

```html
<!DOCTYPE html>
<html>
<head>
<meta charset=utf-8 />
<title>Video.js HLS Streaming</title>
  
  <link href="https://unpkg.com/video.js/dist/video-js.css" rel="stylesheet">
</head>
<body>
  <h1>Simple HLS Streaming with Video.js</h1>

  <video-js data-setup='{"liveui": true}' id="my_video_1" class="vjs-default-skin" controls preload="auto" width="640" height="268">
    <source src="https://d3newoxe52p5ct.cloudfront.net/out/v1/a0b4c6e201e0418699f173ca72e08924/index.m3u8" type="application/x-mpegURL">
  </video-js>
  
  <script src="https://unpkg.com/video.js/dist/video.js"></script>
  <script src="https://unpkg.com/@videojs/http-streaming/dist/videojs-http-streaming.js"></script>
  
  <script>
    var player = videojs('my_video_1');
  </script>
  
</body>
</html>
```





- now run the broadcast client 
- start the encoding server
- click on "Start Broadcasting" menu item or the "Begin Broadcasting" button
- Live-streaming begins when you then click on "Broadcast this canvas"

