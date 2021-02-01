<template>
<div class="transaction-history">
  <div class="transaction-title">
          <p>Transaction History</p>
  </div>
  <div class="transaction-week">
      <div class="week-history">
          <div class="transaction-week-1" v-for="(transaction, index) in getTransactionHistory.transactions" :key="index">
              <div class="thumbnail-photo">
                  <img src="/img/1.png" alt="">
              </div>
              <div class="detail-username">
                  <p class="username">{{transaction.userSender.id === getUserData.id ? 'You' : transaction.userSender.firstName}}</p>
                  <p>{{ transaction.idSender === getUserData.id ? 'Transfer' : 'Receive' }}</p>
              </div>
              <div class="amount" :class="transaction.idSender === getUserData.id ? 'red' : 'green'">
                  <p>{{ transaction.idSender === getUserData.id ? '- Rp.' + transaction.amount : '+ Rp.' + transaction.amount}}</p>
              </div>
          </div>
      </div>
  </div>
  <div>
              <nav class="pagination-nav" aria-label="Page navigation example">
        <ul class="pagination pagination-md justify-content-center">
            <li class="page-item"><a class="page-link" href="#" @click.prevent="getHistory({ limit: 5, page: parseInt(getTransactionHistory.pagination.currentPage ) - 1})">Previous</a></li>
            <li v-for="noPage in getTransactionHistory.pagination.totalPage" :key="noPage" :class="[getTransactionHistory.pagination.currentPage == noPage ? 'active' : '']" class="page-item"><a class="page-link" href="#" @click.prevent="getHistory({ limit: 5, page: noPage})">{{noPage}}</a></li>
            <li class="page-item" :class="[getTransactionHistory.pagination.currentPage == getTransactionHistory.pagination.totalPage ? 'disabled' : '']"><a class="page-link" href="#" @click.prevent="getHistory({ limit: 5, page: parseInt(getTransactionHistory.pagination.currentPage ) + 1})">Next</a></li>
        </ul>
    </nav>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'TransactionHistory',
  methods: {
    ...mapActions(['getHistory']),
    async handleGetHistory () {
      const result = await this.getHistory({ limit: 5 })
      console.log('result history:>> ', result)
    }
  },
  mounted () {
    this.handleGetHistory()
  },
  computed: {
    ...mapGetters(['getUserData', 'getTransactionHistory']),
    handleLastName () {
      return this.getUserData.firstName
    }
  }
}
</script>

<style scoped>
.transaction-history {
    display: grid;
    min-height:500px;
    grid-template-columns: 1fr;
    grid-template-rows: 100px max-content max-content;
    grid-template-areas:
        'transaction-title'
        'transaction-week'
        'transaction-month';
    background: #FFFFFF;
    gap: 10px 0;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 25px;
}

.transaction-title {
    display: flex;
    align-items: center;

    grid-area: transaction-title;
}

.title-week p {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 27px;
    color: #7A7886;
}

.transaction-week {
    grid-area: transaction-week;
    margin: 0 30px 0 30px;
}

.transaction-month {
    grid-area: transaction-month;
    margin: 0 30px 0 30px;
}

.transaction-title {
    margin: 0 30px 0 30px;
}

.transaction-title p {
    font-weight: 700;
    font-size: 18px;
    color: #3A3D42;

}

.week-history {
    /* display: grid;
    grid-template-columns: 100%;
    grid-template-rows: max-content max-content;
    grid-template-areas:
        'transaction-week-1'
        'transaction-week-2';
    gap: 50px 0; */
}

.week-history .transaction-week-1 {
    grid-area: transaction-week-1;
    margin:0 0 20px 0;
    display: grid;
    grid-template-columns: 0.5fr 4fr 1fr;
    grid-template-areas: 'thumbnail-photo detail-username amount';
}

.transaction-week-1 .thumbnail-photo {
    margin: auto 0;
}

.transaction-week-1 .detail-username p {
    margin: auto 0;
}

.transaction-week-1 .amount {
    margin: auto 0;

    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    text-align: right;
}

.week-history .transaction-week-2 {
    grid-area: transaction-week-1;

    display: grid;
    grid-template-columns: 0.5fr 4fr 1fr;
    grid-template-areas: 'thumbnail-photo detail-username amount';
}

.transaction-week-2 .thumbnail-photo {
    margin: auto 0;
}

.transaction-week-2 .detail-username p {
    margin: auto 0;
}

.transaction-week-2 .amount {
    margin: auto 0;

    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    text-align: right;
}

.amount.green {
    color: #1EC15F;
}

.amount.red {
    color: #FF5B37;
}

.username {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    color: #4D4B57;
}

.week-history .transaction-week-2 {
    grid-area: transaction-week-2;
}

/* month */
.title-month p {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 27px;
    color: #7A7886;
}

.transaction-month {
    margin: 30px 30px 0 30px;
}

.month-history {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: max-content max-content;
    grid-template-areas:
        'transaction-month-1'
        'transaction-month-2';
    gap: 50px 0;
    /* background-color: midnightblue; */
}

.month-history .transaction-month-1 {
    grid-area: transaction-week-1;

    display: grid;
    grid-template-columns: 0.5fr 4fr 1fr;
    grid-template-areas: 'thumbnail-photo detail-username amount';
}

.month-history .transaction-month-1 {
    grid-area: transaction-month-2;

    display: grid;
    grid-template-columns: 0.5fr 4fr 1fr;
    grid-template-areas: 'thumbnail-photo detail-username amount';

}

.transaction-month-1 .thumbnail-photo {
    margin: auto 0;
}

.transaction-month-1 .detail-username p {
    margin: auto 0;
}

.transaction-month-1 .amount {
    margin: auto 0;

    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    text-align: right;
}

.month-history .transaction-month-1 {
    grid-area: transaction-month-1;
    display: grid;
    grid-template-columns: 0.5fr 4fr 1fr;
    grid-template-areas: 'thumbnail-photo detail-username amount';
}

.month-history .transaction-month-2 {
    grid-area: transaction-month-2;

    display: grid;
    grid-template-columns: 0.5fr 4fr 1fr;
    grid-template-areas: 'thumbnail-photo detail-username amount';

}

.transaction-month-2 .thumbnail-photo {
    margin: auto 0;
}

.transaction-month-2 .detail-username p {
    margin: auto 0;
}

.transaction-month-2 .amount {
    margin: auto 0;

    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    text-align: right;
}
.pagination ul li {
    font-size: 13px !important;
}
</style>
