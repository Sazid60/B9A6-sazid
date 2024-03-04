// alert('Connected')
// Latest post Field
const latestPostsContainer = document.getElementById('latest-Post-Container')
// Lets Discuss Filed 
const letsDiscussContainer = document.getElementById('lets-discuss-container')
const leftCardContainer = document.getElementById('left-card-container')
const rightSideCardContainer = document.getElementById('right-card')
const rightTitleField = document.getElementById('right-title-field')
const countField = document.getElementById('read-count')

// Latest post Data Fetch
const latestPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    // console.log(data)
    displayLatestPost(data)
}
// Latest Section Data Display
const displayLatestPost = (latestPosts) => {
    latestPosts.forEach(latestPost => {
        // console.log(latestPost.cover_image)
        const latestCard = document.createElement('div')
        latestCard.innerHTML = `
        <div class="card h-[482px] bg-base-100 shadow-xl">
        <figure class="px-5 pt-10">
            <img src="${latestPost.cover_image}" alt="no image"/>
        </figure>
        <div class="px-7 pt-4 items-left text-left mt-0">
            <p class=""><i class="fa-solid fa-calendar-days"> </i> <span> ${latestPost?.author?.posted_date ? latestPost.author.posted_date : 'No Publish Date'}</span></p>
            <h2 class="card-title mt-4 text-lg font-bold mb-3">${latestPost?.title}</h2>
            <p class="text-base text-[#12132D63]">${latestPost?.description}</p>
        </div>
        <!-- Profile Pic & name-->
        <div class="px-7 pt-4 pb-6 items-left text-left mt-0 flex gap-2">
            <img class="h-11 w-11 rounded-full" src="${latestPost?.profile_image}" alt="">
            <div>
                <h1 class="text-base font-bold">${latestPost?.author?.name}</h1>
                <p class="text-base text-[#12132D63]">${latestPost?.author?.designation ? latestPost.author.designation : 'Unknown'}</p>

            </div>

        </div>
    </div>`
        latestPostsContainer.appendChild(latestCard)
    });
    
}
latestPosts()


// Lets Discuss Section Data Fetch

const letsDiscussData = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json();
    const allPosts = data.posts;
    displayLetsDiscussData(allPosts)
}
// Display All Posts in the Lets Discuss Section 
const displayLetsDiscussData = (allPosts) => {
    leftCardContainer.innerHTML=''
    allPosts.forEach(individualPost => {
        toggleLoadingSpinner(true);
        // console.log(individualPost.image)
        const latestPostCardLeft = document.createElement('div')
        const activeStatus = `${individualPost.isActive}`
        // console.log(activeStatus)
        
        let activeStatusLight = '';
        if (activeStatus === 'true') {
            activeStatusLight = `<span id="active-inactive" class="indicator-item bg-green-400 badge"></span>`
        }

        else {
            activeStatusLight = `<span id="active-inactive" class="indicator-item bg-red-600 badge"></span>`
        }
        
        latestPostCardLeft.innerHTML = `
        <div class="bg-white shadow-xl p-5 lg:p-8 space-y-4 rounded-xl lg:flex lg:gap-6">
        <div class="indicator">
        ${activeStatusLight}
            <img class="h-[72px] w-[72px] rounded-[20px]" src="${individualPost.image}" alt="">
        </div>
        <div class="">
            <div class="flex gap-5 tex-xl">
                <div>
                    <p># <span> ${individualPost.category}</span></p>
                </div>
                <div>
                    <p>Author : <span> ${individualPost?.author?.name}</span></p>
                </div>

            </div>
            <h1 class="text-xl font-bold mb-4 mt-3">${individualPost.title}</h1>
            <p class="lg:w-[590px] pb-5">${individualPost.description}</p>
            <hr class="border-t-2 border-dotted border-gray-500 my-8">
            <div class="flex items-center gap-5 lg:gap-[270px] mt-5">
                <div class="flex gap-4 lg:gap-8  items-center">
                    <p><i class="fa-regular fa-message"></i> <span> ${individualPost.comment_count}</span></p>
                    <p><i class="fa-regular fa-eye"></i><span> ${individualPost.view_count}</span></p>
                    <p><i class="fa-regular fa-clock"></i><span> ${individualPost.posted_time}</span><span> min</span></p>
                </div>
                <div>
                    <button onclick ="rightDataLoad('${individualPost.title.replace(/'/g,'')}', '${individualPost.view_count}')"class="btn rounded-full bg-green-500">
                    <i class="fa-regular text-white fa-envelope-open"></i></button>
                </div>
            </div>
        </div>
    </div>`
        leftCardContainer.appendChild(latestPostCardLeft)
    });
}

// Loading Data tto Right side card
let clickCount = 0;
const rightDataLoad = (title, views) => {
    clickCount++;
    console.log(clickCount)
    // console.log(title)
    // console.log(views)
    const rightSideCard = document.createElement('div')
    rightSideCard.innerHTML = `
    <!-- Card mini -->
    <!-- card1-1 -->
    <div class="space-y-3">
    <!-- card1-1 -->
    <div class="shadow-xl bg-white p-4 rounded-xl flex gap-1 items-center">
        <h1 class="text-sm font-bold mb-4 mt-3 w-[290px]">${title}</h1>
        <i class="fa-regular fa-eye"> </i><span> ${views}</span>
    </div>
    </div>
    </div>`
    rightSideCardContainer.appendChild(rightSideCard)
    countField.innerText = clickCount;
}
// Search Handler
const handleSearch = () =>{
// console.log('Clicked me')
const searchField = document.getElementById('search-field')
const searchText = searchField.value.toLowerCase();
// console.log(searchText)
if(searchText === 'coding' || searchText === 'music' || searchText === 'comedy'){
    letsDiscussData(searchText)
    // rightSideCardContainer.innerHTML = ''
    // countField.innerText = 0;
    // clickCount = 0;
    toggleLoadingSpinner(true);
}
else{
    alert("Please Enter Valid Category");
  }
  searchField.value ='';
}

//Loading Spinner for search and lets discuss section
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        leftCardContainer.classList.add('hidden')
        rightTitleField.classList.add('hidden')
        loadingSpinner.classList.remove('hidden');
        setTimeout(() => {
            leftCardContainer.classList.remove('hidden')
            rightTitleField.classList.remove('hidden')
            loadingSpinner.classList.add('hidden');

        }, 1500); // 2000 milliseconds = 2 seconds
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

letsDiscussData('')
