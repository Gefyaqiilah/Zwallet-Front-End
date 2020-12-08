<template>
  <div class="footer-grid">
      <div class="footer-left">
          <p class="">2020 Zwallet. All right reserved.</p>
      </div>
      <div class="footer-right">
          <p class="">+62 5637 8882 9901</p>
          <p class="">contact@zwallet.com</p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
<style scoped>

.footer-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'footer-left footer-right';
    background-color: #6379F4;
}

.footer-grid .footer-left {
    margin: 20px 0 0 0;
}

.footer-grid .footer-left p {
    font-weight: normal;
    font-size: 400;
    line-height: 28px;

    color: rgba(239, 239, 239, 0.9);
    margin-left: 150px;
}

.footer-grid .footer-right {
    display: flex;
    justify-content: space-evenly;
}

.footer-grid .footer-right p {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 28px;
    color: #EFEFEF;
    margin: 20px 0 0 0;
}
@media (max-width:992px) {
    .footer-grid {
        grid-template-columns: 1fr;
        grid-template-areas: 'footer-right''footer-right';
    }

    .footer-grid .footer-left p {
        margin: 0 auto;
        text-align: center;
    }
}
</style>
