<template src="./App.pug" lang="pug"></template>

<script>
  import Vue from "vue"
  import FileUpload from "../file-upload/file-upload.vue"
  import Status from "../Status/Status.vue"
  import Config from "../Config/Config.vue"
  import axios from "axios"
  import Storage from "../../services/storage.js"

  const Store = new Storage()

  // dummy/default projects
  // const current = [15137, 15106, 15088]
  const current = [15281, 1360]

  // helper func create vue component
  const createItem = (type, data, el = "app") => {
    const MyComponent = Vue.extend(type)
    const component = new MyComponent({ propsData: data }).$mount()
    document.getElementById(el).appendChild(component.$el)
    return component
  }

  export default {
    name: "app",
    components: {
      FileUpload,
      Status,
      Config
    },
    data() {
      return {
        theme: 'alt'
      }
    },
    methods: {
      createItem(id) {
        createItem(Status, { id })
      },
      setTheme(e) {
        e = e.toLowerCase()
        console.log("Set theme:", e)
        this.theme = e
        Storage.set('theme', e)
      }
    },
    mounted() {
      // get current theme from localStorage
      this.theme = Store.get('theme')
      
      // get current item from storage, create a `status` element for each
      // let defaultItems = current
      let items = Store.getJSON("current")
      this.current = items ? items : defaultItems
      this.current.map(this.createItem)
    }
  }
</script>

<style src="./App.styl" lang="stylus"></style>
<style src="../../style/style.styl" lang="stylus"></style>
