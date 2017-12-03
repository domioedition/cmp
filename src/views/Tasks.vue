<template>
  <div>
  <h1>{{ message }}</h1>
  <p>Current page with tasks</p>

  <table class="table table-bordered">
    <th>temp</th>
    <th>task id</th>
    <th>user_id_creator</th>
    <th>task_name</th>
    <th>task_description</th>
    <th>task_date_creation</th>
    <th>task_status</th>
    <th>action</th>
    <tr v-for="(task, index) in tasks">
      <td>{{ $route.params }}</td>
      <td>{{ task.id }}</td>
      <td>{{ task.user_id_creator }}</td>
      <td>{{ task.task_name }}</td>
      <td>{{ task.task_description }}</td>
      <td>{{ task.task_date_creation }}</td>
      <td>{{ task.task_status }}</td>
      <td><router-link :to="{ name: 'project', name: 'tasks', params: { id: projectId, task: task.id } }">  View</router-link></td>
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
    axios.get('http://172.104.252.11/public/task').then((response) => {
      this.tasks = response.data
      // console.log(response)
    }).
    catch(e => {
      this.errors.push(e)
    })
  }
}
</script>
