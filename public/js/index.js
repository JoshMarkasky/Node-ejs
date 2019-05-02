window.setInterval(() => {
    if(document.documentElement['clientWidth'],
        document.body['scrollWidth'],
        document.documentElement['scrollWidth'],
        document.body['offsetWidth'],
        document.documentElement['offsetWidth'] >= 767
      ) {
        window.onscroll = () => {img1(), img2(), img3()};
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
    if(document.body.scrollTop > 300 || document.documentElement.scrollTop > 300){
        document.getElementById('nodeImg3').classList.remove('hidden');
        document.getElementById('nodeImg3').className = 'fadeIn';
    }
}

let img3 = () => {
    if(document.body.scrollTop > 750 || document.documentElement.scrollTop > 750) {
        document.getElementById('nodeImg4').classList.remove('hidden');
        document.getElementById('nodeImg4').className = 'fadeIn';
    }
}

