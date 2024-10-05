

// get Hour And Rest second
function getTimeString (time) {
    const hour = parseInt (time / 3600);
    let remainingSceond = time % 3600;
    const minute = parseInt(remainingSceond / 60);
    remainingSceond = remainingSceond % 60;
    return `${hour} hour ${minute} ${remainingSceond} second ago`;
}

// btn active and remove
const removeActiveClass = ()=>{
    const buttons = document.getElementsByClassName("category-btn");
    console.log(buttons);
    for(let btn of buttons){
        btn.classList.remove("active");
    }
}
// 1 - Fetch, load and show Categories on html

// Creaat loadCategories
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// loadVodeos

const loadVideos = (searchText = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then(res => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

const loadCategoryVideos = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then((data) => {
        // sobaike active + remove koro
        removeActiveClass();
        // id er class k active kora
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add("active");
        displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};

const loadDetails = async (videoId)=>{
    console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.video);

}

const displayDetails = (video)=> {
    const detailsContainer = document.getElementById('modal-content');

    detailsContainer.innerHTML = `
    <img src=${video.thumbnail} />
    <p>${video.description}</p>
    `

    // way-1

    // document.getElementById('showModal').click();

    // way - 2 
    document.getElementById('coustomModal').showModal();
};
// const cardDemo = {
//     "category_id": "1003",
//     "video_id": "aaac",
//     "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
//     "title": "Laugh at My Pain",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
//             "profile_name": "Kevin Hart",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "1.1K",
//         "posted_date": "13885"
//     },
//     "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
// };

// video display function
const displayVideos = (videos) => {
    const videosContsiner = document.getElementById('videos');
    videosContsiner.innerHTML = "";

    if(videos.length == 0){
        videosContsiner.classList.remove('grid');
        videosContsiner.innerHTML = `
        <div class= "min-h-[300px] flex flex-col gap-5 justify-center items-center">
        <img src="Assests/Icon.png" />
        <h2 class= "text-center text-xl font-bold">
        No Content Here in This category
        </h2>
        </div>
        `;
        return;
    }
    else{
        videosContsiner.classList.add('grid');
    }

    videos.forEach((video) => {
        // console.log(video);
        const card = document.createElement('div');
        card.classList = "card card-compact "
        card.innerHTML =  `
         <figure class= "h-[200px] relative">
    <img
      src= ${video.thumbnail}
      alt="Shoes" />
      ${
        video.others.posted_date?.length == 0 ? "" 
        : `<span class= "absolute text-xs right-2 bottom-5 bg-black text-white rounded-lg object-cover">${getTimeString(video.others.posted_date)}</span>`

      }
      
  </figure>
  <div class="px-0 py-4 flex gap-3">
        <div>
        <img class= "w-10 h-10 rounded-full object-cover" src= ${video.authors[0].profile_picture} />
        </div>
        
        <div>
        <h2 class= "font-bold">${video.title}</h2>
        
        <div class= "items-center gap-5 flex">
        <p class= "text-gray-400">${video.authors[0].profile_name}</p>

        ${
            video.authors[0].verified == true
            ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : 
            ""
        }
        
        
        </div>
        <p><button onclick="loadDetails('${video.video_id}')" class="btn btn=sm btn-error">Details</button></p>
    </div>
  </div>`;

  videosContsiner.append(card);
    });
};

// creat DisplayCategories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");
    
    categories.forEach((item) => {
        console.log(item);
        // creat a button
        const buttonConatiner = document.createElement("div");
        buttonConatiner.innerHTML = `
        <button id="btn-${item.category_id}" onclick= "loadCategoryVideos(${item.category_id})" class= "btn category-btn">
        ${item.category}
        </button>
        `;
        
        // add button to categories container
       categoryContainer.append(buttonConatiner);
    });
};
document.getElementById('search-input').addEventListener("keyup",(e)=>{
    loadVideos(e.target.value);
});
loadCategories();
loadVideos();