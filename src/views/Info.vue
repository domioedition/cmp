<template>
  <div class="project" v-if="project">
    <h1>Project information</h1>
    <h2>name: {{ project.project_name }}</h2>
    <h3>{{ project.id }}</h3>
    <h3>{{ project.project_name }}</h3>
    <h3>{{ project.project_user_id_creator }}</h3>
    <p>{{ project.project_description }}</p>
    <hr>

    <input v-model="message" placeholder="отредактируй меня">
    <p>Введённое сообщение: {{ message }}</p>

    <input type="text" v-model="name"  @change="postPost()"><br>
    <textarea v-model="description" placeholder="Project description"></textarea><br>
    <select v-model="selected">
      <option disabled value="">Change status</option>
      <option>Active</option>
      <option>Hold</option>
      <option>Finish</option>
    </select>
    <span>Selected: {{ selected }}</span>

    <!-- <input type="text" v-model="description" @change="postPost()"> -->
    <button @click="updateData()" type="button" class="btn btn-primary">Update project</button>
    <button @click="deleteData()" type="button" class="btn btn-danger">Delete project</button>
  </div>
  <div class="project" v-else>
    <h3>Project not found</h3>
  </div>
</template>


<script>
  import axios from 'axios'

  export default{
    data: () => ({
      selected: '',
      message: 'Project',
      project: null,
      name: '',
      description: '',
      userId: 300,
      errors: []
    }),
    methods:{
      postPost: function(){
        // console.log(this.name)
      },
      updateData: function(){
        if(this.name !== ''){
          axios.defaults.withCredentials = false
          var projectId = this.$route.params.id
          this.axios.put('http://172.104.252.11/public/projects/'+projectId, {
            project_name: this.name,
            project_description: this.description,
            project_user_id_creator: this.userId
          }).then(function (response) {
              alert('Updated')
              // this.$router.go('/projects')
              // this.$route.router.go('/projects');
              // console.log(response);
            })
            .catch(function (error) {
              // console.log("Error message: ", error);
            });
        }else{
          alert('Empty name')
          // console.log('Empty name')
        }
      },
      deleteData: function(){
          var projectId = this.$route.params.id
          this.axios.delete('http://172.104.252.11/public/projects/'+projectId, {

          }).then(function (response) {
              alert('Deleted')
            })
            .catch(function (error) {
              console.log("Error message: ", error);
            });
      }
    },
    created(){
      var projectId = this.$route.params.id
      // var pEdit = this.$route.params.edit
      // console.log(projectId)
      axios.get('http://172.104.252.11/public/projects/'+projectId).then((response) => {
        this.project = response.data
        // console.log(response.data)
        if(this.project){
          // console.log("response.data")
        }
      }).
      catch(e => {
        this.errors.push(e)
      })
    }
  }
</script>
