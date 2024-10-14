const loadPost = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await res.json();
  displayPost(data.posts);
};
loadPost();

const displayPost = (posts) => {
  const allPost = document.getElementById("all-post");
  allPost.textContent = "";
  posts.forEach((post) => {
    const card = document.createElement("div");
    card.classList = "bg-[#797DFC1A] h-[270px] rounded-2xl py-10 px-10 mb-10";
    card.innerHTML = `
    <div class="flex w-full">
    <div class="relative">  
    ${
      post.isActive
        ? `<div class="bg-green-600 w-4 h-4 rounded-full absolute right-0 top-0"></div>`
        : `<div class="bg-red-600 w-4 h-4 rounded-full absolute right-0 top-0"></div>`
    } 
     <img class="w-16 h-14 rounded-sm" src="${post.image}" alt="" />
      
     </div>

              <div class="pl-6 w-full">
                <p class="text-sm">
                  <span class="font-bold pr-2"># ${
                    post.category
                  }</span> Author : ${post.author.name}
                </p>
                <h3 class="text-xl font-bold py-3">
                ${post.title}
                </h3>
                <p>
                  ${post.description}
                </p>
                <div class="border border-dashed border-black/20 mt-10"></div>
                <div class="flex justify-between mt-5">
                <div class=" flex">
                  <span>
                    <i class="fa-regular fa-message mr-2"></i>
                     ${post.comment_count}
                  </span>
                  <span class="ml-5">
                    <i class="fa-regular fa-eye mr-2"></i>
                 ${post.view_count}
                  </span>
                  <span class="ml-5">
                    <i class="fa-regular fa-clock mr-2"></i>
                    ${post.posted_time} min
                  </span>
                </div>
                <div>
                  <button onclick="handleRead(${post?.id})" href="#">
                  <i class="fa-regular fa-envelope-open bg-green-700 text-white p-2 rounded-full"></i>
                  </button>
                  </div>
                  </div>
              </div>
            </div>`;
    allPost.appendChild(card);
    // console.log(post);
  });
};

let count = 1;

const handleRead = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?id=${id}`
  );
  const data = await res.json();
  const allPost = data.posts;
  const post = allPost.find((post) => post.id == id);
  const markRead = document.getElementById("mark-read");
  const card2 = document.createElement("div");
  card2.classList =
    "bg-white rounded-md p-5 mb-5 text-lg font-semibold flex justify-between";
  card2.innerHTML = `
  <p class=" "> ${post.title}</p>
  <span class="ml-5">
  <i class="fa-regular fa-eye mr-2"></i>  ${post.view_count}
  </span>
  `;
  markRead.appendChild(card2);
  const countText = document.getElementById("count");
  countText.innerText = count++;
};

// Latest Post

const latestPost = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  displayLatestPost(data);
};
latestPost();

const displayLatestPost = (posts) => {
  const latestPost = document.getElementById("latest-post");
  latestPost.textContent = "";
  posts.forEach((post) => {
    const card = document.createElement("div");
    card.classList = "border px-8 py-8 rounded-xl mb-5";
    card.innerHTML = `
    <img class="w-[326px] h-[190px] rounded-xl" src="${
      post.cover_image
    }" alt="" />
            <div class="pt-3">
              <p><i class="fa-regular fa-calendar mr-2"></i> ${
                post.author.posted_date
                  ? post.author.posted_date
                  : "No publish date"
              } </p>
              <h4 class="font-bold text-xl py-2">
               ${post.title}
              </h4>
              <p>
               ${post.description}
              </p>
              <div class="pt-6 flex">
                <img class="w-11 h-11 rounded-full" src="${
                  post?.profile_image
                }" alt="" />
                <div class="pl-5">
                  <p class="font-bold">${post?.author?.name}</p>
                  <p class="text-gray-400">
                  ${
                    post.author.designation
                      ? post.author.designation
                      : "Unknown"
                  }
                  </p>
                </div>
              </div>
            </div>`;
    latestPost.appendChild(card);
  });
};

const handleSearch = async () => {
  const input = document.getElementById("input").value;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${input}`
  );
  const data = await res.json();
  displayPost(data.posts);
};
