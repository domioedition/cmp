<template>
  <div class="project" v-if="project">
      <h1>Project#</h1>
      <h4>{{ project.title }}</h4>
      <p>{{ project.body }}</p>
      <p>userId: {{ project.userId }}</p>
      <p>id: {{ project.id }}</p>
      <router-link :to="{ name: 'project', params: { id: project.id } }">view</router-link>
      <!-- <router-link to="/project/1/tasks">Tasks</router-link> -->
  </div>
</template>


<script>
  import axios from 'axios'

  export default{
    data: () => ({
      message: 'Project',
      project: null,
      tasks: null,
      errors: []
    }),
    created(){
      var projectId = this.$route.params.id
      axios.get('https://jsonplaceholder.typicode.com/posts/'+projectId).then((response) => {
        this.project = response.data
      }).
      catch(e => {
        this.errors.push(e)
      })
    }
  }
</script>
