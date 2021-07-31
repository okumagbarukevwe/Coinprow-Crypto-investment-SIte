let usdtBtn = document.getElementById('usdtBtn');
let busdBtn = document.getElementById('busdBtn');
let usdcBtn = document.getElementById('usdcBtn');
let p = document.getElementById('addFundsP')

usdtBtn.addEventListener('click', function(){
    p.value = "Usdt"
});
busdBtn.addEventListener('click', function(){
    p.value = "Busd"
});
usdcBtn.addEventListener('click', function(){
    p.value = "Usdc"
});

