<template>
 <div class="container">
    <h2 class="title">Secure Your Account, Your Wallet,
        and Your Data With 6 Digits PIN
        That You Created Yourself.</h2>
    <p class="title-desc">
        Create 6 digits pin to secure all your money and your data in Zwallet app. Keep it secret and don’t tell anyone about your Zwallet account password and the PIN.
    </p>
    <form action="" class="form">
        <div class="row">
            <div class="col-md-9 email-position ">
                <div class="input-group pin">
                    <input type="password" v-model="pin1" onkeypress="return this.value.length < 1;" oninput="if(this.value.length>=1) { this.value = this.value.slice(0,1; }"  class="form-control pin-1" required>
                    <input type="password" v-model="pin2" onkeypress="return this.value.length < 1;" oninput="if(this.value.length>=1) { this.value = this.value.slice(0,1); }" class="form-control pin-2" required>
                    <input type="password" v-model="pin3" onkeypress="return this.value.length < 1;" oninput="if(this.value.length>=1) { this.value = this.value.slice(0,1); }" class="form-control pin-3" required>
                    <input type="password" v-model="pin4" onkeypress="return this.value.length < 1;" oninput="if(this.value.length>=1) { this.value = this.value.slice(0,1); }" class="form-control pin-4" required>
                    <input type="password" v-model="pin5" onkeypress="return this.value.length < 1;" oninput="if(this.value.length>=1) { this.value = this.value.slice(0,1); }" class="form-control pin-5" required>
                    <input type="password" v-model="pin6" onkeypress="return this.value.length < 1;" oninput="if(this.value.length>=1) { this.value = this.value.slice(0,1); }" class="form-control pin-6" required>
                </div>
            </div>
            <div class="col-md-9 btn-login-position">
              <button type="submit" @click.prevent="handleCreatePin" class="btn-confirm">Confirm</button>
            </div>
        </div>
    </form>
  </div>
</template>

<script>
import $ from 'jquery'
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'CreatePin',
  data () {
    return {
      pin1: '',
      pin2: '',
      pin3: '',
      pin4: '',
      pin5: '',
      pin6: '',
      id: JSON.parse(localStorage.getItem('dataUser')).id
    }
  },
  methods: {
    detectInputInserted () {
      $(document).on('change', function () {
        const buttonSignUp = document.querySelector('.btn-confirm')
        if ($('.pin-1').val() !== '' && $('.pin-2').val() !== '' && $('.pin-3').val() !== '' && $('.pin-4').val() !== '' && $('.pin-5').val() !== '' && $('.pin-6').val() !== '') {
          buttonSignUp.style.background = '#6379F4'
          buttonSignUp.style.color = 'white'
        } else {
          buttonSignUp.style.background = '#DADADA'
          buttonSignUp.style.color = '#88888F'
        }
      })
    },
    ...mapActions(['createPin']),
    handleCreatePin () {
      const payload = {
        id: this.id,
        pin: parseInt(this.pin1 + this.pin2 + this.pin3 + this.pin4 + this.pin5 + this.pin6)
      }
      this.createPin(payload)
        .then(async () => {
          await this.handleSetFromIo(payload.id)
          alert('successfully added your pin')
          this.$router.push('/home')
        })
    },
    ...mapMutations(['SET_FROM_IO']),
    handleSetFromIo (id) {
      this.$socket.emit('getUserData', id)
      this.sockets.subscribe('getUserData', data => {
        this.SET_FROM_IO(data[0])
      })
    }
  },
  mounted () {
    this.detectInputInserted()
  }
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
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
    border: 1px solid rgba(169, 169, 169, 0.8);
    min-width: 30px;
    max-width:70px;
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

.btn-confirm {
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

.pin {
    display: flex;
    flex-direction: row;
}

.pin-1 {
    margin: 5px;
    font-weight: 700;
    text-align: center;
}

.pin-2 {
    margin: 5px;
    font-weight: 700;
    text-align: center;
}

.pin-3 {
    margin: 5px;
    font-weight: 700;
    text-align: center;
}

.pin-4 {
    margin: 5px;
    font-weight: 700;
    text-align: center;
}

.pin-5 {
    margin: 5px;
    font-weight: 700;
    text-align: center;
}

.pin-6 {
    margin: 5px;
    font-weight: 700;
    text-align: center;
}
</style>
