<template>
  <header class="sticky-top">
      <nav class="navbar position-absolute w-100 navbar-expand-sm navbar-light bg-light nav-sticky-top">
          <a class="navbar-brand ml-5" href="#">Zwallet</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto mr-5">
              <li class="nav-item active mr-5">
              <button class="login-btn btn-text-white"><router-link class="btn-text-white" to="/auth/login">Login</router-link></button>
              </li>
              <li class="nav-item">
                  <button class="signup-btn btn-text-purple"><router-link class="btn-text-purple" to="/auth/signup">Sign Up</router-link></button>
              </li>
            </ul>
            </div>
        </nav>
  </header>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'Header',
  mounted () {
    $(function () {
      $(document).scroll(function () {
        var $nav = $('.nav-sticky-top')
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height())
      })
    })
  }
}
</script>

<style scoped>
.navbar-nav{
  display:flex;
  flex-direction: row;
  justify-content: space-around;
}
.nav-sticky-top {
    background-color: transparent !important;
    padding: 50px;
}

/* navbar when scrolled */
.nav-sticky-top.scrolled {
    background-color: #FFFFFF !important;
    transition: background-color 500ms linear;
    padding: 20px;
}

.nav-sticky-top.scrolled .nav-link {
    color: #555;
}

.navbar-brand {
    font-style: normal;
    font-weight: 700;
    font-size: 29px;
    line-height: 40px;
    color: #6379F4 !important;
}
/* button */
.login-btn {
    width: 120px;
    height: 48px;
    background: #6379F4;
    border: 2px solid #FFFFFF;
    box-sizing: border-box;
    box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
    border-radius: 12px;
}
.login-btn:focus{
  outline:none;
}

.signup-btn {
    width: 120px;
    height: 48px;
    background: #FFFFFF;
    border: 2px solid #6379F4;
    box-sizing: border-box;
    box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
    border-radius: 12px;
}
.signup-btn:focus{
  outline: none;
}
.btn-text-white {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    color: #FFFFFF;
    text-decoration:none;
}

.btn-text-purple {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    text-decoration:none;
    color: #6379F4;
}
@media screen and (max-width:576px){
  .navbar-nav{
    flex-direction: column;
    justify-items: center;
    align-items: center;
  }
  .nav-item.mr-5{
    margin:0 !important;
  }
}
</style>
