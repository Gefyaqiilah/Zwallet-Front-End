<template>
  <div class="personal-information">
    <div class="personal-information-title">
      <p class="title">Personal Information</p>
      <p class="title-desc">
          We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.
      </p>
    </div>
    <div class="how-to">
      <div class="first-name">
          <div class="first-name-title title gap">
              <p>First Name</p>
          </div>
          <div class="bold gap">
          <p class="capitalize">{{userData.firstName}}</p>
          </div>
      </div>
      <div class="last-name">
          <div class="last-name-title title gap">
              <p>Last Name</p>
          </div>
          <div class="bold gap">
              <p class="capitalize">{{userData.lastName!==null?userData.lastName:'-'}}</p>
          </div>
      </div>
      <div class="verified-email">
          <div class="verified-email-title title gap">
              <p>Verified E-mail</p>
          </div>
          <div class="bold gap">
              <p>{{userData.email}}</p>
          </div>
      </div>
      <div class="phone-number">
          <div class="side-left">
              <div class="phone-number-title title gap">
                  <p>Phone Number</p>
              </div>
              <div class="bold gap">
                  <p>{{userData.phoneNumber!==null?userData.phoneNumber:'-'}}</p>
              </div>
          </div>
          <div class="side-right">
              <p><router-link to="/home/managephonenumber">Manage</router-link></p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalInformation',
  props: ['token'],
  data () {
    return {
      userData: this.token.token
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.capitalize{
    text-transform: capitalize;
}
.personal-information {
    background: #FFFFFF;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 25px;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, max-content) max-content repeat(1, max-content);
    grid-template-areas:
        'personal-information-title'
        'how-to'
        'button-continue'
    ;
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
    color: #4D4B57;
}

.personal-information-title {
    grid-area: personal-information-title;

    display: flex;
}

.receiver {
    display: grid;
    grid-template-columns: 0.4fr 5fr;
    grid-template-rows: 80px;
    grid-template-areas: 'number-receiver detail-desc';

    background: #FFFFFF;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
}

.receiver .number-receiver {
    grid-area: number-receiver;
    margin: auto auto;
}

.receiver .number-receiver h1 {
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    color: #6379F4;
}

.receiver .detail-desc {
    grid-area: detail-desc;
    margin: auto 0 auto 20px;
}

.receiver .detail-desc .desc {
    font-weight: 400;
    font-size: 16px;
    line-height: 27px;
    /* identical to box height, or 169% */

    display: flex;
    align-items: center;

    color: #7A7886;
}

.personal-information-title .title {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    color: #3A3D42;
}

.personal-information-title .title-desc {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: #7A7886;
}

.personal-information-title {
    display: flex;
    flex-direction: column;
    margin: 30px 30px 0 30px;
}

.personal-information .how-to {
    grid-area: how-to;
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px 0;
    margin: 0 30px 0 30px;
}

.personal-information .how-to {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: repeat(4, max-content);
    grid-template-areas:
        'first-name'
        'last-name'
        'verified-email'
        'phone-number'
    ;
    gap: 20px 0px;

    grid-area: how-to;
    margin: 0px 30px 0 30px;
}

.how-to .first-name {
    grid-area: first-name;
    display: grid;

    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    padding-top: 15px;
}

.gap {
    margin: auto 0 auto 15px;
}

.how-to .last-name {
    grid-area: last-name;
    display: grid;

    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    padding-top: 15px;
}

.how-to .verified-email {
    grid-area: verified-email;
    display: grid;

    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    padding-top: 15px;
}

.how-to .phone-number {
    grid-area: phone-number;
    display: grid;
    grid-template-columns: 90% 10%;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    padding-top: 15px;
}

.phone-number .side-right {
    display: flex;
    align-items: center;
}

.side-right p {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: #6379F4;
}

.title {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #7A7886;
}

.bold {
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 30px;
    color: #514F5B;
}
@media screen and (max-width:400px){
  .bold p{
    font-size:0.8em !important;
  }
}
</style>
