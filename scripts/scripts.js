// alert('Connected')
// Latest post Field
const latestPostsContainer = document.getElementById('latest-Post-Container')
// Latest post Data Fetch
const latestPosts = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    console.log(data)
    displayLatestPost(data)
}
const displayLatestPost =(LatestPosts) =>{
    LatestPosts.forEach(latestPost => {
        console.log(latestPost.cover_image)
        const latestCard = document.createElement('div')
        latestCard.innerHTML =`
        <div class="card h-[482px] bg-base-100 shadow-xl">
        <figure class="px-5 pt-10">
            <img src="${latestPost.cover_image}" alt="no image"/>
        </figure>
        <div class="px-7 pt-4 items-left text-left mt-0">
            <p class=""><i class="fa-solid fa-calendar-days"> </i> <span> ${latestPost?.author?.posted_date ? latestPost.author.posted_date :'No Publish Date' }</span></p>
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