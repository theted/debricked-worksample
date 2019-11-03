<template src="./App.pug" lang="pug"></template>

<script>
  import Vue from 'vue'
  import FileUpload from './components/file-upload/file-upload.vue'
  import Tast from './components/Tast.vue' // ??
  import Status from './components/status.vue'
  import Config from './components/Config.vue'
  import axios from 'axios'

  // dummy/default projects
  let current = [1360, 1390]

  // helper function; create vue component
  const createItem = (type, data, el = 'app') => {
    const MyComponent = Vue.extend(type)
    const component = new MyComponent({propsData: data}).$mount()
    document.getElementById(el).appendChild(component.$el)
    return component
  }

  export default {
    name: 'app',
    components: {
      FileUpload,
      Tast,
      Status,
      Config
    },
    methods: {
      createItem(id) {
        createItem(Status, {id})
      }
    },
    mounted() {
      // get current item from storage, create a `status` element for each
      let defaultItems = [1360, 1960]
      this.current = (localStorage.current) ? localStorage.current : defaultItems
      this.current.map(this.createItem)
    }
  }

</script>

<style src="./App.styl" lang="stylus"></style>
