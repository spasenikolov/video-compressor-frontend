<template>
  <div class="container">
    <h2>Upload Video</h2>
    <div class="form-group">
      <input type="file" @change="handleFileChange" class="form-control">
    </div>

    <div class="form-group">
      <label>Select format:</label>
      <select v-model="selectedCodec" class="form-control">
        <option value="mp4">mp4</option>
        <option value="avi">avi</option>
        <option value="mov">mov</option>
        <option value="mkv">mkv</option>
      </select>
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
      selectedCodec: 'mp4', // Default to medium resolution
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
      formData.append('oldExtension', this.getFileExtension(this.videoFile.name))
      formData.append('newExtension', this.selectedCodec);
      axios.post('http://localhost:8080/change-format', formData, {
            responseType: 'arraybuffer',
          })
          .then(response => {
            const ext = this.selectedCodec;
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
