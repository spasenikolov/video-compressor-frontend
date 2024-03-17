<template>
  <div class="container">
    <p class="focus-ring-info">Submit a video and choose the preferred resolution.</p>
    <h2>Upload Video</h2>
    <div class="form-group">
      <input type="file" @change="handleFileChange" class="form-control">
    </div>

    <div class="form-group">
      <label>Select Resolution:</label>
      <div class="form-check">
        <input type="radio" id="lowResolution" value="320:240" v-model="selectedResolution" class="form-check-input">
        <label for="lowResolution" class="form-check-label">Low</label>
      </div>
      <div class="form-check">
        <input type="radio" id="mediumResolution" value="1280:720" v-model="selectedResolution" class="form-check-input">
        <label for="mediumResolution" class="form-check-label">Medium</label>
      </div>
      <div class="form-check">
        <input type="radio" id="highResolution" value="1920:1080" v-model="selectedResolution" class="form-check-input">
        <label for="highResolution" class="form-check-label">High</label>
      </div>
    </div>

    <button @click="uploadVideo" class="btn btn-primary">Process</button>
    <div v-if="loading" class="loading">Uploading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="downloadUrl" class="download-link">
      <a :href="downloadUrl" :download="downloadFileName" class="btn btn-success">Download Video</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedResolution: '1280:720',
      videoFile: null,
      loading: false,
      error: null,
      downloadUrl: null,
      downloadFileName: null
    };
  },
  methods: {
    handleFileChange(event) {
      this.videoFile = event.target.files[0];
    },
    uploadVideo() {
      if (!this.videoFile) {
        this.error = "Please select a video file";
        return;
      }
      this.loading = true;
      this.error = null;
      let formData = new FormData();
      formData.append('file', this.videoFile);
      formData.append('extension', this.getFileExtension(this.videoFile.name))
      formData.append('resolution', this.selectedResolution);
      axios.post('http://localhost:8080/resize-file', formData, {
            responseType: 'arraybuffer',
          })
          .then(response => {
            const ext = this.getFileExtension(this.videoFile.name);
            this.downloadFileName = `compressed_video.${ext}`;
            this.downloadUrl = this.createObjectURL(response.data, ext);
            this.loading = false;
          })
          .catch(error => {
            console.error('Error uploading video:', error);
            this.error = "Error uploading video";
            this.loading = false;
          });
    },
    createObjectURL(data, ext) {
      let mime;
      if (ext === 'avi') {
        mime = 'video/x-msvideo';
      } else if (ext === 'mp4') {
        mime = 'video/mp4';
      } else {
        mime = 'video/octet-stream';
      }
      let blob = new Blob([data], { type: mime });
      return URL.createObjectURL(blob);
    },
    getFileExtension(filename) {
      return filename.split('.').pop().toLowerCase();
    }
  }
};
</script>

<style>

</style>
