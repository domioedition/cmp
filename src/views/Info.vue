<template>
  <div class="project" v-if="project">
    <h2>{{ project.project_name }}</h2>
    <p>{{ project.project_description }}</p>
    <p>{{ project.project_user_id_creator }}</p>
    <p>{{ project.project_description }}</p>
    <hr>



    <div class="form-group">
      <label>Project title</label><br>
      <input type="text" v-model="name"  @change="postPost()"><br>
    </div>
    <div class="form-group">
      <label>Description</label>
      <textarea v-model="description" class="form-control" rows="3" cols="60"></textarea><br>
    </div>
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
