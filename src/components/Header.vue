<template>
  <header class="nav navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">FFMPEG Video Client</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/resize" class="btn btn-primary" >Resize</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/change-format" class="btn btn-primary">Change Format</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/advanced" class="btn btn-primary">Advanced</router-link>
          </li>
        </ul>
        <router-link to="/documentation" href="#" class="documentation-link text-light ms-auto btn btn-primary">Documentation</router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
};
</script>

<style scoped>
.nav-link:hover {
  color: royalblue;
}
</style>
