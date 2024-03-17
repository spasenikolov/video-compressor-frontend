<template>
  <div>

    <main class="d-flex flex-column flex-grow-1 h-100 m-5">
      <div class="row align-items-center h-100">
        <div class="col">
          <section class="introduction p-4">
            <h2>Welcome to FFMPEG Video Client</h2>
            <p>This is a web site that can help you compress, resize, and enhance your videos using FFMPEG. Whether you need to reduce the file size, change the format, adjust the bitrate, or perform more advanced operations, our tool has you covered.</p>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
};
</script>

<style scoped>
header {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
}

.introduction {
  background-color: #f8f9fa;
  border-radius: 10px;
  margin-top: 60px;
}
</style>
