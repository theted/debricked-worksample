<template lang="pug">
  .status.animated.zoomIn(v-bind="data")
    h2 {{ data.title }}
    p 
      strong {{ data.vulnerabilitiesFound }} 
      | vulnerabilities found (
      strong {{ data.unaffectedVulnerabilitiesFound }} 
      | unaffected) 
      a(v-bind:href="data.detailsUrl" target="_blank").button Details
    progressbar(v-bind="data")
    
    div(style="position:relative;")
      Spinner
    
    .close(@click="close")
      | x

</template>

<script>

  import axios from 'axios'
  import Progressbar from '../Progressbar/Progressbar.vue'
  import Spinner from '../Spinner/Spinner.vue'
  import config from '../../config.js'

  // ! TODO; remove Storage dependency; emit event to parent instead
  import Storage from '../../services/storage.js'
  const Store = new Storage()


  export default {
    name: 'status',
    components: {
      Progressbar,
      Spinner
    },
    props: ['id'],
    data() {
      return {
        data: {}
      }
    },
    methods: {
      getData() {
        var self = this
  
        axios.get(config.endpoint + 'status/' + this.id)
          .then(res => res.data)
          .then(res => {
            
            let id = 123 // res.detailsUrl.substring(res.detailsUrl.lastIndexOf('/') + 1)
            res.title = 'Project #' + id

            self.data = res
            console.log(res)

            // re-call if not coplete
            if(res.progress < 100) {
              setTimeout(() => {self.getData()}, 1000)
            }

          })
          .catch(err => {console.error('ERR!', err)})
      },
      close() {
        console.log('Close elem:', this.id)
        let vals = Store.getJSON('current')        
        vals = vals.filter(item => item !== this.id)
        Store.setJSON('current', vals)
        
        // TODO; add animation!
        setTimeout(() => {

        }, 500)
        
        
        this.$destroy() // destroy the vue listeners, etc
        this.$el.parentNode.removeChild(this.$el) // remove the element from the DOM
      }
    },
    mounted() {
      this.getData()
    },
  }

</script>

<style lang="stylus" src="./Status.styl"></style>
