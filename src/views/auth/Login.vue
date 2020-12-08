<template>
  <div class="container">
    <h2 class="title">
      Start Accessing Banking Needs With All Devices and All Platforms With
      30.000+ Users
    </h2>
    <p class="title-desc">
      Transfering money is eassier than ever, you can access Zwallet wherever
      you are. Desktop, laptop, mobile phone? we cover all of that for you!
    </p>
    <form action="" class="form">
      <div class="form-group row">
        <div class="col-md-9 email-position">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"
                ><img src="/img/mail.png" alt=""
              /></span>
            </div>
            <input
              type="email"
              v-model="email"
              id="email"
              class="form-control input-border-bottom shadow-none"
              placeholder="Enter your e-mail"
              aria-label="Username"
              aria-describedby="basic-addon1"
              required
            />
          </div>
        </div>
        <div class="col-md-9 pass-position">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"
                ><img src="/img/lock.png" alt=""
              /></span>
            </div>
            <input
              type="password"
              v-model="password"
              id="password"
              class="form-control input-border-bottom shadow-none"
              placeholder="Enter your password"
              aria-label="Username"
              aria-describedby="basic-addon1"
              required
            />
          </div>
        </div>
      </div>
      <div class="col-md-9 forgot-position">
        <p>Forgot password?</p>
      </div>
      <div class="col-md-9 btn-login-position">
        <button v-on:click.prevent="userLogin" class="btn-login">Login</button>
      </div>
      <div class="col-md-9 signup-position">
        <p>Don’t have an account? Let’s <span class="signup">Sign Up</span></p>
      </div>
    </form>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import jwt from 'jsonwebtoken'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    userLogin () {
      axios
        .post(`${process.env.VUE_APP_SERVICE_API}/users/login`, {
          email: this.email,
          password: this.password
        })
        .then(async results => {
          if (results.status === 200) {
            const accessToken = results.data.result.accessToken
            const refreshToken = results.data.result.refreshToken
            const decoded = jwt.verify(accessToken, process.env.VUE_APP_JWT_KEY)
            localStorage.setItem('dataUser', JSON.stringify(decoded))
            localStorage.setItem('refreshToken', refreshToken)
            localStorage.setItem('accessToken', accessToken)
            alert('Login successful')
            this.$router.push('/home')
          }
        })
        .catch(() => {
          alert('Looks like server having trouble')
        })
    },
    detectInputInserted () {
      $(document).on('change', function () {
        const buttonSignUp = document.querySelector('.btn-login')
        if ($('#email').val() !== '' && $('#password').val() !== '') {
          buttonSignUp.style.background = '#6379F4'
          buttonSignUp.style.color = 'white'
        } else {
          buttonSignUp.style.background = '#DADADA'
          buttonSignUp.style.color = '#88888F'
        }
      })
    },
    redirect () {
      if (localStorage.getItem('dataUser')) {
        this.$router.push('/home')
      }
    },
    showPassword () {
      const inputPassword = document.getElementById('password')
      if (inputPassword.type === 'password') {
        inputPassword.type = 'text'
      } else {
        inputPassword.type = 'password'
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
.title {
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;

  color: #3a3d42;
  max-width: 384px;
  margin: 50px 0 0 10px;
}
.title-desc {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;

  color: rgba(58, 61, 66, 0.6);
  max-width: 433px;
  margin: 50px auto 0 10px;
}
/* Form */
.form {
  margin: 70px 0 0 10px;
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
  color: rgba(169, 169, 169, 0.8) !important;
}

.input-group-text {
  border-top: none !important;
  border-right: none !important;
  border-left: none !important;
  border-bottom: 1.5px solid rgba(169, 169, 169, 0.6);
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
  margin: 0 auto 0 0;
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

.btn-login {
  width: 100%;
  height: 57px;
  border: none;
  background-color: #dadada;
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
  cursor: pointer;
}
</style>
