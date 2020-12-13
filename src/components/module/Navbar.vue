<template>
  <nav>
    <div class="container-fluid row">
        <div class="col-12 col-sm-6 col-md-6 nav-left">
            <h1><router-link to="/home" style="text-decoration:none;">Zwallet</router-link></h1>
        </div>
        <div class="col-12 col-sm-6  col-md-6 nav-right">
            <div class="account-info">
                <div class="user-photo">
                    <img class="photo" :src="getUserData.photo === null? '/img/user-avatar.png' :getUserData.photo" alt="">
                </div>
                <h1 v-capitalizeText="true">{{getUserData.firstName +' '}} {{getUserData.lastName !== null? getUserData.lastName : ''}}</h1>
                <p>{{getUserData.phoneNumber ? getUserData.phoneNumber : 'phone number has not been added'}}</p>
                <div class="notification">
                    <img src="/img/bell.png" class="notification" alt="">
                </div>
            </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  data () {
    return {
      userData: {
        ...this.token,
        lastName: this.token.lastName !== null ? this.token.lastName : '',
        phoneNumber: this.token.phoneNumber !== null ? this.token.phoneNumber : '-'
      }
    }
  },
  props: {
    token: Object
  },
  methods: {
  },
  computed: {
    ...mapGetters(['getUserData'])
  }
}
</script>

<style scoped>
nav {
    width: 100%;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    background-color: #FFFFFF;
}

.nav-left h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 29px;
    line-height: 40px;
    color: #6379F4;

    margin: 50px 0 50px 100px;
}

.nav-right {
    display: flex;
    /* background-color: rosybrown; */
    justify-content: flex-end;
}

.nav-right .account-info {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-areas: 'user-photo username notification''user-photo telephone notification';
    gap: 6px 6px;

    max-width: 300px;
    height: 55px;
    margin: auto 100px 50px 0;
    /* background-color: rebeccapurple; */
}

.nav-right .account-info .user-photo {
    grid-area: user-photo;
    width: 55px;
    height: 55px;
}
.photo{
  width:100%;
  height:100%;
  object-fit: cover;
  border-radius: 10px;
}
.nav-right .account-info .user-photo img {
    width: 100%;
    height: 100%;
}

.nav-right .account-info h1 {
    max-height: 25px;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 31px;

    text-align: center;
    color: #3A3D42;
    margin: 0 0 0 0;
}

.nav-right .account-info p {
    grid-area: telephone;
    max-height: 25px;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 24px;

    color: rgba(58, 61, 66, 0.9);
    text-align: center;
}

.nav-right .account-info .notification {
    grid-area: notification;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0;
    max-height: 55px;
}
@media screen and (max-width:576px){
  .nav-left h1 {
    text-align: center;
    margin: 50px 0 0 auto;
    width: 100%;
  }

  .nav-right {
    display: flex;
    justify-content: center;
  }

  .nav-right .account-info {
    margin: 50px auto 50px auto;
  }
}

</style>
