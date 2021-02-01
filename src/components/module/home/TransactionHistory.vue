<template>
<div v-if="renderComponent" class="transaction-history">
  <div class="container ">
  <div class="transaction-history-grid">
      <div class="title">
          <p>Transaction History</p>
          <a href="#">See all</a>
      </div>
      <div class="history" v-if="getTransactionHistory.transactions.length > 0">
          <div v-for="(transaction, index) in getTransactionHistory.transactions" :key="index" class="transaction col-md-12">
              <div class="detail-photo">
              <img class="transaction-photo" :src="transaction.userSender.photo === null? '/img/user-avatar.png' :transaction.userSender.photo" alt="">
              </div>
              <div class="detail-name">
                  <p class="name">{{transaction.userSender.firstName}}</p>
                  <p class="status">{{getUserData.id === transaction.idSender ? 'Transfer' : 'Receive'}}</p>
              </div>
              <p :class="getUserData.id === transaction.idSender ? 'red' : 'green'" class="amount">{{getUserData.id === transaction.idSender ? '-' : '+'}} Rp.{{transaction.amount}} <img src="/img/trash.png" v-on:click.prevent="handleDeleteTransactionTransferById(transaction.idTransfer,$event)" :value="transaction.idTransfer" :alt="transaction.idTransfer"></p>
          </div>
      </div>
      <div class="d-flex wrapper-sorry justify-content-center align-items-center" v-if="getTransactionHistory.transactions.length === 0">
        <p class="text-sorry">You don't have any transaction data<br/>😥</p>
      </div>
  </div>
</div>
</div>
</template>

<script>
import axios from 'axios'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'
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
    ...mapMutations(['REMOVE_USERDATA', 'REMOVE_ALLTOKEN', 'REMOVE_ALL_LOCAL_STORAGE']),
    ...mapActions(['deleteTransactionTransferById', 'getHistory', 'getDetailUserData']),
    async fetchTransactionTransfers () {
      try {
        const resultsFetchTransfers = await axios.get(`${process.env.VUE_APP_SERVICE_API}/v1/transfers/search?firstName=${this.firstName}&type=transfers&page=1&limit=4`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
        console.log('resultsFetchTransfers :>> ', resultsFetchTransfers)
        this.dataTransfer.push(...resultsFetchTransfers.data.result)
      } catch (error) {
      }
    },
    async deleteTransaction (cek) {
      if (!localStorage.getItem('accessToken')) {
        this.REMOVE_USERDATA()
        this.REMOVE_ALLTOKEN()
        this.REMOVE_ALL_LOCAL_STORAGE()
        return this.$router.push('/auth/login')
      }
      try {
        await axios.delete(`${process.env.VUE_APP_SERVICE_API}/v1/transfers/${cek}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        })
        alert('deleted successfully')
      } catch (error) {
        alert('failed to be deleted')
      }
    },
    async handleGetHistory () {
      await this.getHistory({ limit: 4 })
    },
    handleDeleteTransactionTransferById (id) {
      if (!localStorage.getItem('accessToken')) {
        this.REMOVE_USERDATA()
        this.REMOVE_ALLTOKEN()
        this.REMOVE_ALL_LOCAL_STORAGE()
        return this.$router.push('/auth/login')
      }
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteTransactionTransferById(id)
            .then(async () => {
              await this.getHistory({ limit: 3 })
              Swal.fire(
                'Deleted!',
                'Your transfer transaction has been deleted.',
                'success'
              )
            })
        }
      })
    }
  },
  async mounted () {
    this.fetchTransactionTransfers()
    await this.getHistory({ limit: 3 })
    await this.getDetailUserData()
    console.log('this.getTransactionHistory :>> ', this.getTransactionHistory)
  },
  computed: {
    ...mapGetters(['getTransactionHistory', 'getUserData'])
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
.transaction-photo{
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

.text-sorry {
  font-weight:bold;
  text-align:center;
  font-size:20px;
}
</style>
