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

});

