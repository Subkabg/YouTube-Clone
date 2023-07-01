const APIkey = localStorage.getItem("APIkey");

let data = JSON.parse(localStorage.getItem("video"));
 

function playVideo(data){
    let container = document.getElementById("play");
    let iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${data.videoId}?autoplay=1&mute=1`;
    iframe.height="100%";
    iframe.width="100%";
    iframe.setAttribute = ("allowFullscreen",true);
   extractVideoDetails(data.videoId);
    container.append(iframe);
}

playVideo(data);


async function extractVideoDetails(videoId){
    let endpoint = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${APIkey}`;
    
    try{
        let response = await fetch(endpoint);
        let result =  await response.json();
        console.log(result);

    }
    catch(error){
        console.log(`Error Occured`);
    }
}

async function fetchStatus(videoId){
    let endpoint = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${APIkey}`;
    try{
        const response = await fetch(endpoint);
        const result = await response.json();
        console.log(result), "stats"; //title, discription, statistics
         const item = result.items[0];
         const title = document.getElementById("title");
         title.innerText= item.snippet.title;
         title.style.color="black";
         title.style.fontSize="20px";

         

        statsContainer.innerHtml = `
        <div class="profile">
       
        <img src="https://i.ytimg.com/vi/D-qj0L68RhQ/default.jpg" alt="" class="channel-logo">
        <div class="owner-details">
            <span>${item.snippet.channelTitle}</span>
            <span style="color:gray">20 subscribers</span>
        </div>
    </div>
    <div class="stats">
        <div class="like-container">
            <div class="like">
                <span class="material-symbols-outlined">thumb_up</span>
                <span>${item.statistics.likeCount}</span>
            </div>
            <div class="like">
                <span class="material-symbols-outlined">thumb_down</span>
                <span>${item.statistics.dislikeCount}</span>
            </div>
        </div>
     <div class="comment-container">
        <span class="material-symbols-outlined">comment</span>
        <span>${item.statistics.commentCount}</span>
     </div>   
    </div>`
    }
    catch(error){
        console.log(`Error Occured`, error);
    }
}