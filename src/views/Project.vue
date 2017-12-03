<template>
  <div class="project" v-if="project">
      <h1>{{ project.project_name }}</h1>
      <router-link :to="{ name: 'project', params: { id: project.id }, name: 'info' }"><button type="button" class="btn btn-info">Project info</button></router-link>
      <hr>
      <h3>Current tasks</h3>
      <button type="button" class="btn btn-primary" v-on:click.prevent="showAddForm = !showAddForm">New task</button><br><br>

      <div v-if="showAddForm">
        <input type="text" placeholder="Title" v-model="title"><br><br>
        <textarea placeholder="Description" v-model="descr" rows="6" cols="60"></textarea><br><br>
        <button class="btn btn-success" @click="createTask()">Create</button>
      </div>
      <br><br>

      <div class="tasks">
        <table class="table table-bordered">
          <th>task id</th>
          <th>user_id_creator</th>
          <th>task_name</th>
          <th>task_date_creation</th>
          <th>task_status</th>
          <th>action</th>
          <th>Del</th>
          <tr v-for="(task, index) in tasks">
            <td>{{ task.id }}</td>
            <td>{{ task.user_id_creator }}</td>
            <td>{{ task.task_name }}</td>
            <td>{{ task.task_date_creation }}</td>
            <td>{{ task.task_status }}</td>
            <td><router-link :to="{ name: 'task', params: { pid: projectId, tid: task.id } }">  View</router-link></td>
            <td><button @click="deleteTask(projectId, task.id)" type="button" class="btn btn-danger">Delete task</button></td>
          </tr>
        </table>
      </div>
  </div>
</template>


<script>
  import axios from 'axios'

  export default{
    data: () => ({
      message: 'Project',
      project: null,
      tasks: false,
      errors: [],
      showAddForm: false,
      title: '',
      descr: ''
    }),
    methods:{
      createTask(){
          this.pid = this.$route.params.id
          console.log(this.pid)
          this.axios.post('http://172.104.252.11/public/task/'+this.pid+'/', {
            pid: this.pid,
            user_id_creator: 1,
            user_id_assignee: 1,
            task_name: this.title,
            task_description: this.descr
            }).then(function (response) {
              alert('New task craeted')
            }).catch(function (error) {
              console.log(error);
            });
      },
      deleteTask: function(pid,tid){

          var projectId = this.$route.params.id
          // console.log(this.$route.params.pid)
          this.axios.delete('http://172.104.252.11/public/task/'+pid+'/'+tid, {

          }).then(function (response) {
              // alert('Deleted')
              console.log('delete_test', pid, ' ',tid)
            })
            .catch(function (error) {
              console.log("Error message: ", error);
            });
      },
    },
    created(){
      var projectId = this.$route.params.id
      axios.get('http://172.104.252.11/public/projects/'+projectId).then((response) => {
        this.project = response.data
      }).
      catch(e => {
        this.errors.push(e)
      })

      this.projectId = this.$route.params.id
      axios.get('http://172.104.252.11/public/task/'+this.projectId+'/').then((response) => {
        this.tasks = response.data
      }).
      catch(e => {
        this.errors.push(e)
      })

    }
  }
</script>
