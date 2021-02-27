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



    class Options {
        constructor(height, width, bg, fontSize, textAlign) {
            this.height = height;
            this.width = width;
            this.bg = bg;
            this.fontSize = fontSize;
            this.textAlign = textAlign;
        }
        createDiv() {
            let elem = document.createElement('div');
            document.body.appendChild(elem);
            let param = `height:${this.height}px; width:${this.width}px; background-color:${this.bg}; font-size:${this.fontSize}px; text-align:${this.textAlign}`;
		    elem.style.cssText = param;
        }  
    }

    const item = new Options(300, 350, "red", 14, "center");
    item.createDiv();
   
    


    // modal

    const more = document.querySelector('.more');
    const overlay = document.querySelector('.overlay');
    const close = document.querySelector('.popup-close');
    const descrBtn = document.querySelectorAll('.description-btn');


    function showPopup() {
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    
    function closePopup(event) {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    more.addEventListener('click', showPopup);
    close.addEventListener('click', closePopup);
    descrBtn.forEach(btn => {
        btn.addEventListener('click', showPopup);
    });
});




