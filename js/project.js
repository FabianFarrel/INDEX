document.addEventListener("DOMContentLoaded", function () {
  const Form = document.querySelector(".container__form");
  const cardContainer = document.querySelector(".card__project__container");

  let dataBlog = [];

  Form.addEventListener("submit", function (event) {
    event.preventDefault();

    const projectName = document.getElementById("name").value;
    const startDate = document.getElementById("start_date").value;
    const endDate = document.getElementById("end_date").value;
    const description = document.getElementById("description").value;
    const imageUpload = document.getElementById("image_upload").files[0];

    if (!projectName || !startDate || !endDate || !description || !imageUpload) {
      alert("Jangan ada yg kosong");
      return;
    }

    const technologies = Array.from(document.querySelectorAll('input[name="technologies"]:checked')).map((checkbox) => checkbox.value);

    let blog = {
      projectName,
      startDate,
      endDate,
      description,
      imageUpload,
      technologies,
    };

    dataBlog.push(blog);
    console.log(dataBlog);

    Project();

    Form.reset();
  });

  function Project() {
    cardContainer.innerHTML = "";

    dataBlog.forEach((blogItem, indexIconEdit) => {
      const ImageNew = URL.createObjectURL(blogItem.imageUpload);
      const newCardProject = document.createElement("div");
      newCardProject.className = "card__project__item";

      const technologyIcons = blogItem.technologies
        .map((tech) => {
          switch (tech) {
            case "nodejs":
              return '<i class="fab fa-node-js"></i>';
            case "nextjs":
              return '<i class="fab fa-js"></i>'; 
            case "typescript":
              return '<i class="fas fa-code"></i>';
            case "reactjs":
              return '<i class="fab fa-react"></i>';
            default:
              return "";
          }
        })
        .join("");

      newCardProject.innerHTML = `
        <img src="${ImageNew}" alt="Project Image" />
        <div class="down__item">
          <h3>${blogItem.projectName}</h3>
          <div class="start__end" style="display: flex;">
            <h4>${blogItem.startDate}</h4>
            <span> -- </span>
            <h4>${blogItem.endDate}</h4>
          </div>
          <p>${blogItem.description}</p>
          <div class="icon" style="display: flex">
            ${technologyIcons}
          </div>
          <div class="btn">
            <button class="edit-btn" data-index="${indexIconEdit}">Edit</button>
            <button class="delete-btn" data-index="${indexIconEdit}">Delete</button>
          </div>
        </div>
      `;

      newCardProject.querySelector(".delete-btn").addEventListener("click", function () {
        const indexIconEdit = this.getAttribute("data-index");
        dataBlog.splice(indexIconEdit, 1);
        Project();
      });

      cardContainer.appendChild(newCardProject);
    });
  }
});