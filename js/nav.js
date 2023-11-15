window.addEventListener('popstate', detectHistory);

function detectHistory(){

    var oldMovements = localStorage.getItem('pageMovement');
    var mainMovements = "";
    if(oldMovements != ""){
        var oldArr = oldMovements.split('~~~');
        if(oldArr != null){
            mainMovements = oldArr[oldArr.length - 1];
            if(mainMovements == ""){
                mainMovements = oldArr[oldArr.length - 2];
            }
        }else{
            mainMovements = oldMovements;
        }
        
        var frameId = mainMovements.split('=')[1];
        var pageTitle = mainMovements.split('=')[0];
    

        /*check for frame 1*/
        var pageFrame = document.querySelector(`iframe.download-frame`);

        if(pageFrame){
            pageFrame.remove();
            //checkIfAllMainTabClose();
        }

        /*Check for frame 2
        var pageTag = document.querySelector(`.page-2-frame#${frameId}`);

        if(pageTag){
            if(pageTag.classList.contains('show-page')){
                pageTag.classList.remove('show-page');
                pageTag.classList.add('hide-page');
            }
        }

        /*check for post edit block/
        var postEditBlock = document.querySelector(`.post-edit-block`);

        if(postEditBlock){
            postEditBlock.remove();
        }*/



        //////Remove closed frame from log///////
        var newMovements = "";
        if(oldArr != null){
            var checking = pageTitle + "=" + frameId;
            oldArr.forEach(oldA => {
                if(oldA != checking){
                    if(oldA != ""){
                        newMovements += oldA + "~~~";
                    }
                }
            })
        }

        localStorage.setItem('pageMovement', newMovements);

    }
    /*else if(oldMovements == ""){
        var homeBtn = document.querySelector('.footer-icon#home');

        homeBtn.click();
    }*/
}

function saveMovement(pageTitle, frameId){
    var oldMovements = localStorage.getItem('pageMovement');
    var newMovements = "";
    if(oldMovements != ""){
        var oldArr = oldMovements.split('~~~');
        if(oldArr != null){
            oldArr.forEach(oldA => {
                if(oldA != ""){
                    newMovements += oldA + '~~~';
                }
            })
        }else{
            newMovements = oldMovements;
        }
        
        newMovements += pageTitle + "=" + frameId;
    }else{
        newMovements = pageTitle + "=" + frameId;
    }

    localStorage.setItem('pageMovement', newMovements);

}

function createHistory(frameId,pageTitle){
    window.history.pushState({id:1}, null, pageTitle);

    const params = new URLSearchParams(window.location.search);

    var pageTitle = params.get('id');

    saveMovement(pageTitle, frameId);

}

window.onload = localStorage.setItem('pageMovement', "");