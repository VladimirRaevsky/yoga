document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    function tabsWrapper(wrapper, tab, tabContent) {
        const infoHeader = document.querySelector(wrapper),
              infoHeaderTab = infoHeader.querySelectorAll(tab),
              infoTabContent = document.querySelectorAll(tabContent);

        function hideTab(a) {
            for(let i = a;i < infoTabContent.length; i++) {
                infoTabContent[i].classList.remove('show');
                infoTabContent[i].classList.add('hide');
            } 

        }
        hideTab(1);

        function showTab(b) {
            if(infoTabContent[b].classList.contains('hide')) {
                infoTabContent[b].classList.remove('hide'); 
                infoTabContent[b].classList.add('show');
            }
        }

        infoHeader.addEventListener('click', function(event) {
            let target = event.target;
            if(target && target.classList.contains('info-header-tab')) {
                for(let i = 0; i < infoHeaderTab.length; i++) {
                    if(target == infoHeaderTab[i]) {
                        hideTab(0);
                        showTab(i);
                        break;
                    }
                }
            }
        });
        
    }

    tabsWrapper('.info-header', '.info-header-tab', '.info-tabcontent');

        
    //    countdown timer 

    const deadline = '2021-06-27';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date());

        let seconds = Math.floor((t / 1000) % 60);
        let minutes = Math.floor((t / 1000 / 60) % 60 );
        let hours = Math.floor((t / (1000 * 60 * 60) % 24));
        let days = Math.floor(t / (1000 * 60 * 60 * 24));

        return {
            'total': t,
            'seconds': seconds,
            'minutes': minutes,
            'hours': hours,
            'days': days
        };
    }
    

    function setClock(id, endtime) {
        const timer = document.getElementById(id);
        let days = timer.querySelector('.days');
        let hours = timer.querySelector('.hours');
        let minutes = timer.querySelector('.minutes');
        let seconds = timer.querySelector('.seconds');
        let timerInterval = setInterval(updateClock, 1000);

        updateClock();
        function updateClock() {
            let t = getTimeRemaining(endtime);
            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if(t.total <= 0) {
                clearInterval(timerInterval);
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }

            function addZero(num){
                if(num <= 9) {
                    return `0${num}`;
                } else {
                    return num;
                }
                
            }
            
        }
    }
    setClock('timer', deadline);



    // class Options {
    //     constructor(height, width, bg, fontSize, textAlign) {
    //         this.height = height;
    //         this.width = width;
    //         this.bg = bg;
    //         this.fontSize = fontSize;
    //         this.textAlign = textAlign;
    //     }
    //     createDiv() {
    //         let elem = document.createElement('div');
    //         document.body.appendChild(elem);
    //         let param = `height:${this.height}px; width:${this.width}px; background-color:${this.bg}; font-size:${this.fontSize}px; text-align:${this.textAlign}`;
	// 	    elem.style.cssText = param;
    //     }  
    // }

    // const item = new Options(300, 350, "red", 14, "center");
    // item.createDiv();
   
    


    // modal

    const more = document.querySelector('.more');
    const overlay = document.querySelector('.overlay');
    const close = document.querySelector('.popup-close');
    const descrBtn = document.querySelectorAll('.description-btn');


    function showPopup() {
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    
    function closePopup() {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    more.addEventListener('click', showPopup);
    close.addEventListener('click', closePopup);
    descrBtn.forEach(btn => {
        btn.addEventListener('click', showPopup);
    });


    // form

    const form = document.querySelector('.main-form');
    let input = form.getElementsByTagName('input');
    let Message = document.createElement('div');
        
    Message.classList.add('message');
    
    
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(Message);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                Message.innerHTML = message.loading;
            } else if(request.readyState === 4 && request.status == 200) {
                Message.innerHTML = message.success;
                setTimeout(closePopup , 3000);
                setTimeout(zeroMessage, 3000);
            } else {
                Message.innerHTML = message.failure;
                setTimeout(closePopup , 3000);
                setTimeout(zeroMessage, 3000);
            }
        });

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });
    function zeroMessage() {
        Message.innerHTML = '';
    }
    zeroMessage(Message);
});




