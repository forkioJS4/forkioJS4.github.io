
function hamburgerMenu(selector){
    let hamburgerMenu =  document.getElementsByClassName(selector)[0];
    let button = hamburgerMenu.getElementsByClassName('menu-hamburger__button')[0];
    let topMenu = document.getElementsByClassName('top-menu')[0];
    let links = topMenu.getElementsByClassName('top-menu__link');
    let overlay =  hamburgerMenu.getElementsByClassName('menu-hamburger__wrap2')[0];

    button.addEventListener("click",(e) => {
        e.preventDefault();
        toggleMenu();
        
    });
    
    for(var i=0; i<links.length; i++){
        links[i].addEventListener("click", () => toggleMenu());
    }
    
    overlay.addEventListener('click', () => toggleMenu());
                  
    function toggleMenu(){
        let body = document.getElementsByTagName('body')[0];

        if(window.innerWidth > 480) {
            return;
        }else {

            hamburgerMenu.classList.toggle('menu-hamburger--active');
            topMenu.classList.toggle('top-menu--humburger-active');

            for (var i = 0; i < links.length; i++) {
                links[i].classList.toggle('top-menu__link--humburger-active');
            }

            if(hamburgerMenu.className === 'menu-hamburger menu-hamburger--active'){
               body.style.overflow = 'hidden';
            } else {
                  body.style.overflow = "visible";
            }
        }
    }
}

hamburgerMenu('menu-hamburger');
    

