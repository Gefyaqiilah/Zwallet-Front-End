<template>
<div v-if="renderComponent" class="transaction-history">
  <div class="container ">
  <div class="transaction-history-grid">
      <div class="title">
          <p>Transaction History</p>
          <a href="#">See all</a>
      </div>
      <div class="history">
          <div v-for="transferTransaction in dataTransfer" :key="transferTransaction.idTransfer" class="transaction col-md-12">
              <div class="detail-photo">
              <img class="photo" :src="transferTransaction.photo === null? '/img/user-avatar.png' :transferTransaction.photo" alt="">
              </div>
              <div class="detail-name">
                  <p class="name">{{transferTransaction.Receiver}}</p>
                  <p class="status">Transfer to {{transferTransaction.Receiver}}</p>
              </div>
              <p class="amount red">- Rp.{{transferTransaction.amount}} <img src="/img/trash.png" v-on:click.prevent="deleteTransaction(transferTransaction.idTransfer,$event)" :value="transferTransaction.idTransfer" :alt="transferTransaction.idTransfer"></p>
          </div>
      </div>
  </div>
</div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TransactionHistory',
  data () {
    return {
      dataTransfer: [],
      renderComponent: true
    }
  },
  props: ['firstName'],
  methods: {
    async fetchTransactionTransfers () {
      try {
        const resultsFetchTransfers = await axios.get(`${process.env.VUE_APP_SERVICE_API}/v1/transfers/search?firstName=${this.firstName}&type=transfers&page=1&limit=4`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
        this.dataTransfer.push(...resultsFetchTransfers.data.result)
      } catch (error) {
        console.log(error)
      }
    },
    async deleteTransaction (cek) {
      try {
        await axios.delete(`${process.env.VUE_APP_SERVICE_API}/v1/transfers/${cek}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        })
        alert('deleted successfully')
        const filter = this.dataTransfer.filter((data) => data.idTransfer !== cek)
        this.dataTransfer = filter
      } catch (error) {
        alert('failed to be deleted')
      }
    }
  },
  mounted () {
    this.fetchTransactionTransfers()
  }
}
</script>

<style scoped>
.transaction-history {
  grid-area: transaction-history;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 25px;
  box-sizing: border-box;
}
.transaction-history-grid {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 70px 100%;
    grid-template-areas: 'title''history';
}
.title {
    grid-area: title;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-areas: 'transaction seeall';
}

.title p {
    grid-area: transaction;
    margin: 25px 0 0 0;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    color: #3A3D42;
}

.title a {
    grid-area: seeall;
    margin: 25px 0 0 100px;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: #6379F4;
    text-decoration: none;
}

.history {
    grid-area: history;
}
.transaction {
    display: grid;
    grid-template-columns: 0.5fr 1fr 1fr;
    grid-template-rows: 100px;
    gap: 10px 0px;
    grid-template-areas: 'foto detail-name amount';
    /* margin-top: 20px; */
}

.transaction img {
    grid-area: foto;
}.detail-photo{
  width:55px;
  height:55px;
}
.photo{
  width:100%;
  height:100%;
  border-radius:10px;
  object-fit: cover;
}
.transaction .detail-name {
    grid-area: detail-name;
    margin: 0 0 0 10px;
}

.transaction .detail-name p {
    margin: 0 0;
}

.transaction .detail-name p.name {
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    color: #4D4B57;
    text-transform: capitalize;
}

.transaction .detail-name p.status {
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #4D4B57;
}

.transaction p.amount {
    grid-area: amount;
    margin: 0 0 0 20px;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    text-align: right;
}

.transaction p.amount.green {
    color: #1EC15F;
}

.transaction p.amount.red {
    color: #FF5B37;
}
</style>
