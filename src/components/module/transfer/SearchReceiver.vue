<template>
<div class="search-receiver">
  <div class="search-receiver-title">
    <p>Search Receiver</p>
    <button class="login-btn btn-text-white" v-on:click.prevent="sortByName">Sort by name</button>
  </div>
  <div class="search-input">
    <div class="input-group">
        <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"><img src="/img/search.png" alt=""></span>
          </div>
          <input type="text" @keyup.enter="searchReceiver"  v-model="search" class="form-control search-input-text shadow-none" placeholder="Search firstname receiver in here and PRESS ENTER" aria-label="Username" aria-describedby="basic-addon1">
          </div>
      </div>
  <div v-if="!search" class="list-receiver">
    <div v-for="listReceiver in userReceiver" :key="listReceiver.id" class="receiver">
        <div class="thumbnail-photo">
            <img class="photo" :src="listReceiver.photo === null? '/img/user-avatar.png' :listReceiver.photo" :alt="listReceiver.firstName + ' Foto'">
        </div>
        <div class="detail-username">
            <p class=""><router-link class="username" :to="'/home/inputamount/'+listReceiver.id">{{listReceiver.firstName +' '}}{{listReceiver.lastName !==null ? listReceiver.lastName : ''}}</router-link></p>
            <p class="telephone">{{listReceiver.phoneNumber}}</p>
        </div>
    </div>
  </div>
  <div v-if="search" class="list-receiver">
    <div v-for="listReceiver in searchUser" :key="listReceiver.id" class="receiver">
        <div class="thumbnail-photo">
            <img class="photo" :src="listReceiver.photo === null? '/img/user-avatar.png' :listReceiver.photo" :alt="listReceiver.firstName + ' Foto'">
        </div>
        <div class="detail-username">
            <p class="username"><router-link class="username" :to="'/home/inputamount/'+listReceiver.id">{{listReceiver.firstName +' '}}{{listReceiver.lastName !==null ? listReceiver.lastName : ''}}</router-link></p>
            <p class="telephone">{{listReceiver.phoneNumber}}</p>
        </div>
    </div>
  </div>
  <div v-observe-visibility="handleScrolledBottom">
  </div>
</div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  name: 'SearchReceiver',
  props: ['token'],
  data: () => {
    return {
      search: '',
      searchUser: [],
      userReceiver: [],
      toggleSort: true,
      page: 1
    }
  },
  methods: {
    async fetchReceiver () {
      const fetchReceiver = await axios.get(`${process.env.VUE_APP_SERVICE_API}/v1/users?page=${this.page}`)
      console.log('fetchReceiver.data.result.users :>> ', fetchReceiver.data.result.users)
      const filter = fetchReceiver.data.result.users.filter(el => el.id !== this.getUserData.id)
      this.userReceiver.push(...filter)
    },
    async searchReceiver () {
      try {
        const searchReceiver = await axios.get(`${process.env.VUE_APP_SERVICE_API}/v1/users/search?firstName=${this.search}`)
        const filter = searchReceiver.data.result.filter(el => el.id !== this.getUserData.id)
        this.searchUser = filter
      } catch (error) {
      }
    },
    handleScrolledBottom (isVisible) {
      if (isVisible) {
        this.page++
        this.fetchReceiver()
      }
    },
    sortByName () {
      if (this.toggleSort) {
        this.userReceiver.sort((a, b) => {
          if (a.firstName.toUpperCase() < b.firstName.toUpperCase()) return -1
          if (a.firstName.toUpperCase() > b.firstName.toUpperCase()) return 1
          return 0
        })
        this.toggleSort = false
      } else {
        this.userReceiver.sort((a, b) => {
          if (b.firstName.toUpperCase() < a.firstName.toUpperCase()) return -1
          if (b.firstName.toUpperCase() > a.firstName.toUpperCase()) return 1
          return 0
        })
        this.toggleSort = true
      }
    }
  },
  mounted () {
    this.fetchReceiver()
  },
  computed: {
    ...mapGetters(['getUserData'])
  }
}
</script>

<style scoped>
.search-receiver {
    background: #FFFFFF;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 25px;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 100px max-content max-content;
    grid-template-areas:
        'search-receiver-title'
        'search-input'
        'list-receiver'
    ;
}

.search-receiver-title {
    grid-area: search-receiver-title;

    display: flex;
    align-items: center;
}
.photo{
  width:100%;
  height:100%;
  object-fit: cover;
  border-radius: 10px;
}
.search-receiver-title {
    margin: 0 30px 0 30px;
}

.search-receiver-title p {
    font-weight: 700;
    font-size: 18px;
    color: #3A3D42;
}

.search-input {
    margin: 0 30px 0 30px;
}

::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    color: rgba(169, 169, 169, 0.8) !important;
}

.search-input-text {
    height: 54px;
    border-radius: 12px;
    border: none !important;
    background: rgba(58, 61, 66, 0.1) !important;

}

.form-control:focus {
    outline: none !important;
}

.input-group-text {
    background: rgba(58, 61, 66, 0.1) !important;
    border-top-left-radius: 12px !important;
    border-bottom-left-radius: 12px !important;
    border: none !important;
}

.input-group-prepend {
    border: none !important;
    margin: 0;
}

.list-receiver {
    grid-area: list-receiver;
    margin: 30px 30px 0 30px;
}

.list-receiver {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: max-content;
    gap: 10px 0;
}

.receiver {
    display: grid;
    grid-template-columns: 0.4fr 5fr;
    grid-template-rows: 110px;
    grid-template-areas: 'thumbnail-photo detail-username';

    background: #FFFFFF;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
}

.receiver .thumbnail-photo {
    grid-area: thumbnail-photo;
    width:60px;
    height:60px;
    margin: auto 0 auto 15px;
    border-radius:10px;
}

.receiver .detail-username {
    grid-area: detail-username;
    margin: auto 0 auto 20px;
}

.receiver .detail-username .username {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    color: #4D4B57;
}

.receiver .detail-username .telephone {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #7A7886;
}
/* button */
.login-btn {
    width: max-content;
    height: max-content;
    background: #6379F4;
    margin-left:auto;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
    border-radius: 12px;
}
.login-btn:focus{
  outline:none;
}
.signup-btn {
    width: max-content;
    height: max-content;
    background: #FFFFFF;
    border: 2px solid #6379F4;
    box-sizing: border-box;
    box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
    border-radius: 12px;
}
.signup-btn:focus{
  outline: none;
}
.btn-text-white {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    color: #FFFFFF;
}

.btn-text-purple {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 25px;
    text-align: center;
    color: #6379F4;
}
</style>
