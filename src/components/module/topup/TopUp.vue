<template>
<div class="transfer-to">
  <div class="transfer-to-title">
    <p>How To Top Up</p>
  </div>
  <div class="how-to">
    <div class="receiver">
        <div class="number-receiver">
            <h1>1</h1>
        </div>
        <div class="detail-desc">
            <p class="desc">
                Go to the nearest ATM or you can use E-Banking.
            </p>
        </div>
    </div>
    <div class="receiver">
        <div class="number-receiver">
        <h1>2</h1>
        </div>
        <div class="detail-desc">
            <p class="desc">
                Type your security number on the ATM or E-Banking.
            </p>
        </div>
    </div>
    <div class="receiver">
        <div class="number-receiver">
            <h1>3</h1>
        </div>
        <div class="detail-desc">
            <p class="desc">
                Select “Transfer” in the menu
            </p>
        </div>
    </div>
    <div class="receiver">
        <div class="number-receiver">
            <h1>4</h1>
        </div>
        <div class="detail-desc">
            <p class="desc">
                Type the virtual account number that we provide you at the top.
            </p>
        </div>
    </div>
    <div class="receiver">
        <div class="number-receiver">
            <h1>5</h1>
        </div>
        <div class="detail-desc">
            <p class="desc">
                Type the amount of the money you want to top up.
            </p>
        </div>
    </div>
    <div class="receiver">
        <div class="number-receiver">
            <h1>6</h1>
        </div>
        <div class="detail-desc">
            <p class="desc">
                Read the summary details
            </p>
        </div>
    </div>
    <div class="receiver">
        <div class="number-receiver">
            <h1>7</h1>
        </div>
        <div class="detail-desc">
            <p class="desc">
                Press transfer / top up
            </p>
        </div>
    </div>
    <div class="receiver">
        <div class="number-receiver">
            <h1>8</h1>
        </div>
        <div class="detail-desc">
            <p class="desc">
                You can see your money in Zwallet within 3 hours.
            </p>
        </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'TopUp'
}
</script>

<style scoped>
.transfer-to {
    background: #FFFFFF;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 25px;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, max-content) max-content repeat(1, max-content);
    grid-template-areas:
        'transfer-to-title'
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

.transfer-to-title {
    grid-area: transfer-to-title;

    display: flex;
    align-items: center;
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

.transfer-to-title p {
    font-weight: 700;
    font-size: 18px;
    color: #3A3D42;
}

.transfer-to-title {
    margin: 30px 30px 0 30px;
}

.transfer-to .how-to {
    grid-area: how-to;
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px 0;
    margin: 0 30px 0 30px;
}

.transfer-to .details-transfer {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: repeat(4, max-content);
    grid-template-areas:
        'amount'
        'balance-left'
        'date-time'
        'notes'
    ;
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
    color: #7A7886;
}

.bold {
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 30px;
    color: #514F5B;
}

.transfer-to .button-continue {
    grid-area: button-continue;

    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
}

.transfer-to .button-continue .info-button {
    background: #6379F4;
    box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
    border-radius: 12px;
    border: none;
    max-width: 170px;
    height: 57px;

    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    color: #FFFFFF;
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
    color: #6379F4;
    margin: 0 30px 30px 0;

    outline: none;
}

</style>
