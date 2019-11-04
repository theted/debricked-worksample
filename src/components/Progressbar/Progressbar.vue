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

<style lang="stylus" src="./Progressbar.styl"></style>
