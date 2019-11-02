<template src="./App.pug" lang="pug"></template>

<script>
  import FileUpload from './components/file-upload/file-upload.vue'
  import Tast from './components/Tast.vue' // ??
  import Status from './components/status.vue'

  export default {
    name: 'app',
    components: {
      FileUpload,
      Tast,
      Status
    }
  }

</script>

<style src="./App.styl" lang="stylus"></style>
