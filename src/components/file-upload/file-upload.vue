<template src="./file-upload.pug" lang="pug"></template>

<script>

  import Vue from 'vue'
  import { upload } from '../../services/file-upload.js';   // real service
  import * as utils from '../../services/utils.js'

  // ! temp !
  import Status from '../Status/Status.vue'
  const createItem = (type, data, el = 'app') => {
    const MyComponent = Vue.extend(type)
    const component = new MyComponent({propsData: data}).$mount()
    document.getElementById(el).appendChild(component.$el)
    return component
  }
  
  import Storage from '../../services/storage.js'
  const Store = new Storage()

  console.log(' >> UTILS:', utils)

  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;
  const ALLOWED_MIMES = [
    'application/json',
    'text/plaintext'
  ]

  export default {
    name: 'file-upload',
    // ! temp !
    components: {
      Status
    },
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

            // emit events / create item
            console.log('UPLOAD EVENT:', x)
            this.$emit('upload', x.data)
            this.createItem(x.data.ciUploadId)

            // append item to localstorage
            let current = Store.getJSON('current')
            current.push(x.data.ciUploadId)
            Store.setJSON('current', current)
          })
          .catch(err => {
            this.uploadError = err.response;
            this.currentStatus = STATUS_FAILED;
            console.log('UPLOAD ERROR')
            console.log(err)
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
      },
      // ! temp !
      createItem(id) {
        createItem(Status, {id})
      }
    },
    mounted() {
      this.reset()
    },
  }

</script>
