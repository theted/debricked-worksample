<template lang="pug">
  .progressbar(v-if="progress < 100")
    .inner(v-if="progress > -1" v-bind:style="{ width: progress + '%' }")
      p {{ progress }}% completed
    .inner.waiting(v-if="progress === -1")
      p Waiting in queue...

</template>

<script>
  export default {
    name: 'progressbar',
    props: ['progress']
  }
</script>

<style lang="stylus" src="./Progressbar.styl"></style>
