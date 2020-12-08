<template>
<div class="container">
  <h2 class="title">Did You Forgot Your Password?
      Don’t Worry, You Can Reset Your
      Password In a Minutes.</h2>
  <p class="title-desc">To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.</p>
  <form action="" class="form">
      <div class="form-group row">
          <div class="col-md-9 email-position">
              <div class="input-group">
                  <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"><img src="/img/mail.png" alt=""></span>
                  </div>
                  <input type="email" id="email" class="form-control input-border-bottom" placeholder="Enter your e-mail" aria-label="Username" aria-describedby="basic-addon1" required>
              </div>
          </div>
              <div class="col-md-9 btn-login-position">
              <button class="btn-confirm">Confirm</button>
              </div>
        </div>
  </form>
</div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'ResetPassword',
  methods: {
    detectInputInserted () {
      $(document).on('change', function () {
        const buttonSignUp = document.querySelector('.btn-confirm')
        if ($('#email').val() !== '') {
          buttonSignUp.style.background = '#6379F4'
          buttonSignUp.style.color = 'white'
        } else {
          buttonSignUp.style.background = '#DADADA'
          buttonSignUp.style.color = '#88888F'
        }
      })
    }
  },
  mounted () {
    this.detectInputInserted()
  }
}
</script>

<style scoped>
/* Side Right */
.side-right .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 33px;

    color: #3A3D42;
    max-width: 384px;
    margin: 50px 0 0 10px;
}

.side-right .title-desc {
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

.col-md-9.btn-login-position {
    margin: 70px 0 0 0;
}

.btn-confirm{
    width: 100%;
    height: 57px;
    border: none;
    background-color: #DADADA;
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
