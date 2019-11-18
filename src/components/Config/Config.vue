<template lang="pug">
  .config(v-bind:class="{ active: expanded }")
    a.switch(href="#" @click="toggleActive")
    .wrap(v-bind:class="{ hidden: !expanded }")
      .field
        h3 Theme
        .theme(v-for="item in themes")
          a(@click="setTheme" href="#") {{item}}
      .field
        h3 Text size
        input(type="number" min="8" max="20" value="fontSize" v-model="fontSize" @input="setFontSize"  @change="setFontSize")

</template>

<script>
export default {
  name: "config",
  data() {
    return {
      expanded: false,
      themes: ['default', 'light', 'dark', 'alt'],
      fontSize: 12
    }
  },
  methods: {
    toggleActive() {
      this.expanded = !this.expanded
    },
    setFontSize(event) {
      this.$emit("set_font_size", event.target.value)
    },
    setTheme(event) {
      this.$emit("theme_update", event.target.innerText)
    },
  }
}
</script>

<style lang="stylus" src="./Config.styl"></style>
