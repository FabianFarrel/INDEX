const blogs = [];

function addBlog(e) {
  e.preventDefault();

  const title = document.getElementById("input-blog-title").value; 
  const content = document.getElementById("input-blog-content").value;  
  let image = document.getElementById("input-blog-image").files; 

  image = URL.createObjectURL(image[0]);

  const createdAt = new Date();

  const blog = {
    title,
    content,
    image,
    createdAt,
  };

  console.log("blog");
  blogs.unshift(blog);
  renderBlog();

  console.log("blogs", blogs);
}

function renderBlog() {
  let html = "";

  for (let index = 0; index < blogs.length; index++) {

    html += `
        <div class="blog-list-item">
            <div class="blog-image">
                <img src="${blogs[index].image}" alt="" />
            </div>
            <div class="blog-content">
                <div class="btn-group">
                    <button class="btn-edit">Edit Post</button>
                    <button class="btn-post">Delete Post</button>
                </div>
                <h1>
                    <a href="blog-detail.html" target="_blank">${blogs[index].title}</a>
                </h1>
                <div class="detail-blog-content">
                    ${getFullTime(blogs[index].createdAt)} | Ichsan Emrald Alamsyah
                </div>
                <p style="width: 100%;">
                  ${blogs[index].content}
                </p>

                <div> 
                    <p style="width:100%">${getDistanceTime(blogs[index].createdAt)}</p>
                </div>
            </div>
        </div>
`;
  }

  document.getElementById("contents").innerHTML = html;
}

function getFullTime(dates) {

  let minutes = dates.getMinutes();
  let hours = dates.getHours();
  const date = dates.getDate();
  const month = dates.getMonth();
  const year = dates.getFullYear();

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${date} ${months[month]} ${year} ${hours}:${minutes} WIB`;
}

function getDistanceTime(timePost) {
  
  let timeNow = new Date();

  let distance = timeNow - timePost; 

  const seconds = Math.floor(distance / 1000);
  const minutes = Math.floor(distance / 1000 / 60);
  const hours = Math.floor(distance / 1000 / 60 / 60);
  const day = Math.floor(distance / 1000 / 60 / 60 / 24);

  if (seconds < 60) {
    return seconds + " seconds ago";
  } else if (minutes < 60) {
    return minutes + " minutes ago";
  } else if (hours < 60) {
    return hours + " hours ago";
  } else if (day < 24) {
    return day + " day ago";
  }
}

renderBlog();

setInterval(() => {
  renderBlog();
}, 1000);
