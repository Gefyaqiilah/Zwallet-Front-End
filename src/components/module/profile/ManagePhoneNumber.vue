<template>
  <div class="change-password">
    <div class="change-password-title">
      <p class="title">Manage Phone Number</p>
      <p class="title-desc">
        You can only delete the phone number and then you must add another phone
        number.
      </p>
    </div>
    <div v-if="userData.phoneNumber" class="details-phone-number">
      <div class="details-number">
        <div class="details-phone-title title gap">
          <p>Primary</p>
        </div>
        <div class="bold gap phone-grid">
          <p class="number">{{ userData.phoneNumber }}</p>
        <div class="delete">
          <router-link :to="'/home/editphonenumber'+'?type=primary'"><img src="/img/edit-2.png" alt="" /></router-link>
          <img @click.prevent="handleDeletePhoneNumber('primary')" src="/img/trash.png" alt="" />

        </div>
        </div>
      </div>
    </div>
    <div v-if="!userData.phoneNumber" class="details-phone-number">
      <div class="details-number">
        <div class="details-phone-title title gap">
          <p>Add Primary Phone Number</p>
        </div>
        <div class="bold gap phone-grid">
          <p class="number">Add Phone Number</p>
        <div class="delete">
          <router-link :to="'/home/addPhoneNumber'+'?type=primary'"><img src="/img/edit-2.png" alt="" /></router-link>
        </div>
        </div>
      </div>
    </div>
    <div v-if="userData.phoneNumberSecond" class="details-phone-number">
      <div class="details-number">
        <div class="details-phone-title title gap">
          <p>Secondary</p>
        </div>
        <div class="bold gap phone-grid">
          <p class="number">{{ userData.phoneNumberSecond }}</p>
        <div class="delete">
          <router-link :to="'/home/editphonenumber'+'?type=secondary'"><img src="/img/edit-2.png" alt="" /></router-link>
          <img @click.prevent="handleDeletePhoneNumber('secondary')" src="/img/trash.png" alt="" />
        </div>
        </div>
      </div>
    </div>
    <div v-if="!userData.phoneNumberSecond" class="details-phone-number">
      <div class="details-number">
        <div class="details-phone-title title gap">
          <p>Add Secondary Phone Number</p>
        </div>
        <div class="bold gap phone-grid">
          <p class="number">Add Secondary Phone Number</p>
        <div class="delete">
          <router-link :to="'/home/addPhoneNumber'+'?type=secondary'"><img src="/img/edit-2.png" alt="" /></router-link>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ManagePhoneNumber',
  props: ['token'],
  data () {
    return {
      userData: this.token
    }
  },
  methods: {
    ...mapActions(['deletePhoneNumber']),
    handleDeletePhoneNumber (type) {
      let data = null
      if (type === 'primary') {
        data = { phoneNumber: '' }
      } else if (type === 'secondary') {
        data = { phoneNumberSecond: '' }
      }
      alert(data)
      const payload = {
        idUser: this.handleIdUser,
        phoneNumber: {
          ...data
        }
      }
      this.deletePhoneNumber(payload)
        .then(() => {
          alert('successfully deleted the phone number')
        })
    }
  },
  computed: {
    ...mapGetters(['getUserData']),
    handleIdUser () {
      return this.getUserData.id
    }
  }
}
</script>

<style scoped>
.change-password {
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 25px;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, max-content);
  grid-auto-rows:max-content;
  box-sizing:content-box;
  padding:50px;
  gap: 30px 0;
}

.info-succeed {
  grid-area: info-succeed;

  display: grid;
  grid-template-columns: max-content;
  grid-template-rows: max-content;
  align-content: center;
  gap: 10px 0;
  justify-content: center;
  margin: 0 30px 0 30px;
}
.phone-grid{
  display: grid;
  grid-template-columns: 80% 20%;
  grid-template-areas: 'number delete'
}
.number{
  grid-area:number;
}
.delete{
  grid-area:delete;
  margin:auto auto;
}
.delete img{
  margin:0 0 20px 0;
}
.info-succeed img {
  display: block;
  margin: 30px 0 0 50px;
}

.info-succeed .succeed {
  text-align: center;
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 30px;
  text-align: center;
  color: #4d4b57;
}

.change-password-title {

  display: flex;
}

.details-phone-number {
  display: grid;
  grid-template-columns:100%;
  grid-template-rows: 92px;
  grid-template-areas: "amount";
  margin: 20px 30px 0 30px;
}

.details-phone-number .details-number {
  grid-area: amount;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding-top: 15px;
  padding-left: 15px;
}

.change-password-title .title {
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #3a3d42;
}

.change-password-title .title-desc {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
  color: #7a7886;
}

.change-password-title {
  display: flex;
  flex-direction: column;
  margin: 30px 30px 0 30px;
}

.title {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #7a7886;
}

.bold {
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 30px;
  color: #514f5b;
}

/* Form */
.form {
  /* margin: 70px auto 0 auto; */
  padding: 10px;
}

.form-control {
  border-top: none !important;
  border-right: none !important;
  border-left: none !important;
  border-bottom: 1.5px solid rgba(169, 169, 169, 0.6) !important;
  border-radius: 0 !important;
}

::placeholder {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 23px;
  /* identical to box height, or 144% */

  color: rgba(169, 169, 169, 0.8) !important;
}

.input-group-text {
  border-top: none !important;
  border-right: none !important;
  border-left: none !important;
  border-bottom: 1.5px solid rgba(169, 169, 169, 0.6) !important;
  border-radius: 0 !important;
  background-color: transparent !important;
}

.input-group-prepend {
  border-top: none !important;
  border-right: none !important;
  border-left: none !important;
  border-bottom: none !important;
  border-radius: 0 !important;
  background-color: transparent !important;
}

.col-md-9.email-position {
  margin: 50px auto 0 0;
}

.col-md-9.pass-position {
  margin: 50px auto 0 0;
}

.col-md-9.forgot-position {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 171% */

  color: rgba(58, 61, 66, 0.8);
  margin: 30px 0 0 0;
}

.col-md-9.forgot-position p {
  text-align: end;
}

.col-md-9.btn-login-position {
  margin: 70px 0 0 0;
}

.change-password-btn {
  width: 100%;
  height: 57px;
  border: none;
  background: #dadada;
  box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);

  border-radius: 12px;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  outline: none;

  color: #88888f;
}

.col-md-9.signup-position {
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  /* or 144% */

  text-align: center;

  color: rgba(58, 61, 66, 0.8);
  margin: 50px 0 0 0;
}

.col-md-9.signup-position p {
  text-align: center;
}

.col-md-9.signup-position p .signup {
  color: #6379f4;
}
</style>
