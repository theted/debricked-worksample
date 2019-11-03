<template lang="pug">
  .progressbar
    .inner(v-bind:style="{ width: progress + '%' }")
      p {{ progress }}% completed
</template>

<script>
  export default {
    name: 'progressbar',
    props: ['progress']
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
      transition: all 1600ms ease-out
</style>
