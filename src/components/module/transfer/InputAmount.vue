/* eslint-disable vue/no-parsing-error */
<template>
  <div class="transfer-to">
    <div class="transfer-to-title">
      <p>Transfer To</p>
    </div>
    <div v-for="user in userReceiver" :key="user.id" class="transfer-to-user">
      <div class="receiver">
          <div class="thumbnail-photo">
              <img class="photo" :src="user.photo === null ? '/img/user-avatar.png':user.photo" :alt="user.firstName">
          </div>
          <div class="detail-username">
              <p class="username">{{user.firstName}}</p>
              <p class="telephone">{{user.phoneNumber}}</p>
          </div>
      </div>
    </div>
    <div class="detail-amount">
      <p class="desc">
        Type the amount you want to transfer and then
press continue to the next steps.
      </p>
    <form action=""  v-on:submit.prevent="toConfirmation" method="">
    <div class="field-amount">
        <div class="form-group">
          <div class="input-group" style="display:flex; justify-content:center;">
          <div class="input-group-prepend">
            <span class="rp" id="basic-addon1">Rp.</span>
          </div>
         <input style="block" v-model="inputAmount" type="number" id="amount" class="form-control input-amount shadow-none" placeholder="0.00" aria-label="Username" aria-describedby="basic-addon1" required>
              </div>
          </div>
    </div>
      <p style="color:black;text-align:center;font-weight:700;">
        {{getUserData.balance == 0 ? `Oops! your balance is not enough`:`Rp.${new Number(getUserData.balance).toLocaleString('id-ID')} available` }}
        </p>
          <div class="form-group form-position">
            <div class="input-group input-group-position">
               <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"><img src="/img/vector.png" alt=""></span>
                    </div>
                <input type="text" maxlength="30" id="notes" v-model="inputNotes" class="form-control input-notes shadow-none" placeholder="Add some notes" aria-label="Username" aria-describedby="basic-addon1">
            </div>
          </div>
          <div class="button-continue">
        <button type="submit" class="btn-confirm">Continue</button>
      </div>
    </form>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'InputAmount',
  data () {
    return {
      userReceiver: [],
      inputAmount: '',
      inputNotes: '',
      balance: JSON.parse(localStorage.getItem('dataUser')).balance
    }
  },
  methods: {
    ...mapActions(['getReceiver', 'getDetailUserData']),
    async handleGetReceiver () {
      this.getReceiver(this.$route.params.idUser)
        .then(results => {
          this.userReceiver.push(...results.data.result)
        })
    },
    async toConfirmation () {
      if (parseInt(this.getUserData.balance) <= parseInt(this.inputAmount)) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your balance is not enough :('
        })
        return this.$router.push('/home')
      } else {
        this.$router.push({
          name: 'Confirmation', query: { idReceiver: this.$route.params.idUser, amount: this.inputAmount, notes: this.inputNotes }
        })
      }
    }
  },
  async mounted () {
    this.handleGetReceiver()
    await this.getDetailUserData()
  },
  computed: {
    balanceSender () {
      return JSON.parse(localStorage.getItem('dataUser').balance)
    },
    ...mapGetters(['getUserData'])
  }
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.transfer-to {
    background: #FFFFFF;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 25px;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 100px max-content max-content;
    grid-template-areas:
        'transfer-to-title'
        'transfer-to-user'
        'detail-amount'
        'button-continue'
    ;
}

.transfer-to-title {
    grid-area: transfer-to-title;

    display: flex;
    align-items: center;
}
.photo{
  width:60px;
  border-radius:10px;
  /* height:60px; */
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
    margin: auto 20px;
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

.transfer-to-title p {
    font-weight: 700;
    font-size: 18px;
    color: #3A3D42;
}

.transfer-to-title {
    margin: 0 30px 0 30px;
}

.transfer-to .transfer-to-user {
    grid-area: transfer-to-user;
    margin: 0 30px 0 30px;
}
.detail-amount{
  grid-area:detail-amount;
  padding:30px 20px;
}
.field-amount{
  margin: 50px 0 0 0 ;
}
.input-amount{
  display: block;
 max-width:200px;
 height:56px;
 font-style: normal;
font-weight: 700;
font-size: 42px;
line-height: 56px;
text-align: center;
color: #6379F4;
}
.rp{
font-style: normal;
font-weight: 700;
font-size: 42px;
line-height: 56px;
text-align: center;
color: #6379F4;
}
.input-notes{
  display: block;
 max-width:250px;
 font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 56px;
color:black;
}
.form-position{
  display:block;
  display:flex;
  justify-items: center;
  /* padding:50px; */
}
.input-group-position{
 justify-content: center;
}
.desc{
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
  color: #7A7886;
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

.transfer-to .button-continue {
    grid-area: button-continue;

    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
}

.btn-confirm {
    background: #6379F4;
    box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
    border-radius: 12px;
    border: none;
    width: 170px;
    height: 57px;

    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    color: #FFFFFF;
    margin: 0 30px 30px 0;

    outline: none;
}
/* Form */
.input-amount {
    border-top: none !important;
    border-right: none !important;
    border-left: none !important;
    border-bottom: none !important;
    border-radius: 0 !important;
}
.input-notes {
    border-top: none !important;
    border-right: none !important;
    border-left: none !important;
    border-bottom: 1.5px solid  rgba(169, 169, 169, 0.6) !important;
    border-radius: 0 !important;
}

.input-amount::placeholder {
font-weight: 700;
font-size: 42px;
line-height: 56px;
text-align: center;
    color: rgba(169, 169, 169, 0.8) !important;
}
.input-notes::placeholder {
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 23px;
color: rgba(169, 169, 169, 0.8);
}

.input-group-text {
    border-top: none !important;
    border-right: none !important;
    border-left: none !important;
    border-bottom: none !important;
    border-radius: 0 !important;
    background-color: transparent !important;
    margin: 0 auto !important;
}

.input-group-prepend {
    border-top: none !important;
    border-right: none !important;
    border-left: none !important;
    border-bottom: 1.5px !important;
    border-radius: 0 !important;
    background-color: transparent !important;
}
@media screen and (max-width:400px) {
  .btn-confirm{
    display: block;
    margin:0 auto;
    margin-bottom:30px;
  }
}
</style>
