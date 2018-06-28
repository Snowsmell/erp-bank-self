<template>
  <section class="text-card">
    <header :class="['text-card-hd', border ? 'is-border' : '']" v-if="$slots.header">
      <slot name="header"></slot>
    </header>
    <div class="text-card-bd">
      <slot></slot>
    </div>
    <footer :class="['text-card-ft', border ? 'is-border' : '']" v-if="$slots.footer">
      <slot name="footer"></slot>
    </footer>
  </section>
</template>

<script>
export default {
  name: 'TextCard',
  props: {
    border: {
      type: Boolean,
      default () {
        return true
      }
    }
  }
}
</script>

