window.setInterval(() => {
    if(document.documentElement['clientWidth'],
        document.body['scrollWidth'],
        document.documentElement['scrollWidth'],
        document.body['offsetWidth'],
        document.documentElement['offsetWidth'] >= 767
      ) {
        window.onscroll = () => {img1()};
    } else {
        
    }
}, 300);

let img1 = () => {
    if(document.body.scrollTop > 60 || document.documentElement.scrollTop > 60){
        document.getElementById('nodeImg2').classList.remove('hidden');
        document.getElementById('nodeImg2').className = 'fadeIn';
    }
}

let img2 = () => {
    if(document.body.scrollTop > 120 || document.documentElement.scrollTop > 120){
        document.getElementById('nodeImg2').classList.remove('hidden');
        document.getElementById('nodeImg2').className = 'fadeIn';    
    }
}