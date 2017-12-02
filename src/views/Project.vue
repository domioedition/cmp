<template>
  <div class="project" v-if="project">
      <h1>{{ project.project_name }}</h1>

      <!-- <p>{{ project.project_description }}</p> -->
      <!-- <p>userId: {{ project.userId }}</p> -->
      <!-- <p>user_name_creator: {{ project.project_user_id_creator }}</p> -->
      <router-link :to="{ name: 'project', params: { id: project.id }, name: 'info' }"><button type="button">Project info</button></router-link>
      <hr>
      <h3>Current tasks</h3>
      <div class="tasks">
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
            <td><router-link :to="{ name: 'task', params: { id: projectId, task: task.id } }">  View</router-link></td>
            <!-- <td><router-link :to="{ name: 'project', params: { id: projectId }, name: 'tasks', params: { t: task.id } }">__View</router-link></td> -->
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
      tasks: null,
      errors: []
    }),
    created(){
      var projectId = this.$route.params.id
      // var name = this.$route.params.name
      // var pEdit = this.$route.params.edit
      // console.log(this.$route.params)
      axios.get('http://192.168.33.10/public/projects/'+projectId).then((response) => {
        this.project = response.data
        // console.log(response.data)
      }).
      catch(e => {
        this.errors.push(e)
      })

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
