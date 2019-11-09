<template lang="pug">
  .config(v-bind:class="{ active: expanded }")
    a.switch(href="#" @click="toggleActive")

    .wrap(v-bind:class="{ hidden: !expanded }")
      .field
        h3 Text size
        input(type="number" min="12" max="34" value="fontSize")

      .field
        h3 Theme
        .theme(v-for="item in themes")
          a(@click="setTheme" href="#") {{item}}

      .field
        a(@click="doStuff" href="#") Yesh!
</template>

<script>
export default {
  name: "config",
  data() {
    return {
      expanded: false,
      themes: ['light', 'dark', 'alt'],
      fontSize: 12
    }
  },
  methods: {
    toggleActive() {
      this.expanded = !this.expanded
    },
    doStuff(event) {
      this.$emit("event_child", event.target.innerText)
    },
    setTheme(event) {
      this.$emit("theme_update", event.target.innerText)
    }
  },
  mounted() {
    console.log("In config?")
  }
}
</script>

<style lang="stylus" src="./Config.styl"></style>
