<template>
  <div class="post" v-if="post">
      <h4>{{ post.title }}</h4>
      <p>{{ post.body }}</p>
      <p>userId: {{ post.userId }}</p>
      <p>id: {{ post.id }}</p>
  </div>
</template>


<script>
  var posts = require('../posts')
  module.exports = {
    data: function(){
      return{
        posts: posts,
        post: null
      }
    },
    created: function(){
      var postId = this.$route.params.id
      this.post = this.posts[postId]
      // console.log(this.$route)
    }
  }
</script>
