<template>
  <div id="demo">
    <button v-on:click="show = !show">
      Переключить
    </button>
    <transition name="fade">
      <p v-if="show">hello</p>
    </transition>
  </div>
</template>

<script>
export default{
  data: () => ({
    el: '#demo',
    show: true
  })
}
</script>
