<template>
  <div class="container-fluid m-0 p-0">
    <Header/>
    <Main/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/views/main/landing-page/components/Header'
import Main from '@/views/main/landing-page/components/Main'
import Footer from '@/views/main/landing-page/components/Footer'

export default {
  name: 'LandingPage',
  components: {
    Header,
    Main,
    Footer
  }
}
</script>

<style scoped>
</style>
