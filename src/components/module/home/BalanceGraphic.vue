<template>
<div class="balance-graphic p-2">
  <div class="income-expense">
      <div class="income d-flex flex-column align-items-center">
          <div>
          <img src="/img/arrow-down-green.png" alt="">
          </div>
          <p class="income-text font-weight-bold">Income</p>
          <p class="amount green font-weight-bold">Rp.{{income(getTransactionHistory.transactions)}}</p>
      </div>
      <div class="expense d-flex flex-column align-items-center">
          <img src="/img/arrow-up-red.png" alt="">
          <p class="income-text font-weight-bold">Expense</p>
          <p class="amount red font-weight-bold">Rp.{{expense(getTransactionHistory.transactions)}}</p>
      </div>
  </div>
  <div class="graphic" v-if="getTransactionHistory.chartData.length > 0">
      <column-chart :download="true" :data="[...getTransactionHistory.chartData]"></column-chart>
  </div>
  <div class="default-text" v-if="getTransactionHistory.chartData.length === 0">
    <p>You don't have any transaction data</p>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'BalanceGraphic',
  methods: {
    income (transactions) {
      const reducer = transactions.reduce((accumu, currValue) => {
        if (currValue.idReceiver === this.getUserData.id) {
          return accumu + parseInt(currValue.amount)
        } else {
          return accumu + 0
        }
      }, 0)
      console.log('reducer :>> ', reducer)
      return reducer
    },
    expense (transactions) {
      const reducer = transactions.reduce((accumu, currValue) => {
        if (currValue.idSender === this.getUserData.id) {
          return accumu + parseInt(currValue.amount)
        } else {
          return accumu + 0
        }
      }, 0)
      console.log('reducer :>> ', reducer)
      return reducer
    }
  },
  computed: {
    ...mapGetters(['getTransactionHistory', 'getUserData'])
  }
}
</script>

<style scoped>
.balance-graphic {
    grid-area: balance-graphic;
    background-color: #FFFFFF;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 25px;
}
.balance-graphic {
    grid-area: 'income-expense income-expense''graphic graphic';
}
.balance-graphic {
    grid-area: 'income-expense income-expense''graphic graphic';
}

.balance-graphic .income-expense {
    display: flex;
    flex-direction: row;
}

.balance-graphic .income-expense .income {
    flex: 1;
    margin: 20px;
}

.balance-graphic .income-expense .expense {
    flex: 1;
    margin: 20px;
}

.balance-graphic .graphic {
  /* background-color: rgb(78, 6, 6); */
  display: block;
  /* width: 80%; */
  text-align: center;
  padding:10px;
}
.thumbnail-photo {
  margin:auto auto;
  width:80%;
}
.photo {
  width:100%;
  height:100%;
  object-fit: contain;
}
.green {
    color: #1EC15F;
}

.red {
    color: #FF5B37;
}
.income-text {
  font-size: 17px;
}
/* * {
  border: 1px solid red;
} */
.default-text {
  min-height:200px;
}
.default-text p {
  font-size:20px;
  text-align:center;
}
@media screen and (max-width:400px){
.balance-graphic .graphic img {
  width: 100%;
}
}
</style>
