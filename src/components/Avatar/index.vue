<template>
    <span class="avatar-img">
        <img :src="src" v-if="src">
        <span v-else><slot></slot></span>
    </span>
</template>

<script>
export default {
  data() {
    return {
      name: 'avatar'
    }
  },
  props: {
    src: {
      type: String
    }
  }
}
</script>

<style scoped>
span.avatar-img {
    display: inline-block;
    height: 32px;
    width: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 100%;
    color: #FFF;
}
</style>

