<template>
  <div class="projects">
    <h1>{{ message }}</h1>

    <button type="button" class="btn btn-success" @click="show()" v-if="addButton">Add new project</button><br><br>
    <transition name="fade">
      <div v-if="showAddForm">
        <div class="form-group">
          <label>Project title</label><br>
          <input type="text" v-model="name">
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea class="form-control" rows="3" cols="60" v-model="description"></textarea>
        </div>
        <button @click="sendData()" class="btn btn-primary">Create project</button>
      </div>
    </transition>

    <transition name="fade">
        <div v-if="showTasks">
          <table class="table table-inverse">
            <thead>
              <th>ID</th>
              <th>name</th>
              <th>actions</th>
            </thead>
            <tr v-for="(project, index) in projects"  v-bind:project="project" v-bind:index="index" v-bind:key="project.id">
              <td>{{ project.id }}</td>
              <td>{{ project.project_name }}</td>
              <td><router-link :to="{ name: 'project', params: { id: project.id } }">View</router-link></td>
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
    addButton: true,
    showTasks: true,
    showAddForm: false,
    message: 'Projects',
    name: '',
    description: '',
    userId: 300,
    projects: [],
    errors: []
  }),
  methods:{
    show(){
      this.showAddForm = true
      this.showTasks = false
      this.addButton = false
    },
    sendData: function(){
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
