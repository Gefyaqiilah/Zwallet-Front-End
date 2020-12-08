<template>
  <div class="change-password">
    <div class="change-password-title">
      <p class="title">Change PIN</p>
      <p class="title-desc">
          Enter your current 6 digits Zwallet PIN below to continue to the next steps.            </p>
    </div>
    <div class="form-change-password">
      <form action="" class="form">
          <div class="form-group row justify-content-center">
              <div class="col-md-7 email-position">
                  <div class="input-group pin">
                      <input type="text" maxlength="1" class="form-control pin-1" name="" id="" required>
                      <input type="text" maxlength="1" class="form-control pin-2 ml-3" name="" id="" required>
                      <input type="text" maxlength="1" class="form-control pin-3 ml-3" name="" id="" required>
                      <input type="text" maxlength="1" class="form-control pin-4 ml-3" name="" id="" required>
                      <input type="text" maxlength="1" class="form-control pin-5 ml-3" name="" id="" required>
                      <input type="text" maxlength="1" class="form-control pin-6 ml-3" name="" id="" required>
                    </div>
              </div>
          </div>
          <div class="row mt-5 justify-content-center">
              <div class="col-md-7 btn-login-position">
                  <button class="change-password-btn">Continue</button>
              </div>
          </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {

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
    border: 1px solid rgba(169, 169, 169, 0.8);
    height: 65px;
    overflow: hidden !important;
    border-radius: 10px !important;

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

.pin {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    /* margin: 0 0 0 100px; */
    /* margin: 0 auto; */
}

.pin-1 {
    font-weight: 700;
    text-align: center;
}

.pin-2 {
    font-weight: 700;
    text-align: center;
}

.pin-3 {
    font-weight: 700;
    text-align: center;
}

.pin-4 {
    font-weight: 700;
    text-align: center;
}

.pin-5 {
    font-weight: 700;
    text-align: center;
}

.pin-6 {
    font-weight: 700;
    text-align: center;
}

.col-md-9.email-position {
    margin: 50px auto 0 auto;
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
