<template>
  <div id="demo">
    <transition name="fade">
      <div v-if="show">
        <h1>Test</h1>
      <p>{{  message }}</p>
      <input type="text" v-model="message">
      <!-- <input type="text" v-model="search" autofocus> -->
      <!-- <pre>{{ $data }}</pre> -->
      </div>
    </transition>
    <div>
      <ul>
        <li v-for="bear in bears" v-bind:class="{'strike': bear.status}">Age:{{ bear.age }} - {{ bear.name }}</li>
      </ul>
    </div>
    <button v-on:click.prevent="show = !show">
      Show/Hide
    </button>

    <form action="">
      <button v-on:click="onClick">Test On Click</button>
    </form>
  </div>
</template>

<script>
export default{
  data: () => ({
    bears:[
      {
        name: 'brown',
        status: true,
        age:18
      },
      {
        name: 'grizli',
        status: false,
        age:5
      },
      {
        name: 'panda',
        status: false,
        age:7
      },
      {
        name:   'white',
        status: true,
        age:12
      }
    ],
    // el: '#demo',
    show: true,
    message: 'Some message!!'
  }),
  methods:{
    onClick: function(){
      // e.preventDefault
      console.log('Test On Click')
    }
  }
}
</script>
