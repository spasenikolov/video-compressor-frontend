<template>
  <div class="container mt-4">
    <div class="jumbotron">
      <h1 class="display-4">FFMPEG Client Website</h1>
      <p class="lead">Easily modify your videos using FFMPEG.</p>
    </div>

    <div class="row">
      <div class="col-md-6">
        <h3>Technologies Used:</h3>
        <p>- Spring Boot for the backend.</p>
        <p>- Vue for the frontend.</p>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-6">
        <h3>Functionality:</h3>

        <h4>Resize Video Page:</h4>
        <p>- Upload a video file.</p>
        <p>- Select low, medium, or high resolution for resizing.</p>
        <p>- Make an HTTP POST request to the backend endpoint /resize-video.</p>

        <h4>Change Format Page:</h4>
        <p>- Upload a video file.</p>
        <p>- Select a format for the uploaded video.</p>
        <p>- Make an HTTP POST request to the backend endpoint /change-format.</p>

        <h4>Advanced Page:</h4>
        <p>- Select video codec, audio codec, and resolution settings.</p>
        <p>- Upload a video file with advanced settings.</p>
        <p>- Make an HTTP POST request to the backend endpoint /upload.</p>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-6">
        <h3>Endpoints:</h3>
        <p>- /resize-video: Used for resizing videos based on selected resolution.</p>
        <p>- /change-format: Used for changing the format of the uploaded video.</p>
        <p>- /upload: Used for uploading videos with advanced settings including video codec, audio codec, and resolution.</p>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <h2>Flow:</h2>
    <img src="../assets/ffmpeg.jpg" alt="flow" class = "card-img">

  </div>
</template>
