<template src="./App.pug" lang="pug"></template>

<script>
  import Vue from "vue"
  import FileUpload from "../file-upload/file-upload.vue"
  import Status from "../Status/Status.vue"
  import Config from "../Config/Config.vue"
  import axios from "axios"
  import Storage from "../../services/storage.js"

  const Store = new Storage()

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
        theme: 'alt',
        fontSize: 10
      }
    },
    methods: {
      createItem(id) {
        createItem(Status, { id })
      },
      setTheme(newTheme) {
        if(!newTheme) return false

        newTheme = newTheme.toLowerCase()
        console.log("Set theme:", newTheme)
        this.theme = newTheme
        Store.set('theme', newTheme)

        // bit of a hax to set class on body
        let classList = document.querySelector('body').classList
        while (classList.length > 0) { classList.remove(classList.item(0))}
        classList.add(newTheme)
      },
      setFontSize(fontSize) {
        console.log('Set font size:', fontSize)
        this.fontSize = fontSize
        Store.set('fontSize', fontSize)
      }
    },
    mounted() {
      // get current theme from localStorage
      this.setTheme(Store.get('theme'))
      
      // . also get fontSize
      this.fontSize = Store.get('fontSize') || 10

      // get current item from storage, create a `status` element for each
      let items = Store.getJSON("current")
      this.current = items ? items : []
      this.current.map(this.createItem)
    }
  }
</script>

<style src="./App.styl" lang="stylus"></style>
<style src="../../style/style.styl" lang="stylus"></style>
