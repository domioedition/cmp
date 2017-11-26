<template>
  <div>
  <h1>{{ message }}</h1>
  <table>
    <tr v-for="(project, index) in projects">
      <td>{{ project.title }}</td>
      <td><router-link :to="{ name: 'project', params: { id: index } }">view</router-link></td>
    </tr>
  </table>
  </div>
</template>


<script>
import axios from 'axios'

export default{
  data: () => ({
    message: 'Tasks',
    projects: [],
    errors: []
  }),
  created(){
    axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
      this.projects = response.data
      // return this.projects;
    }).
    catch(e => {
      this.errors.push(e)
    })
  }
}
</script>
