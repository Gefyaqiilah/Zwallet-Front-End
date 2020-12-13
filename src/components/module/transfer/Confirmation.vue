<template>
  <div class="transfer-to">
    <div class="transfer-to-title">
      <p>Transfer To</p>
    </div>
    <div class="transfer-to-user">
      <div class="receiver">
        <div class="thumbnail-photo">
          <img class="photo" :src="userReceiver.photo === null ? '/img/user-avatar.png':userReceiver.photo" alt="" />
        </div>
        <div class="detail-username">
          <p class="username">{{ userReceiver.firstName }}</p>
          <p class="telephone">{{ userReceiver.phoneNumber }}</p>
        </div>
      </div>
    </div>
    <div class="details-transfer">
      <div class="details-transfer-title">
        <p>Details</p>
      </div>
      <div class="amount">
        <div class="amount-title title gap">
          <p>Amount</p>
        </div>
        <div class="amount-money bold gap">
          <p>Rp. {{this.$route.query.amount}}</p>
        </div>
      </div>
      <div class="balance-left">
        <div class="balance-title title gap">
          <p>Balance Left</p>
        </div>
        <div class="balance-money bold gap">
          <p>Rp. {{balanceLeft}}</p>
        </div>
      </div>
      <div class="date-time">
        <div class="date-time-title title gap">
          <p>Date & Time</p>
        </div>
        <div class="date-time-time bold gap">
          <p>{{new Date()}}</p>
        </div>
      </div>
      <div class="notes">
        <div class="notes-title title gap">
          <p>Notes</p>
        </div>
        <div class="notes-desc bold gap">
          <p>{{this.$route.query.notes}}</p>
        </div>
      </div>
    </div>
    <div class="button-position">
      <button type="submit" id="show-modal-pin" v-on:click.prevent="showModalPin" class="btn-continue">Continue</button>
    </div>
    <ModalPin ref="modal" :props="props" />
  </div>
</template>

<script>
import ModalPin from '@/components/module/transfer/ModalPin'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Confirmation',
  data () {
    return {
      userReceiver: null
    }
  },
  components: {
    ModalPin
  },
  methods: {
    showModalPin () {
      this.$refs.modal.showModalPin()
    },
    ...mapActions(['getReceiver']),
    handleGetReceiver () {
      this.getReceiver(this.$route.query.idReceiver)
        .then((result) => {
          this.userReceiver = result.data.result[0]
          alert('succeed')
        })
    }
  },
  mounted () {
    this.handleGetReceiver()
  },
  computed: {
    ...mapGetters(['getUserData']),
    handleIdSender () {
      return this.getUserData.id
    },
    balanceLeft () {
      return parseInt(this.getUserData.balance) - parseInt(this.$route.query.amount)
    },
    props () {
      return {
        amount: this.$route.query.amount,
        notes: this.$route.query.notes,
        idReceiver: this.$route.query.idReceiver
      }
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: content-box;
}
.transfer-to {
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 25px;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100px max-content max-content;
  grid-template-areas:
    "transfer-to-title"
    "transfer-to-user"
    "details-transfer"
    "button-continue";
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
  grid-template-areas: "thumbnail-photo detail-username";

  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding:10px;
}

.receiver .thumbnail-photo {
  grid-area: thumbnail-photo;
  margin: auto auto;
}
.photo {
  width:100%;
  height:100%;
  object-fit: cover;
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
  color: #4d4b57;
}

.receiver .detail-username .telephone {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #7a7886;
}

.transfer-to-title p {
  font-weight: 700;
  font-size: 18px;
  color: #3a3d42;
}

.transfer-to-title {
  margin: 0 30px 0 30px;
}

.transfer-to .transfer-to-user {
  grid-area: transfer-to-user;
  margin: 0 30px 0 30px;
  box-sizing: border-box;
}

.transfer-to .details-transfer {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: max-content repeat(4, 92px);
  grid-template-areas:
    "details-transfer-title"
    "amount"
    "balance-left"
    "date-time"
    "notes";
  gap: 20px 0px;

  grid-area: details-transfer;
  margin: 30px 30px 0 30px;
}

.details-transfer .details-transfer-title {
  grid-area: details-transfer-title;
}

.details-transfer .details-transfer-title p {
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #3a3d42;
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
  color: #7a7886;
}

.bold {
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 30px;
  color: #514f5b;
}

.transfer-to .button-position {
  grid-area: button-continue;

  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.btn-continue {
  background: #6379f4;
  box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
  border-radius: 12px;
  border: none;
  width: 170px;
  height: 57px;

  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #ffffff;
  margin: 20px 20px;

  outline: none;
}
</style>
