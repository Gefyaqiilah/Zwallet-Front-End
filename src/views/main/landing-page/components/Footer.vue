<template>
  <footer class="footer">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <p class="footer-title">Zwallet</p>
                    <p class="footer-text">
                        Simplify financial needs and saving much time in banking needs with one single app.
                    </p>
                    <hr>
                </div>
                <div class="col-12">
                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-12 justify-content-sm-center">
                            <p class="footer-text">
                                2020 Zwallet. All right reserved.
                            </p>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-12 d-flex justify-content-lg-center justify-content-md-center justify-content-sm-start">
                            <p class="mr-5 footer-text">
                                +62 5637 8882 9901
                            </p>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-12 d-flex justify-content-lg-end justify-content-md-end justify-content-sm-start">
                            <p class="footer-text">
                                contact@zwallet.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
/* Footer */
footer {
    background-color: #6379F4;
    height: max-content;
    padding: 80px 100px;
}

.footer-title {
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 49px;
    color: #FFFFFF;
}

.footer-text {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 31px;
    color: rgba(239, 239, 239, 0.75);
}
@media screen and (max-width:576px){
  footer{
        padding: 40px;
  }
}
</style>
