<template>
  <div class="project" v-if="project">
      <p>{{ project }}</p>
      <h1>Project {{ project.id }}</h1>
      <h4>{{ project.project_name }}</h4>
      <p>{{ project.project_description }}</p>
      <!-- <p>userId: {{ project.userId }}</p> -->
      <p>user_name_creator: {{ project.project_user_id_creator }}</p>
      <router-link :to="{ name: 'project', params: { id: project.id }, name: 'tasks' }">Tasks</router-link>
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
      var pEdit = this.$route.params.edit
      console.log(this.$route.params)
      axios.get('http://192.168.33.10/public/projects/'+projectId).then((response) => {
        this.project = response.data
        // console.log(response.data)
      }).
      catch(e => {
        this.errors.push(e)
      })
    }
  }
</script>
