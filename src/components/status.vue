<template lang="pug">
  .status.animated.zoomIn(v-bind="data")
    h2 Hello in progress
    p {{ data.progress }}% completed
    p {{ data.vulnerabilitiesFound }} vulnurbilities found ({{ data.unaffectedVulnerabilitiesFound }} unaffected)
    span {{ data.detailsUrl }}
    progressbar(v-bind="data")
</template>

<script>

  import axios from 'axios'
  import Progressbar from './Progressbar.vue'

  // TODO: move to global config!
  const ENDPOINT = 'http://localhost:4244/status/14580'

  export default {
    name: 'status',
    components: { // ! actually need to define component here to be able to use inte component !
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
  
        axios.get(ENDPOINT)
          .then(res => res.data)
          .then(res => {
            self.data = res

            // re-call if not coplete
            if(res.progress < 100) {
              setTimeout(() => {self.getData()}, 3000)
            }

          })
          .catch(err => {console.error('ERR!', err)})
      }
    },
    mounted() {
      // if(!this.data) this.data = {}
      this.getData()
    },
  }

</script>

<style lang="stylus">
</style>
