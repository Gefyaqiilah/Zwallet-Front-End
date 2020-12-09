<template>
  <div style="height:100vh;" class="containerfluid d-flex flex-column justify-content-center align-items-center">
    <h3 class="text-center">👇👇 Click the button below 👇👇</h3>
    <button v-on:click.prevent="emailVerification" class="btn btn-primary">Verify your email</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Email Verification',
  methods: {
    emailVerification () {
      return axios.patch(`${process.env.VUE_APP_SERVICE_API}/v1/email/emailverification`, {
        email: `${this.$route.params.email}`
      })
        .then(results => {
          alert('berhasil menverifikasi email anda')
          this.$router.push('/auth/login')
        })
        .catch(() => {
        })
    },
    checkEmailVerified () {
      return axios.get(`${process.env.VUE_APP_SERVICE_API}/v1/email/checkEmailVerified`, {
        headers: {
          email: `${this.$route.params.email}`
        }
      })
        .then(() => {

        })
        .catch(() => {
          alert('Forbidden: Your account has been verified before')
          this.$router.push('/auth/login')
        })
    }
  },
  created () {
    this.checkEmailVerified()
  }
}
</script>

<style scoped>
</style>
