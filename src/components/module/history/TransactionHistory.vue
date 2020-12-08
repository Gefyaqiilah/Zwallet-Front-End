<template>
<div class="transaction-history">
  <div class="transaction-title">
          <p>Transaction History</p>
  </div>
  <div class="transaction-week">
      <div class="title-week">
          <p>This Week</p>
      </div>
      <div class="week-history">
          <div class="transaction-week-1">
              <div class="thumbnail-photo">
                  <img src="/img/1.png" alt="">
              </div>
              <div class="detail-username">
                  <p class="username">Samuel Suhi</p>
                  <p>Transfer</p>
              </div>
              <div class="amount green">
                  <p>+Rp50.000</p>
              </div>
          </div>
          <div class="transaction-week-2">
              <div class="thumbnail-photo">
                  <img src="/img/logo.png" alt="">
              </div>
              <div class="detail-username">
                  <p class="username">Netflix</p>
                  <p>Subscription</p>
              </div>
              <div class="amount red">
                  <p>-Rp149.000</p>
              </div>
          </div>
      </div>
  </div>
  <div class="transaction-month">
    <div class="title-month">
        <p>This Month</p>
    </div>
    <div class="month-history">
        <div class="transaction-month-1">
            <div class="thumbnail-photo">
                <img src="/img/2.png" alt="">
            </div>
            <div class="detail-username">
                <p class="username">Christine Mar..</p>
                <p>Transfer</p>
            </div>
            <div class="amount green">
                <p>+Rp50.000</p>
            </div>
        </div>
        <div class="transaction-month-2">
            <div class="thumbnail-photo">
                <img src="/img/logo-adobe.png" alt="">
            </div>
            <div class="detail-username">
                <p class="username">Adobe Inc.</p>
                <p>Subscription</p>
            </div>
            <div class="amount red">
                <p>-Rp249.000</p>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
export default {
  name: 'TransactionHistory',
  methods: {
    redirect () {
      if (!localStorage.getItem('dataUser')) {
        this.$router.replace('/auth/login')
      }
    }
  },
  mounted () {
    this.redirect()
  }
}
</script>

<style scoped>
.transaction-history {
    display: grid;
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
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: max-content max-content;
    grid-template-areas:
        'transaction-week-1'
        'transaction-week-2';
    gap: 50px 0;
}

.week-history .transaction-week-1 {
    grid-area: transaction-week-1;

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
</style>
