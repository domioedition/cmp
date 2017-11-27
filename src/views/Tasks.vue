<template>
  <div>
  <h1>{{ message }}</h1>
  <p>Current page with tasks</p>
  <table class="table table-bordered">
    <tr v-for="(task, index) in tasks">
      <!-- <td>{{ index }}</td> -->
      <!-- <td>{{ project.title }}</td> -->
      <!-- <td><router-link :to="{ name: 'project', params: { id: index } }">view</router-link></td> -->
      <td>"id": {{ task.id }}</td>
      <td>"user_id_creator": {{ task.user_id_creator }}</td>
      <td>"task_name": {{ task.task_name }}</td>
      <td>"task_description": {{ task.task_description }}</td>
      <td>"task_date_creation": {{ task.task_date_creation }}</td>
      <td>"task_status": {{ task.task_status }}</td>
      <!-- <td>id__{{  projectId }}</td> -->
      <!-- <td>id__{{  task.id }}</td> -->
      <td><router-link :to="{ name: 'project', name: 'tasks', params: { id: projectId, task: task.id } }">__View</router-link></td>
      <!-- <td><router-link :to="{ name: 'project', params: { id: projectId }, name: 'tasks', params: { t: task.id } }">__View</router-link></td> -->
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
    tasks: [],
    errors: [],
    projectId:''
  }),
  created(){

    this.projectId = this.$route.params.id
    // console.log(this.projectId);
    axios.get('http://192.168.33.10/public/task').then((response) => {
      this.tasks = response.data
      // console.log(response)
    }).
    catch(e => {
      this.errors.push(e)
    })
  }
}
</script>
