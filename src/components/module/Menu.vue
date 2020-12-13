<template>
<div class="menu">
  <div class="container">
      <div class="menu-grid">
          <div class="menu-dashboard" @click="toHome">
              <div class="location"><img v-if="this.$route.name ===  'HomeComponent'" src="/img/icon-menu-ruler.png" class="menu-icon" alt=""></div>
              <div class=""><router-link to="/home/home"><img :src="this.$route.name ===  'HomeComponent'?'/img/grid-purple.png':'/img/grid.png'" class="menu-icon" alt=""></router-link></div>
              <div :class="this.$route.name === 'HomeComponent' ? 'menu-name active' : 'menu-name'">Dashboard</div>
          </div>
          <div class="menu-transfer" @click="toTransfer">
              <div class="location"><router-link to="/home/searchreceiver"><img v-if="this.$route.name ===  'SearchReceiver'" src="/img/icon-menu-ruler.png" class="menu-icon" alt=""></router-link></div>
              <div class=""><router-link to="/home/searchreceiver"><img :src="this.$route.name === 'SearchReceiver' ?'/img/icon-menu-arrow-up-purple.png':'/img/icon-menu-arrow-up.png'" class="menu-icon" alt=""></router-link></div>
              <div :class="this.$route.name === 'SearchReceiver' ? 'menu-name active' : 'menu-name'">Transfer</div>
          </div>
          <div class="menu-topup" @click="toTopUp">
              <div class="location"><img v-if="this.$route.name ===  'TopUp'" src="/img/icon-menu-ruler.png" class="menu-icon" alt=""></div>
              <div class=""><router-link to="/home/topup"><img :src="this.$route.name === 'TopUp' ?'/img/icon-menu-plus-purple.png':'/img/icon-menu-plus.png'" class="menu-icon" alt=""></router-link></div>
              <div :class="this.$route.name === 'TopUp' ? 'menu-name active' : 'menu-name'">Top Up</div>
          </div>
          <div class="menu-profile" @click="toProfile">
              <div class="location"><img v-if="this.$route.name ===  'Profile'" src="/img/icon-menu-ruler.png" class="menu-icon" alt=""></div>
              <div class=""><router-link to="/home/profile"><img :src="this.$route.name === 'Profile' ?'/img/icon-menu-user-purple.png':'/img/icon-menu-profile.png'" class="menu-icon" alt=""></router-link></div>
              <div :class="this.$route.name === 'Profile' ? 'menu-name active' : 'menu-name'">Profile</div>

          </div>
          <div class="menu-logout" :style="styling" v-if="Object.keys(userData).length > 0" v-on:click.prevent="handleLogOut">
              <div class="location"></div>
              <div class=""><img src="/img/icon-menu-log-out.png" class="menu-icon" alt=""></div>
              <div class="menu-name">Logout</div>
          </div>
      </div>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'
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
    ...mapActions(['logOut']),
    handleLogOut () {
      this.logOut()
      this.$router.push('/auth')
      Swal.fire({
        icon: 'success',
        title: 'Logout Success',
        text: 'See you again :)',
        showConfirmButton: false,
        timer: 3000
      })
    },
    toHome () {
      this.$router.push('/home/home')
    },
    toTransfer () {
      this.$router.push('/home/searchreceiver')
    },
    toTopUp () {
      this.$router.push('/home/topup')
    },
    toProfile () {
      this.$router.push('/home/profile')
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
   cursor: pointer;
}

.menu .menu-name {
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 31px;
    color: rgba(58, 61, 66, 0.8);
    cursor: pointer;

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
