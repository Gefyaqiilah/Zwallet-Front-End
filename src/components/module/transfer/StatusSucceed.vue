<template>
  <div class="transfer-to">
    <div class="info-succeed">
        <img src="/img/success.png" alt="">
        <p class='succeed'>Transfer Success</p>
    </div>
  <div class="transfer-to-title">
    <p>Transfer To</p>
  </div>
  <div class="transfer-to-user">
    <div class="receiver">
        <div class="thumbnail-photo">
            <img src="/img/1-70x70.png" alt="">
        </div>
        <div class="detail-username">
            <p class="username">Samuel Suhi</p>
            <p class="telephone">+62 813-8492-9994</p>
        </div>
    </div>
  </div>
  <div class="details-transfer">
    <div class="amount">
        <div class="amount-title title gap">
            <p>Amount</p>
        </div>
        <div class="amount-money bold gap">
        <p>Rp100.000</p>
        </div>
    </div>
    <div class="balance-left">
        <div class="balance-title title gap">
            <p>Balance Left</p>
        </div>
        <div class="balance-money bold gap">
            <p>Rp20.000</p>
        </div>
    </div>
    <div class="date-time">
        <div class="date-time-title title gap">
            <p>Date & Time</p>
        </div>
        <div class="date-time-time bold gap">
            <p>May 11, 2020 - 12.20</p>
        </div>
    </div>
    <div class="notes">
        <div class="notes-title title gap">
            <p>Notes</p>
        </div>
        <div class="notes-desc bold gap">
            <p>For buying some socks</p>
        </div>
    </div>
  </div>
  <div class="button-continue">
      <button class="share"><img src="/img/share-icon.png" alt=""></button>
      <button class="info-button">Back To Home</button>
      <button class="download-pdf">Download PDF</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatusSucceed',
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
.transfer-to {
    background: #FFFFFF;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 25px;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, max-content) max-content repeat(1, max-content);
    grid-template-areas:
        'info-succeed'
        'details-transfer'
        'transfer-to-title'
        'transfer-to-user'
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

.transfer-to-title {
    grid-area: transfer-to-title;

    display: flex;
    align-items: center;
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
    margin: auto auto;
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

.transfer-to .details-transfer {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: repeat(4, max-content);
    grid-template-areas:
        'amount'
        'balance-left'
        'date-time'
        'notes'
    ;
    gap: 20px 0px;

    grid-area: details-transfer;
    margin: 30px 30px 0 30px;
}

.details-transfer .amount {
    grid-area: amount;
    display: grid;

    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    padding-top: 15px;
}

.gap {
    margin: auto 0 auto 15px;
}

.details-transfer .balance-left {
    grid-area: balance-left;
    display: grid;

    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    padding-top: 15px;
}

.details-transfer .date-time {
    grid-area: date-time;
    display: grid;

    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    padding-top: 15px;
}

.details-transfer .notes {
    grid-area: notes;
    display: grid;

    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    padding-top: 15px;
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

.transfer-to .button-continue .info-button {
    background: #6379F4;
    box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
    border-radius: 12px;
    border: none;
    max-width: 170px;
    height: 57px;

    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    color: #FFFFFF;
    margin: 0 30px 30px 0;

    outline: none;
}

.transfer-to .button-continue .download-pdf {
    background: rgba(99, 121, 244, 0.15);
    box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
    border-radius: 12px;
    border: none;
    max-width: 170px;
    height: 57px;

    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    color: #6379F4;
    margin: 0 30px 30px 0;

    outline: none;
}

.transfer-to .button-continue .share {
    background: rgba(99, 121, 244, 0.15);
    box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
    border-radius: 12px;
    border: none;
    max-width: 57px;
    height: 57px;

    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    color: #6379F4;
    margin: 0 30px 30px 0;

    outline: none;
}
</style>
