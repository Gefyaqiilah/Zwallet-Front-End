<template>
<div class="balance-graphic">
  <div class="income-expense">
      <div class="income">
          <img src="/img/arrow-down-green.png" alt="">
          <p class="income-text">Income</p>
          <p class="amount">Rp2.120.000</p>
      </div>
      <div class="expense">
          <img src="/img/arrow-up-red.png" alt="">
          <p class="income-text">Expense</p>
          <p class="amount">Rp2.120.000</p>
      </div>
  </div>
  <div class="graphic">
    <div class="thumbnail-photo">
          <img class="photo" src="/img/graphic.png" alt="">
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'BalanceGraphic'
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
@media screen and (max-width:400px){
.balance-graphic .graphic img {
  width: 100%;
}
}
</style>
