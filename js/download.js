function downloadVid(e){
    var aLink = e.target.closest('a.link-download');

    //get link
    var mainLink = aLink.getAttribute('name');
    //get name
    var mainName = aLink.getAttribute('type');

    //create iframe
    var iframeTab = document.createElement('iframe');
    //set attributes
    iframeTab.setAttribute('src', mainLink);
    iframeTab.setAttribute('title', mainName);
    iframeTab.setAttribute('sandbox', 'allow-downloads');

    iframeTab.classList.add('download-frame');


    //get output and send after
    var outputTag = document.querySelector('.output');

    outputTag.after(iframeTab);

    createHistory(mainLink, "download-frame");
}