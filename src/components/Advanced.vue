<template>
  <div class="container">
    <h2>Upload Video</h2>
    <div class="form-group">
      <input type="file" @change="handleFileChange" class="form-control">
    </div>
    <div class="form-group">
      <label>Select Video Codec:</label>
      <select v-model="selectedCodec" class="form-control">
        <option value="h264">H.264</option>
        <option value="mpeg4">MPEG4</option>
      </select>
    </div>

    <div class="form-group">
      <label>Select Audio Codec:</label>
      <select v-model="selectedAudioCodec" class="form-control">
        <option value="flac">FLAC</option>
        <option value="aac">AAC</option>
        <option value="libmp3lame">MP3</option>
      </select>
    </div>
    <div class="form-group">
      <label>Resolution:</label>
      <select v-model="selectedResolution" class="form-control">
        <option value="1920:1080">FULL HD</option>
        <option value="1280:720">HD</option>
        <option value="960:540">qHD</option>
        <option value="640:480">VGA</option>
        <option value="320:240">QVGA</option>

      </select>
    </div>
    <button @click="uploadVideo" class="btn btn-primary">Upload</button>
    <div v-if="loading" class="loading">Uploading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="downloadUrl" class="download-link">
      <a :href="downloadUrl" :download="downloadFileName" class="btn btn-success">Download Compressed Video</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedCodec: 'h264',
      selectedAudioCodec: 'flac',
      selectedResolution: '960:540',
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
      formData.append('codec', this.selectedCodec);
      formData.append('audioCodec', this.selectedAudioCodec);
      formData.append('extension', this.getFileExtension(this.videoFile.name))
      formData.append('resolution', this.selectedResolution)
      axios.post('http://localhost:8080/upload', formData, {
            responseType: 'arraybuffer', // Ensure response is treated as a binary array
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
.container {
  margin-left: 200px;
  margin-top: 100px;
  max-width: 350px;
  align-content: center;
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

.error {
  color: red;
  margin-top: 10px;
}

.loading {
  margin-top: 10px;
}

.download-link {
  margin-top: 20px;
}
</style>
