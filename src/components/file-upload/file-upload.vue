<template src="./file-upload.pug" lang="pug"></template>

<script>

  import { upload } from '../../services/file-upload.js';   // real service

  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

  export default {
    name: 'file-upload',
    data() {
      return {
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'data',
        count: 0
      }
    },
    computed: {
      isInitial() { return this.currentStatus === STATUS_INITIAL},
      isSaving() { return this.currentStatus === STATUS_SAVING},
      isSuccess() { return this.currentStatus === STATUS_SUCCESS},
      isFailed() { return this.currentStatus === STATUS_FAILED }
    },
    methods: {
      reset() {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFiles = [];
        this.uploadError = null;
      },

      save(formData) {
        this.currentStatus = STATUS_SAVING;

        upload(formData) // upload file using upload service
          .then(x => {
            this.uploadedFiles = [].concat(x);
            this.currentStatus = STATUS_SUCCESS;
          })
          .catch(err => {
            this.uploadError = err.response;
            this.currentStatus = STATUS_FAILED;
          })
      },
      filesChange(fieldName, fileList) {
        const formData = new FormData()

        if (!fileList.length) return

        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name)
          })

        this.save(formData)
      }
    },
    mounted() {
      this.reset()
    },
  }

</script>

<style src="../../App.styl" lang="stylus"></style>
