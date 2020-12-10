<template>
  <div class="detail-profile">
    <div class="profile-information">
      <div class="header-profile">
        <div class="photo-profile">
          <img
            class="photo"
            :src="
              this.token.photo === null
                ? '/img/user-avatar.png'
                : this.token.photo
            "
            alt=""
          />
        </div>
          <input
            style="display:none;"
            id="imageUpload"
            type="file"
            name="photo"
            accept="image/png,image/gif,image/jpeg,/image/jpg"
          />
          <label style="display:block;display:flex;justify-content:center;" for="imageUpload"
            ><img src="/img/edit-2.png" alt="" id="" /><span style="">Edit</span></label
          >
      </div>
      <div class="profile-name">
        <h1>{{this.token.firstName}}</h1>
        <p>{{this.token.phoneNumber}}</p>
      </div>
    </div>
    <div class="profile-menu">
      <div class="personal-information list-menu">
        <div class="list-menu-left">
          <p>
            <router-link class="text-decoration" to="/home/personalinformation"
              >Personal Information</router-link
            >
          </p>
        </div>
        <div class="list-menu-right">
          <img src="/img/arrow-left.png" alt="" />
        </div>
      </div>
      <div class="change-password list-menu">
        <div class="list-menu-left">
          <p>Change Password</p>
        </div>
        <div class="list-menu-right">
          <img src="/img/arrow-left.png" alt="" />
        </div>
      </div>
      <div class="change-pin list-menu">
        <div class="list-menu-left">
          <p>Change PIN</p>
        </div>
        <div class="list-menu-right">
          <img src="/img/arrow-left.png" alt="" />
        </div>
      </div>
      <div class="logout list-menu">
        <div class="list-menu-left">
          <p>Logout</p>
        </div>
        <div class="list-menu-right">
          <img src="/img/arrow-left.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
export default {
  name: 'Profile',
  props: ['token'],
  data () {
    return {
      userData: this.token,
      id: this.token.id
    }
  },
  methods: {
    updateImage () {
      const id = this.id
      $('#imageUpload').change(function () {
        if (this.files && this.files[0]) {
          var reader = new FileReader()
          reader.onload = function (e) {
            $('.photo').attr('src', e.target.result)
          }
          const form = new FormData()
          form.append('photo', document.getElementById('imageUpload').files[0])
          axios.patch(`${process.env.VUE_APP_SERVICE_API}/v1/users/photo/${id}`, form, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then(() => {
              reader.readAsDataURL(this.files[0])
              alert('photo has been changed successfully')
            })
            .catch(() => {
              alert('photo has failed to change')
            })
        }
      })
    }
  },
  mounted () {
    this.updateImage()
  }
}
</script>

<style scoped>
.detail-profile {
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 25px;
  padding: 50px;
}
.header-profile {
  margin: 50px 0 0 0;
}

.profile-name {
  margin: 20px 0 0 0;
}
.photo-profile {
  width: 100px;
  height: 100px;
}
.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}
.profile-name h1 {
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  color: #4d4b57;
}

.profile-name p {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 27px;
  text-align: center;
  color: #7a7886;
}

.photo-profile {
  display: block;
  margin: 0 auto;
}

.header-profile p {
  margin: 10px 0 0 0;
  text-align: center;
}

.profile-menu {
  display: grid;
  gap: 20px 0;
}

.list-menu {
  width: 433px;
  height: max-content;
  margin: 0 auto;
  background: #e5e8ed;
  border-radius: 10px;

  display: grid;
  grid-template-columns: 5fr 0.5fr;
  grid-template-rows: max-content;
  grid-template-areas: "list-menu-left list-menu-right";
}

.list-menu-left {
  padding: 10px 0;
  grid-area: list-menu-left;
  box-sizing: border-box;
}

.list-menu-left p {
  margin: 10px 20px;
  font-style: 700;
  font-weight: bold;
  font-size: 16px;
  line-height: 28px;
  color: #4d4b57;
}
.text-decoration {
  color: #4d4b57;
  text-decoration: none;
}
.list-menu-right {
  grid-area: list-menu-right;
}

.list-menu-right img {
  display: block;
  margin: 20px 0;
}
@media screen and (max-width: 992px) {
  .detail-profile {
    padding: 50px 0;
  }
}
@media (max-width: 576px) {
  .list-menu {
    width: 250px;
  }

  .detail-profile .balance-amount {
    text-align: center;
  }

  .detail-profile .balance {
    text-align: center;
  }

  .detail-profile .telephone {
    text-align: center;
    margin: 0 auto 0 auto;
  }

  .detail-profile .transfer {
    margin: 0 auto 0 auto;
  }

  .detail-profile .topup {
    margin: 0 auto 50px auto;
  }
}
@media screen and (max-width: 356px) {
  .list-menu {
    width: 160px;
  }
  .list-menu-right {
    margin: auto 5px auto auto;
  }
}
</style>
