const APIkey = "AIzaSyB1UwO6s1Hh31YqJOywxADx9g7cTtVwej0";
localStorage.setItem("APIkey", APIkey);


async function mostPopular(){
    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=100&regionCode=IN&key=${APIkey}`);
   let data =  await res.json();
   append(data.items);
    // console.log(data.items); 
}

mostPopular();

function append(data){
    let container = document.getElementById("container");

    container.innerHTML = null;
    
    data.forEach(({snippet, id:{videoId}}) => {
        let img = snippet.thumbnails.high.url;
        let title = snippet.title;
        let channelTitle = snippet.channelTitle;
        

        //create element 
        let div = document.createElement("div");

        let image = document.createElement("img");
        image.src = img;

        let name = document.createElement("p");
        name.innerText=title;

        let cName = document.createElement("p");
        cName.innerTest=channelTitle;

        let data = {
            snippet, videoId,
        };

        div.addEventListener("click", function(){
            localStorage.setItem("video", JSON.stringify(data));
            window.location.href = "video.html";
        });

        div.append(image,name,cName);
        container.append(div);
    });
}


//search the result

async function search(){
    let query = document.getElementById("query").value;
    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=100&q=${query}&key=${APIkey}`);
    let data = await res.json();
    append(data.items);
}