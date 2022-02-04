let btcBtn = document.getElementById('btcBtn');
let usdtBtn = document.getElementById('usdtBtn');
let busdBtn = document.getElementById('busdBtn');
let usdcBtn = document.getElementById('usdcBtn');
let p = document.getElementById('addFundsP')

btcBtn.addEventListener('click', function(){
    p.value = "Btc"
});
usdtBtn.addEventListener('click', function(){
    p.value = "Usdt"
});
busdBtn.addEventListener('click', function(){
    p.value = "Busd"
});
usdcBtn.addEventListener('click', function(){
    p.value = "Usdc"
});

