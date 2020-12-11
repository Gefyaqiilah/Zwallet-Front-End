<template>
<div>
    <header>
        <Navbar :token="sendToken" v-if="renderComponent"/>
    </header>
    <main class="grid-main">
        <Menu class="menu" :token="sendToken" v-bind:styling="this.$route.name==='SearchReceiver'? 'margin:50px 0 50px 0':'margin:auto 0 50px 0' "/>
        <router-view class
        ="pages" :token="sendToken" v-if="renderComponent"/>
    </main>
    <footer>
      <Footer/>
    </footer>
</div>
</template>
<script>
import Navbar from '@/components/module/Navbar'
import Menu from '@/components/module/Menu'
import Footer from '@/components/module/Footer'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      token: JSON.parse(localStorage.getItem('dataUser')),
      timer: '',
      renderComponent: true,
      firstName: JSON.parse(localStorage.getItem('dataUser')).firstName
    }
  },
  components: {
    Navbar,
    Menu,
    Footer
  },
  methods: {
    sendProps () {
      if (this.$route.name === 'HomeComponent') {
        return {
          token: this.token
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getUserData']),
    sendToken () {
      return this.token
    }
  }
}
</script>

<style scoped>
main{
  width:100%;
  padding: 50px 150px 50px 150px;
  background-color: rgb(250, 252, 255);
}
.grid-main {
    display: grid;
    grid-template-columns: 25% 75%;
    grid-template-rows: max-content max-content;
    grid-template-areas:
        'menu pages'
        'menu pages';
    gap: 20px 20px;
}
.menu{
  grid-area: menu;
}
.pages{
  grid-area:pages;
}
@media (max-width:992px) {
    main {
        padding: 20px 20px 20px 20px;
    }
   .grid-main {
        grid-template-columns: 100%;
        grid-template-rows: repeat(2, max-content);
        grid-template-areas:
            'menu'
            'pages'
        ;
        gap: 20px 20px;
    }
}
@media (max-width:768px) {
    .grid-main {
        grid-template-columns: 100%;
        grid-template-rows: repeat(2, max-content);
        grid-template-areas:
            'menu'
            'pages'
        ;
    }
}
</style>
