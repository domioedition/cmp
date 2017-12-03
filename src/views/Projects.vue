<template>
  <div class="projects">
    <h1>{{ message }}</h1>

    <button type="button" class="btn btn-success" @click="show()">Add new project</button>
    <transition name="fade">
      <div v-if="showAddForm">
        <input type="text" placeholder="name" v-model="name">
        <input type="text" placeholder="description" v-model="description">
        <button @click="sendData()">Add project</button>
      </div>
    </transition>

    <transition name="fade">
        <div v-if="showTasks">
          <table class="table table-bordered">
            <thead>
              <th>ID</th>
              <th>name</th>
              <th>tasks</th>
              <th>status</th>
              <th>actions</th>
            </thead>
            <tr v-for="(project, index) in projects"  v-bind:project="project" v-bind:index="index" v-bind:key="project.id">
              <td>{{ project.id }}</td>
              <td>{{ project.project_name }}</td>
              <td>#count</td>
              <td>status</td>
              <td><router-link :to="{ name: 'project', params: { id: project.id } }">View project</router-link></td>
            </tr>
          </table>
        </div>
    </transition>

  </div>
</template>

<script>

import axios from 'axios'

export default{
  data: () => ({
    showTasks: true,
    showAddForm: true,
    message: 'Projects',
    name: '',
    description: '',
    userId: 300,
    projects: [],
    errors: []
  }),
  methods:{
    show(){
      // console.log(123)
      // showAddForm = true
      // showTasks = false
      //dont know how to set up variables
      // console.log('postBody is used', this.name, this.description)
    },
    sendData: function(){
      // console.log(event)
      //Don`t know how it works. Need to investigate
      if(this.name !== ''){
        this.axios.post('http://172.104.252.11/public/projects', {
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
    axios.get('http://172.104.252.11/public/projects').then((response) => {
      this.projects = response.data
    }).
    catch(e => {
      this.errors.push(e)
    })
  }
}
</script>
