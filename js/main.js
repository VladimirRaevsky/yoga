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

    const deadline = '2021-02-27';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date());

        let seconds = Math.floor((t / 1000) % 60);
        let minutes = Math.floor((t / 1000 / 60) % 60 );
        let hours = Math.floor((t / (1000 * 60 * 60)));

        return {
            'total': t,
            'seconds': seconds,
            'minutes': minutes,
            'hours': hours
        };
    }
    

    function setClock(id, endtime) {
        const timer = document.getElementById(id);
        let hours = timer.querySelector('.hours');
        let minutes = timer.querySelector('.minutes');
        let seconds = timer.querySelector('.seconds');
        let timerInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if(t.total <= 0) {
                clearInterval(timerInterval);
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
});

