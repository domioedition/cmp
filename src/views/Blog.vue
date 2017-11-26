<template>
  <div class="blog">
    <div class="blog__post" v-for="(post, index) in posts">
      <h4>{{ post.title }}</h4>
      <router-link :to="{ name: 'post', params: { id: index } }">more..</router-link>
    </div>
  </div>
</template>

<script>
  var posts = require('../posts')
  module.exports = {
    data: function(){
      return{
        posts: posts
      }
    }
  }
</script>
