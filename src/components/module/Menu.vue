<template>
<div class="menu">
  <div class="container">
      <div class="menu-grid">
          <div class="menu-dashboard">
              <div class="location"><img v-if="this.$route.name ===  'HomeComponent'" src="/img/icon-menu-ruler.png" class="menu-icon" alt=""></div>
              <div class=""><router-link to="/home/home"><img src="/img/icon-menu-grid.png" class="menu-icon" alt=""></router-link></div>
              <div class="menu-name active"><router-link class="decoration" to="/home/home">Dashboard</router-link></div>
          </div>
          <div class="menu-transfer">
              <div class="location"><router-link to="/home/searchreceiver"><img v-if="this.$route.name ===  'SearchReceiver'" src="/img/icon-menu-ruler.png" class="menu-icon" alt=""></router-link></div>
              <div class=""><router-link to="/home/searchreceiver"><img src="/img/icon-menu-arrow-up.png" class="menu-icon" alt=""></router-link></div>
              <div class="menu-name"><router-link class="color-text" to="/home/searchreceiver">Transfer</router-link></div>
          </div>
          <div class="menu-topup">
              <div class="location"><img v-if="this.$route.name ===  'TopUp'" src="/img/icon-menu-ruler.png" class="menu-icon" alt=""></div>
              <div class=""><router-link to="/home/topup"><img src="/img/icon-menu-plus.png" class="menu-icon" alt=""></router-link></div>
              <div class="menu-name"><router-link class="color-text" to="/home/topup">Top Up</router-link></div>
          </div>
          <div class="menu-profile">
              <div class="location"><img v-if="this.$route.name ===  'Profile'" src="/img/icon-menu-ruler.png" class="menu-icon" alt=""></div>
              <div class=""><router-link to="/home/profile"><img src="/img/icon-menu-profile.png" class="menu-icon" alt=""></router-link></div>
              <div class="menu-name"><router-link class="color-text" to="/home/profile">Profile</router-link></div>

          </div>
          <div class="menu-logout" :style="styling" v-if="Object.keys(userData).length > 0" v-on:click.prevent="logOut">
              <div class="location"></div>
              <div class=""><img src="/img/icon-menu-log-out.png" class="menu-icon" alt=""></div>
              <div class="menu-name">Logout</div>
          </div>
      </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Menu',
  data () {
    return {
      userData: {
        ...this.token
      }
    }
  },
  props: ['token', 'styling'],
  methods: {
    logOut () {
      return axios.post(`${process.env.VUE_APP_SERVICE_API}/users/logout`, {}, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}` }
      })
        .then(results => {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('dataUser')
          alert('Logout successfull')
          this.$router.replace('/auth/login')
        })
        .catch(() => {
          alert('Failed to logout')
        })
    },
    toHome () {
      this.$router.push('/auth')
    },
    toTransfer () {
      this.router.push('/transfer')
    },
    toTopUp () {
      this.router.push('/topup')
    },
    toProfile () {
      this.router.push('/profile')
    }
  }
}
</script>

<style scoped>
/* Menu */
.menu {
    display: flex;
    background: #FFFFFF;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 25px;
}
.menu .location img {
    position: relative;
    right: 15px;
}

.menu-grid {
    display: flex;
    height:100%;
    flex-direction: column;
    /* align-items: flex-end; */
    grid-template-columns: 100%;
    grid-template-rows: repeat(5, 50px);
    /* justify-content: space-evenly; */
}
.menu-grid > div{
  margin:50px 0 0 0 ;
}
.menu-grid .menu-dashboard {
    display: grid;
    grid-template-columns: 0.3fr 1fr 3fr;
}

.menu-grid .menu-transfer {
    display: grid;
    grid-template-columns: 0.3fr 1fr 3fr;
}

.menu-grid .menu-topup {
    display: grid;
    grid-template-columns: 0.3fr 1fr 3fr;
}

.menu-grid .menu-profile {
    display: grid;
    grid-template-columns: 0.3fr 1fr 3fr;
}

.menu-grid .menu-logout {
    display: grid;
    grid-template-columns: 0.3fr 1fr 3fr;
   margin:auto 0 50px 0;
}

.menu .menu-name {
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 31px;
    color: rgba(58, 61, 66, 0.8);

}

.menu .menu-name.active {
    font-weight: 700;
    font-size: 18px;
    line-height: 31px;
    color: #6379F4;

}
.color-text{
  color: rgba(58, 61, 66, 0.8);
  text-decoration: none;
}
.decoration{
  text-decoration: none;
}
@media (max-width:992px) {
    .menu{
        position:sticky;
        top:0;
    }

    .menu .menu-grid {
    display:flex;
    flex-direction: row;
    /* background-color: lightcoral; */
    gap: 35px;
    padding:15px;

}
.menu-grid > div{
  margin:auto 0 auto 0 ;
}
.menu-grid .menu-logout {
    margin: auto 0 auto 0 !important;
}
.menu-name{
    display:none;
}
.location{
    display:none;
}
}
@media (max-width:768px) {

}
@media screen and (max-width:326px){
  .menu-icon{
      width:1.3em;
  }
}
@media screen and (max-width:300px){
  .menu-icon{
      width:1.0em;
  }
}
</style>
