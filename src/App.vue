<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/js/bootstrap.js'
import { mapActions } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      getUserData: null
    }
  },
  methods: {
    ...mapActions(['interceptorRequest', 'interceptorResponse'])
    // ...mapMutations(['SET_FROM_IO']),
    // handleSetFromIo () {
    //   this.getUserData = setInterval(() => {
    //     this.$socket.emit('getUserData', '64175ca1-e1f9-4154-a5ee-371474849aa0')
    //     this.sockets.subscribe('getUserData', data => {
    //       this.SET_FROM_IO(data[0])
    //       console.log('asup cookkk', data)
    //     })
    //   }, 10000)
    // }
  },
  created () {
    this.interceptorRequest()
    this.interceptorResponse()
  }
}
</script>

<style scoped>
/* font google Nunito Sans*/
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap");

html,
body {
  margin: 0;
  padding: 0;
}
* {
  font-family: "Nunito Sans", sans-serif;
}
</style>
