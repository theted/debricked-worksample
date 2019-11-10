<template lang="pug">
  .config(v-bind:class="{ active: expanded }")
    a.switch(href="#" @click="toggleActive")

    .wrap(v-bind:class="{ hidden: !expanded }")
      .field
        h3 Text size
        input(type="number" min="8" max="20" value="fontSize" v-model="fontSize" @input="addEvent"  @change="addEvent")

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
    setFontSize(event) {
      this.$emit("set_font_size", event.target.innerText)
    },
    setTheme(event) {
      this.$emit("theme_update", event.target.innerText)
    },
    addEvent(event) {
      console.log('add/update', event.target.value)
      this.$emit("set_font_size", event.target.value)

    }
  },
  mounted() {
    console.log("In config?")
  }
}
</script>

<style lang="stylus" src="./Config.styl"></style>
