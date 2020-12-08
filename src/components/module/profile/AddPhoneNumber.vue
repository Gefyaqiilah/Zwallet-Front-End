<template>
  <div class="change-password">
    <div class="change-password-title">
      <p class="title">Add Phone Number</p>
      <p class="title-desc">
          Add at least one phone number for the transfer ID so you can start transfering your money to another user.            </p>
    </div>
    <div class="form-change-password">
      <form action="" class="form ">
          <div class="form-group row justify-content-center">
              <div class="col-md-7 username-position">
                  <div class="input-group">
                      <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1"><img src="assets/img/telephone.png" alt=""></span>
                      </div>
                      <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1">+62</span>
                      </div>
                      <input type="number" v-model="phoneNumber" id="phoneNumber" class="form-control input-border-bottom shadow-none" placeholder="Enter your phone number" aria-label="Username" aria-describedby="basic-addon1">
                  </div>
              </div>
          </div>
          <div class="row mt-5 justify-content-center">
              <div class="col-md-7 btn-login-position">
                  <button class="change-password-btn" v-on:click.prevent="addPhoneNumber">Add Phone Number</button>
              </div>
          </div>
      </form>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
export default {
  name: 'AddPhoneNumber',
  props: ['token'],
  data () {
    return {
      phoneNumber: '',
      userData: this.token.token
    }
  },
  methods: {
    detectInputInserted () {
      $(document).on('change', function () {
        const buttonSignUp = document.querySelector('.change-password-btn')
        if ($('#phoneNumber').val() !== '') {
          buttonSignUp.style.background = '#6379F4'
          buttonSignUp.style.color = 'white'
        } else {
          buttonSignUp.style.background = '#DADADA'
          buttonSignUp.style.color = '#88888F'
        }
      })
    },
    async addPhoneNumber () {
      const id = this.userData.id
      try {
        await axios.patch(`${process.env.VUE_APP_SERVICE_API}/users/${id}`, {
          phoneNumber: this.phoneNumber
        }, {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}` }
        })
        this.$router.replace('/home')
      } catch (error) {
        console.log(error)
      }
    },
    redirect () {
      if (!localStorage.getItem('dataUser') || JSON.parse(localStorage.getItem('dataUser')).phoneNumber !== null) {
        this.$router.replace('/auth/login')
      }
    }
  },
  mounted () {
    this.detectInputInserted()
    this.redirect()
  }
}
</script>

<style scoped>

.change-password {
    background: #FFFFFF;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 25px;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, max-content) max-content repeat(1, max-content);
    grid-template-areas:
        'change-password-title'
        'form-change-password'
        'button-continue'
    ;
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
    color: #4D4B57;
}

.change-password-title {
    grid-area: change-password-title;

    display: flex;
}

.form-change-password {
    grid-area: form-change-password;
}

.change-password-title .title {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    color: #3A3D42;
}

.change-password-title .title-desc {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: #7A7886;
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
    color: #7A7886;
}

.bold {
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 30px;
    color: #514F5B;
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
    background: #DADADA;
    box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);

    border-radius: 12px;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    outline: none;

    color: #88888F;
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
    color: #6379F4;
}
</style>
