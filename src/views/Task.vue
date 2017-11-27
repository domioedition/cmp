<template>
  <div class="task" v-if="task">
      <h1>Task {{ task.task_name }}</h1>
      <p>Description: {{ task.task_description }}</p>
      <p>Date: {{ task.task_date_creation }}</p>
      <p>Status {{ task.task_status }}</p>
      <p>User creator {{ task.user_id_creator }}</p>
      <p>User assignee {{ task.user_id_assignee }}</p>
      <p>Task ID: {{ task.id }}</p>
      <!-- <p>userId: {{ project.userId }}</p> -->
      <!-- <p>user_name_creator: {{ project.project_user_id_creator }}</p> -->
      <!-- <router-link :to="{ name: 'project', params: { id: project.id }, name: 'tasks' }">Tasks</router-link> -->
  </div>
</template>


<script>
import axios from 'axios'

export default{

  data: () => ({
    message: 'Task',
    projects: [],
    task: null,
    errors: [],
    taskId: ''
  }),
  created(){

      this.taskId = this.$route.params.task
      console.log(this.taskId);
      axios.get('http://192.168.33.10/public/task/'+this.taskId).then((response) => {
      this.task = response.data
      console.log(response)
    }).
    catch(e => {
      this.errors.push(e)
    })
  }
}

</script>
