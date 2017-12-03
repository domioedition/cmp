<template>
  <div class="task" v-if="task">
    <div v-if="editTaskForm">
      <h1>Edit</h1>
      <input type="text" placeholder="Title" v-model="title"><br>
      <textarea name="name" rows="8" cols="80" placeholder="Description" v-model="description"></textarea><br>
      <button type="button" name="button" class="btn btn-success" v-on:click="saveTaskData">Save changes</button>
    </div>
      <div class="row" v-if="taskInfo">
          <div class="col-lg-8">
            <h1>{{ task.task_name }}</h1>
            <p>Description: {{ task.task_description }}</p>
            <p>Created: {{ task.task_date_creation }}</p>
            <p>Status {{ task.task_status }}</p>
            <p>User creator {{ task.user_id_creator }}</p>
            <p>User assignee {{ task.user_id_assignee }}</p>
            <p>Task ID: {{ task.id }}</p>
          </div>
          <div class="col-lg-4">
            <h4>Actions</h4>
            <select v-model="selected" v-on:change="changeStatus($event)">
              <option disabled value="">Change status</option>
              <option value="0">To do</option>
              <option value="1">In progress</option>
              <option value="2">Hold</option>
              <option value="3">Review</option>
              <option value="4">Ready for acceptance</option>
              <option value="5">Done</option>
            </select>
            <span>Selected: {{ selected }}</span><br><br>
            <button type="button" class="btn btn-info" v-on:click="editTask()">Edit</button>
            <button type="button" class="btn btn-danger">Delete</button>
          </div>
      </div>
      <hr>
      <div v-if="showComments">
        <div class="row">
          <div class="col-lg-12">
            <h4>Comments</h4>
            <p>temp comment 1, need to change. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>temp comment 2, need to change. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>temp comment 3, need to change. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>temp comment 4, need to change. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      </div>
  </div>
  <div v-else>
    <h2>Task not found</h2>
  </div>
</template>


<script>
import axios from 'axios'

export default{

  data: () => ({
    task: false,
    editTaskForm: false,
    taskInfo: true,
    showComments: true,
    selected: '',
    errors: []
  }),
  methods:{
    editTask(){
      this.editTaskForm = true
      this.taskInfo = false
      this.showComments = false
    },
    saveTaskData(){
      this.pid = this.$route.params.pid
      this.tid = this.$route.params.tid
      this.axios.put('http://172.104.252.11/public/task/'+this.pid+'/'+this.tid, {
        pid: this.pid,
        task_name: this.title,
        task_description: this.description
      }).then(function (response) {
          alert('Updated')
          // this.$router.go('/projects')
          // this.$route.router.go('/projects');
          // console.log(response);
        })
        .catch(function (error) {
          // console.log("Error message: ", error);
        });
    },
    changeStatus(event){
      this.status = `${event.target.value}`
      this.axios.put('http://172.104.252.11/public/task/'+this.pid+'/'+this.tid+'/'+this.status, {
        status: this.status
      }).then(function (response) {
          alert('Status changed')
          // this.$router.go('/projects')
          // this.$route.router.go('/projects');
          // console.log(response);
        })
        .catch(function (error) {
          // console.log("Error message: ", error);
        });
    }
  },
  created(){
      this.pid = this.$route.params.pid
      this.tid = this.$route.params.tid
      axios.get('http://172.104.252.11/public/task/'+this.pid+'/'+this.tid).then((response) => {
        this.task = response.data
    }).
    catch(e => {
      this.errors.push(e)
    })
  }
}

</script>
