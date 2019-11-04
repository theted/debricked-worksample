<template lang="pug">
  .config(v-bind:class="{ active: expanded }")
    a(href="#" @click="toggleActive") C

    .wrap(v-bind:class="{ hidden: !expanded }")
      .field
        h4 Text size
        // TODO: increase or decrease

      .field
        h4 Theme
        // TODO: set dark or light theme, maybe background?
        // TODO: maybe custom colorz?

</template>

<script>
  export default {
    name: 'config',
    data() {
      return {
        expanded: false,
      }
    },
    methods: {
      toggleActive() { this.expanded = !this.expanded }
    },
    mounted() {
    },
  }
</script>

<style lang="stylus" src="./Config.styl"></style>
