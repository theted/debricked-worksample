<template lang="pug">
  .status.animated.zoomIn(v-bind="data")
    h2 {{ data.title }}
    p 
      strong {{ data.vulnerabilitiesFound }} 
      | vulnurbilities found (
      strong {{ data.unaffectedVulnerabilitiesFound }} 
      | unaffected) 
      a(v-bind:href="data.detailsUrl" target="_blank").button Show
    progressbar(v-bind="data")
</template>

<script>

  import axios from 'axios'
  import Progressbar from './Progressbar.vue'

  // TODO: move to global config!
  const ENDPOINT = 'http://localhost:4244/status/'

  export default {
    name: 'status',
    components: {
      Progressbar
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
  
        axios.get(ENDPOINT + this.id)
          .then(res => res.data)
          .then(res => {
            
            let id = res.detailsUrl.substring(res.detailsUrl.lastIndexOf('/') + 1)
            res.title = 'Project #' + id

            self.data = res
            console.log(res)

            // re-call if not coplete
            if(res.progress < 100) {
              setTimeout(() => {self.getData()}, 2000)
            }

          })
          .catch(err => {console.error('ERR!', err)})
      }
    },
    mounted() {
      this.getData()
    },
  }

</script>

<style lang="stylus">
</style>
