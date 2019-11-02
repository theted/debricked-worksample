<template lang="pug">
  .progressbar
    .inner(v-bind:style="{ width: progress + '%' }")
      p {{ progress }}% completed
</template>

<script>
  export default {
    name: 'progressbar',
    data() {
      return {
        progress: 30,
      }
    },
    methods: {
      setRandom() {
        let self = this
        let random = Math.floor(Math.random() * Math.floor(100))
        this.progress = random
        setTimeout(() => self.setRandom(), 3000 )
      }
    },
    mounted() {
      // this.setRandom()
    },
  }
</script>

<style lang="stylus">
  .progressbar
    border: 1px solid green
    width: 100%
    background: #333

    .inner
      padding: .4em 
      background: blue
      transition: all 900ms ease-out
</style>
