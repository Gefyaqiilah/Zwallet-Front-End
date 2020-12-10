<template>
<div>
    <header>
        <Navbar :token="getToken" v-if="renderComponent"/>
    </header>
    <main class="grid-main">
        <Menu class="menu" :token="getToken" v-bind:styling="this.$route.name==='SearchReceiver'? 'margin:50px 0 50px 0':'margin:auto 0 50px 0' "/>
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
import axios from 'axios'
import jwt from 'jsonwebtoken'
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
    },
    fetchToken () {
      return axios.post(`${process.env.VUE_APP_SERVICE_API}/v1/users/token`, {
        token: localStorage.getItem('refreshToken')
      })
        .then(results => {
          const accessToken = results.data.result.accessToken
          const decoded = jwt.verify(accessToken, process.env.VUE_APP_JWT_KEY)
          // eslint-disable-next-line eqeqeq
          const getLocalToken = {
            ...JSON.parse(localStorage.getItem('dataUser')),
            exp: 0,
            iat: 0
          }
          const getFreshToken = {
            ...decoded,
            exp: 0,
            iat: 0
          }
          // eslint-disable-next-line eqeqeq
          if (JSON.stringify(getLocalToken) === JSON.stringify(getFreshToken)) {
          } else {
            localStorage.setItem('accessToken', JSON.stringify(accessToken))
            localStorage.setItem('dataUser', JSON.stringify(getFreshToken))
            this.renderComponent = false
            this.$nextTick(() => {
              this.renderComponent = true
            })
          }
        })
        .catch(() => {
          clearInterval(this.timer)
        })
    }
  },
  mounted () {
    // this.timer = setInterval(this.fetchToken, 5000)
  },
  computed: {
    ...mapGetters(['getUserData']),
    sendToken () {
      return this.token
    },
    getToken: {
      get: function () {
        return this.token
      },
      set: function () {
        this.token = JSON.parse(localStorage.getItem('dataUser'))
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
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
