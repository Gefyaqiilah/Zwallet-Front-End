<template>
  <div class="transfer-to">
    <div class="info-succeed">
      <img src="/img/success.png" alt="" />
      <p class="succeed">Transfer Success</p>
    </div>
    <div class="transfer-to-title">
      <p>Transfer To</p>
    </div>
    <div class="transfer-to-user">
      <div class="receiver">
        <div class="thumbnail-photo">
          <img
            class="photo"
            :src="
              userReceiver.photo === null
                ? '/img/user-avatar.png'
                : userReceiver.photo
            "
            alt=""
          />
        </div>
        <div class="detail-username">
          <p class="username">{{ userReceiver.firstName }}</p>
          <p class="telephone">{{ userReceiver.phoneNumber }}</p>
        </div>
      </div>
    </div>
    <div class="details-transfer">
      <div class="amount">
        <div class="amount-title title gap">
          <p>Amount</p>
        </div>
        <div class="amount-money bold gap">
          <p>Rp. {{ detailTransfer.amount }}</p>
        </div>
      </div>
      <div class="balance-left">
        <div class="balance-title title gap">
          <p>Balance Left</p>
        </div>
        <div class="balance-money bold gap">
          <p>Rp. {{ handleBalanceLeft }}</p>
        </div>
      </div>
      <div class="date-time">
        <div class="date-time-title title gap">
          <p>Date & Time</p>
        </div>
        <div class="date-time-time bold gap">
          <p>{{ detailTransfer.transferDate }}</p>
        </div>
      </div>
      <div class="notes">
        <div class="notes-title title gap">
          <p>Notes</p>
        </div>
        <div class="notes-desc bold gap">
          <p>{{ detailTransfer.notes }}</p>
        </div>
      </div>
    </div>
    <div class="button-continue">
      <button class="info-button" @click="backToHome">Back To Home</button>
      <button class="download-pdf" @click.prevent="print">Download PDF</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import dateFormat from 'dateformat'
import JSPDF from 'jspdf'
import 'jspdf-autotable'
import mixin from '../../../mixins/index'
import Swal from 'sweetalert2'

export default {
  name: 'StatusSucceed',
  mixins: [mixin],
  data () {
    return {
      userReceiver: null,
      detailTransfer: null,
      detailTransferByFirstName: null
    }
  },
  methods: {
    ...mapActions([
      'getDetailTransferById',
      'getDetailTransferByFirstName',
      'getReceiver', 'getDetailUserData'
    ]),
    handleGetDetailTransferById () {
      this.getDetailTransferById(this.$route.query.idTransfer).then(results => {
        this.detailTransfer = results.data.result[0]
        const payload = {
          firstName: this.handleFirstName
        }
        this.getDetailTransferByFirstName(payload).then(res => {
          this.detailTransferByFirstName = res.data.result[0]
        })
      })
    },
    handleGetReceiver () {
      this.getReceiver(this.$route.query.idReceiver).then(result => {
        this.userReceiver = result.data.result[0]
      })
    },
    print () {
      const doc = new JSPDF()
      const now = new Date()
      const dateNow = dateFormat(now, 'isoDateTime')

      doc.setFontSize(30)
      doc.setTextColor(99, 121, 244)
      doc.text('Zwallet', 20, 22)
      doc.setFontSize(11)
      doc.setTextColor(100)

      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      var pageSize = doc.internal.pageSize
      var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth()
      var text = doc.splitTextToSize(
        'The following are details of your most recent transfer transaction:',
        pageWidth - 35,
        {}
      )
      doc.text(text, 14, 30)

      doc.autoTable({
        head: [['Sender', 'Receiver', 'Amount', 'Notes', 'Transfer Date']],
        body: [
          [
            `${this.detailTransferByFirstName.Sender}`,
            `${this.detailTransferByFirstName.Receiver}`,
            `Rp. ${this.detailTransferByFirstName.amount}`,
            `${this.detailTransferByFirstName.notes}`,
            `${this.detailTransferByFirstName.transferDate}`
          ]
        ],
        startY: 40,
        showHead: 'firstPage'
      })
      doc.text(`Your remaining balance : Rp. ${this.handleBalanceLeft}`, 14, doc.lastAutoTable.finalY + 10)
      doc.text(
        'Thank you for using zwallet :)',
        14,
        doc.lastAutoTable.finalY + 20
      )

      doc.save(`Transfer-${dateNow}`)
      Swal.fire({
        icon: 'success',
        title: 'downloaded successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
  },
  async mounted () {
    this.handleGetDetailTransferById()
    this.handleGetReceiver()
    await this.getDetailUserData()
  },
  computed: {
    ...mapGetters(['getUserData']),
    handleBalanceLeft () {
      return (
        parseInt(this.getUserData.balance) -
        parseInt(this.detailTransfer.amount)
      )
    },
    handleFirstName () {
      return this.getUserData.firstName
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.transfer-to {
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 25px;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, max-content) max-content repeat(1, max-content);
  grid-template-areas:
    "info-succeed"
    "details-transfer"
    "transfer-to-title"
    "transfer-to-user"
    "button-continue";
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
  color: #4d4b57;
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
  padding: 20px;
}

.receiver .thumbnail-photo {
  grid-area: thumbnail-photo;
  margin: auto auto;
}
.photo {
  width: 100%;
  height: 100%;
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
}

.transfer-to .details-transfer {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: repeat(4, max-content);
  grid-template-areas:
    "amount"
    "balance-left"
    "date-time"
    "notes";
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
  color: #7a7886;
}

.bold {
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 30px;
  color: #514f5b;
}

.transfer-to .button-continue {
  grid-area: button-continue;

  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.transfer-to .button-continue .info-button {
  background: #6379f4;
  box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
  border-radius: 12px;
  border: none;
  max-width: 170px;
  height: 57px;

  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #ffffff;
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
  color: #6379f4;
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
  color: #6379f4;
  margin: 0 30px 30px 0;

  outline: none;
}
</style>
