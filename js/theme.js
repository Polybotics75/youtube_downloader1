function switchTheme(e){
    var themeSwitch = e.target.closest('div.theme-switch');

    //check which theme is on and switch
    var currentTheme = themeSwitch.id;

    if(currentTheme == "light"){
        themeSwitch.setAttribute('id','dark');
        localStorage.setItem('currentTheme','dark');
        checkTheme('dark');
    }else{
        themeSwitch.setAttribute('id','light');
        localStorage.setItem('currentTheme','light');
        checkTheme('light');
    }

    
}

function checkTheme(currentTheme){
    var themeSwitch = document.querySelector('div.theme-switch');
    var logoIMG = document.querySelector('.logo img');

    themeSwitch.setAttribute('id', currentTheme);

    if(currentTheme == "light"){
        themeSwitch.innerHTML = '<i class="far fa-sun"></i>';
        
        setTimeout(() => {
            var body = document.querySelector('body');
            body.id = currentTheme;
            logoIMG.src = "./asset/TUBE-DOWNLINK-LOGO-LIGHT.png";
        }, 1200);
    }else{
        themeSwitch.innerHTML = '<i class="far fa-moon-stars"></i>';

        setTimeout(() => {
            var body = document.querySelector('body');
            body.id = currentTheme;
            logoIMG.src = "./asset/TUBE-DOWNLINK-LOGO.png";
        }, 1700);
    }

}

function checkThemeStorage(){
    var currentTheme = localStorage.getItem('currentTheme');

    if(currentTheme){
        checkTheme(currentTheme);
    }else{
        localStorage.setItem('currentTheme','dark');
        checkTheme('dark');
    }
}

window.onload = checkThemeStorage();