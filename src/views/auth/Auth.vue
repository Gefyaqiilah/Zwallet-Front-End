/* eslint-disable no-tabs */
/* eslint-disable no-tabs */
<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="side-left col-sm-12 col-md-6">
                <div class="container">
                    <h1 class="logo">Zwallet</h1>
                    <div class="phone-group">
                        <img src="/img/phone-group.png" alt="Vector 3" class="img-fluid vector-3">
                    </div>
                    <p class="desc-1">App that Covering Banking Needs.</p>
                    <p class="desc-2">Zwallet is an application that focussing in banking needs for all users
                        in the world. Always updated and always following world trends.
                        5000+ users registered in Zwallet everyday with worldwide
                        users coverage.</p>
                </div>
            </div>
            <div class="side-right col-sm-12 col-md-6">
              <router-view/>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Auth'
}
</script>

<style scoped>
/* Side left */
.side-left {
    background: url("/img/background.png");
    height: 100% !important;
}

.side-left .logo {
    font-style: normal;
    font-weight: 700;
    font-size: 29px;
    color: #FFFFFF;

    margin: 50px 0 0 50px;
}

.side-left .phone-group {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    text-align: center;
}

.side-left .desc-1 {
    max-width: 383px;
    height: 33px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 33px;
    color: #FFFFFF;

    margin: 30px auto 0 auto;
}

.side-left .desc-2 {
    max-width: 488px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    color: rgba(255, 255, 255, 0.8);

    margin: 30px auto 50px auto;
}
/* Side right */
.side-right .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 33px;

    color: #3A3D42;
    max-width: 384px;
    margin: 50px 0 0 10px;
}

.side-right .title-desc {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 30px;

    color: rgba(58, 61, 66, 0.6);
    max-width: 433px;
    margin: 50px auto 0 10px;
}
</style>
