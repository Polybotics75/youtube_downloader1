let searchInp = document.querySelector('input.search-inp');
let searchBtn = document.querySelector('button.search-btn');






//select all input text
searchInp.addEventListener('click', ()=>{
    searchInp.setSelectionRange(0, searchInp.value.length);
});




function keyUp(){
    if(searchInp.value.length != 0){
        if(!searchBtn.classList.contains('active')){
            searchBtn.classList.add('active');
        }
    }else{
        if(searchBtn.classList.contains('active')){
            searchBtn.classList.remove('active');
        }
    }
}

window.addEventListener('load', ()=> {
    setInterval(() => {
        keyUp();
    }, 200);
});


function searchQuery(){
    //get search input
    var link = document.querySelector('input.search-inp').value;
    var vid = "";

    //check if button is active
    if(searchBtn.classList.contains('active')){
        //show loading
        var loadingTab = document.querySelector('.loading-tab');
        loadingTab.classList.add('searching');

        //breakdown link to get id 
        var firstSplit = link.split('v=');
        
        if(firstSplit[1] != null){
            firstSplit = firstSplit[1];
        }else{
            firstSplit = firstSplit[0];
        }
        
        //second breakdown
        var secSplit = firstSplit.split('&');
        if(secSplit[1] != null){
            vid = secSplit[0];
        }else{
            vid = firstSplit;
        }

        hideVTabSep();
        //sendApi(vid);
        sendApi(link);
    }
    
}

async function sendApi(vid){

    const url = 'https://youtube-audio-video-download.p.rapidapi.com/geturl?video_url='+vid;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a8afeb69b8msh8887979e8665e7cp199cf1jsn8c5c96e3c4da',
            'X-RapidAPI-Host': 'youtube-audio-video-download.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        console.log('success');
        console.log(result);
        processResult(result);


        //remove loading
        var loadingTab = document.querySelector('.loading-tab');
        loadingTab.classList.remove('searching');
        

    } catch (error) {
        console.log(error);


        //remove loading
        var loadingTab = document.querySelector('.loading-tab');
        loadingTab.classList.remove('searching');
        //show error
        var ouput = document.querySelector('.output');
        ouput.classList.toggle('show');
        setTimeout(() => {
            ouput.classList.toggle('show');
            
        }, 5000);
        
    }
}

function processResult(info){
    var videoName = info.title;
    var videoThumbnail = info.thumbnail;
    var videoAuthor = info.channel;
    var videoLength = convertSecToHour(info.duration);
    var videoViews = approxViews(info.view_count);
    ///////////////////
    displayResult(videoName,videoThumbnail,videoAuthor,videoLength, videoViews);

    //get download link
    getDownloadLinks(info.formats, videoName);
}

function convertSecToHour(time){
    const hour = 3600;

    if(time < hour){
        // if seconds are less than 1 hour and you only need mm:ss
        var result = new Date(time * 1000)
        .toISOString()
        .slice(14, 19);
        // "10:00" (mm:ss)
    }else{
        // get hh:mm:ss string
        var result = new Date(time * 1000)
        .toISOString()
        .slice(11, 19);
        //  "00:10:00" (hh:mm:ss)
    }

    return result;
}

function convertToMB(bytes){
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

    if (bytes == 0) {
        return "n/a";
    }

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

    if (i == 0) {
        return bytes + " " + sizes[i];
    }

    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
}

function getDownloadLinks(formats, videoName){
    var totalLinks = 0;
    //check all formats
    formats.forEach(format => {
        if(format['container'] && format['container'] == "mp4_dash"){
            var downloadLink = format['url'];
            var downloadPix = format['format_note'];
            var downloadSize = convertToMB(format['filesize']);
            showDownloadLink(videoName, downloadLink, downloadPix, downloadSize);
        }
    });
}


function displayResult(videoName, videoThumbnail,videoAuthor, videoLength, videoViews){
    var videoNameTab = document.querySelector('.video-name');
    var videoThumbnailTab = document.querySelector('.video-thumbnail');
    var videoAuthorTab = document.querySelector('.video-author'); 
    var videoLengthTab = document.querySelector('.video-length');
    var videoViewsTab = document.querySelector('.video-views');

    //assign
    videoNameTab.innerHTML = videoName;
    videoThumbnailTab.src = videoThumbnail;
    videoAuthorTab.innerHTML = videoAuthor;
    videoLengthTab.innerHTML = videoLength;
    videoViewsTab.innerHTML = videoViews;

    //display result
    showVTabSep();

}

function approxViews(num){
    const format = [
        { value: 1e18, symbol: 'E' },
        { value: 1e15, symbol: 'P' },
        { value: 1e12, symbol: 'T' },
        { value: 1e9, symbol: 'G' },
        { value: 1e6, symbol: 'M' },
        { value: 1e3, symbol: 'k' },
        { value: 1, symbol: '' },
    ];
    const formatIndex = format.findIndex((data) => num >= data.value);
    //console.log(formatIndex)
    return (num / format[formatIndex === -1? 6: formatIndex].value).toFixed(2) + format[formatIndex === -1?6: formatIndex].symbol;
}
    

function showDownloadLink(videoName, downloadLink, downloadPix, downloadSize){
    //console.log(downloadLink, downloadPix, downloadSize);

    //create link-tab
    var linkTab = document.createElement('div');
    linkTab.classList.add('link-tab');
    linkTab.innerHTML = '<div class="link-pixel ls">'+downloadPix+'</div><div class="link-type ls">'+downloadSize+'</div><a name="'+downloadLink+'" onclick="downloadVid(event)" class="link-download flex ac jc" type="ydt-'+videoName+'.mp4"><i class="far fa-download"></i></a>';

    //append links to list
    var linkList = document.querySelector('.link-list');
    setTimeout(() => {
        linkList.append(linkTab);
    }, 1200);
}



function hideVTabSep(){
    //hide video-tab
    var videoTab = document.querySelector('.video-tab');
    if(!videoTab.classList.contains('hide')){
        videoTab.classList.add('hide');
    }
    if(videoTab.classList.contains('show')){
        videoTab.classList.remove('show');
    }
    
    //hide seperator
    var seperator = document.querySelector('.seperator');
    if(!seperator.classList.contains('hide')){
        seperator.classList.add('hide');
    }
    if(seperator.classList.contains('show')){
        seperator.classList.remove('show');
    }

    var linkList = document.querySelector('.link-list');
    linkList.innerHTML = "";
}


function showVTabSep(){
    //hide video-tab
    var videoTab = document.querySelector('.video-tab');
    if(!videoTab.classList.contains('show')){
        videoTab.classList.add('show');
    }
    if(videoTab.classList.contains('hide')){
        videoTab.classList.remove('hide');
    }
    
    //hide seperator
    var seperator = document.querySelector('.seperator');
    if(!seperator.classList.contains('show')){
        seperator.classList.add('show');
    }
    if(seperator.classList.contains('hide')){
        seperator.classList.remove('hide');
    }
}
