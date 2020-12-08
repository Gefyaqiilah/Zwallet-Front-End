<template>
<div class="balance-detail">
  <div class="container">
      <div class="row">
          <div class="col-12 col-sm-6 col-md-6">
              <p class="mt-4 ml-2 balance">Balance</p>
              <h1 class="ml-2 balance-amount">Rp.{{userBalance}}</h1>
              <p class="ml-2 telephone">{{userNumber}}</p>
          </div>
          <div class="col-12 col-sm-6 col-md-6">
              <div class="row justify-content-end mt-4 mr-3">
                  <button class="transfer col-md-6" v-on:click.prevent="linkTransfer"><img src="/img/plus.png" alt="">Transfer</button>
                  <div class="w-100"></div>

                  <button class="topup col-md-6 mt-3"><router-link class="topup-text" to="/home/topup"><img src="/img/arrow-up.png" alt=""> Top Up</router-link> </button>

              </div>
          </div>
      </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'BalanceDetail',
  data () {
    return {
      userNumber: this.phoneNumber !== null ? this.phoneNumber : '-',
      userBalance: this.balance
    }
  },
  props: ['phoneNumber', 'balance'],
  methods: {
    linkTransfer () {
      this.$router.push('/home/searchreceiver')
    }
  }
}
</script>

<style scoped>
.balance-detail {
    grid-area: balance-detail;
    background-color: #6379F4;
    border-radius: 20px;
}
.balance-detail p.balance {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 31px;
    color: #E0E0E0;
}

.balance-detail h1.balance-amount {
    font-weight: 700;
    font-size: 40px;
    line-height: 55px;
    color: #FFFFFF;
}

.balance-detail p.telephone {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 31px;
    color: #E0E0E0;
}

.balance-detail .transfer .icon {
    background-image: url('/img/arrow-up.png');
}
.transfer {
    width: 162px;
    height: 57px;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
    border-radius: 10px;

    font-weight: 700;
    font-size: 18px;
    line-height: 25px;

    color: #FFFFFF;
}
.transfer:focus{
  outline:none;
}

.topup {
    width: 162px;
    height: 57px;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
    border-radius: 10px;
}
.topup-text{
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    text-decoration: none;
    color: #FFFFFF !important;
}
.topup:focus{
  outline:none;
}
@media (max-width: 576px) {
  .balance-detail .balance-amount {
    text-align: center;
  }

  .balance-detail .balance {
    text-align: center;
  }

  .balance-detail .telephone {
    text-align: center;
    margin: 0 auto 0 auto;
  }

  .balance-detail .transfer {
    margin: 0 auto 0 auto;
  }

  .balance-detail .topup {
    margin: 0 auto 50px auto;
  }
}
</style>
