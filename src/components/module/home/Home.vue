<template>
  <div class="home-grid">
    <BalanceDetail :phoneNumber="userData.phoneNumber" :balance="userData.balance" class="balance-detail"/>
    <BalanceGraphic class="balance-graphic"/>
    <TransactionHistory :firstName="userData.firstName" class="transaction-history"/>
  </div>
</template>

<script>
import BalanceDetail from '@/components/module/home/BalanceDetail'
import BalanceGraphic from '@/components/module/home/BalanceGraphic'
import TransactionHistory from '@/components/module/home/TransactionHistory'
export default {
  name: 'Home',
  components: {
    BalanceDetail,
    BalanceGraphic,
    TransactionHistory
  },
  data () {
    return {
      userData: this.token
    }
  },
  props: ['token']
}
</script>

<style scoped>
.home-grid{
  display:grid;
  grid-template-areas:
    "BalanceDetail BalanceDetail"
    "BalanceGraphic TransactionHistory"
  ;
  grid-template-columns: 1fr 1fr;
  gap: 20px 20px;
}
.balance-detail{
  grid-area:BalanceDetail;
}
.balance-graphic{
  grid-area:BalanceGraphic;
}
.transaction-history{
  grid-area:TransactionHistory;
}
@media (max-width:992px) {
.home-grid{
  grid-template-columns: 100%;
  grid-template-rows: max-content;
  grid-template-areas:
  "BalanceDetail"
  "BalanceGraphic"
  "TransactionHistory"
}
}
</style>
