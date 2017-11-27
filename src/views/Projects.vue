<template>
  <div class="projects">
  <h1>{{ message }}</h1>
  <!-- <router-link to="/projects/add">Add new project</router-link><br> -->

  <input type="text" placeholder="name" v-model="name" @change="postPost()">
  <input type="text" placeholder="description" v-model="description" @change="postPost()">
  <button @click="sendData()">Add project</button>

  <table>
    <tr v-for="(project, index) in projects"  v-bind:project="project" v-bind:index="index" v-bind:key="project.id">
      <td>{{ project.project_name }}</td>
      <td><router-link :to="{ name: 'project', params: { id: index } }">View</router-link></td>
      <td><router-link :to="{ name: 'project', params: { id: index } }">Delete</router-link></td>
    </tr>
  </table>
  </div>
</template>

<script>
import axios from 'axios'

export default{
  data: () => ({
    message: 'Projects',
    name: '',
    description: '',
    userId: 300,
    projects: [],
    errors: []
  }),
  methods:{
    postPost(){
      //dont know how to set up variables
      // console.log('postBody is used', this.name, this.description)
    },
    sendData: function(){
      // console.log(event)
      //Don`t know how it works. Need to investigate
      if(this.name !== ''){
        this.axios.post('http://192.168.33.10/public/projects', {
            project_name: this.name,
            project_description: this.description,
            project_user_id_creator: this.userId
          })
          .then(function (response) {
            alert('Added')
            this.$router.go('/projects')
            // this.$route.router.go('/projects');
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }else{
        alert('Empty name')
        console.log('Empty name')
      }
    }
  },
  created(){
    axios.get('http://192.168.33.10/public/projects').then((response) => {
      this.projects = response.data
    }).
    catch(e => {
      this.errors.push(e)
    })
  }
}
</script>
