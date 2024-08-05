const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", "views");

app.use("/assets", express.static("assets"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const projects = [];

// routing
app.get("/", (req, res) => {
   res.render("index", {
      data: "ini data dari backend/server",
   });
});
app.get("/project", renderProject);
app.post("/project", addProject);
app.get("/contact", renderContact);
app.get("/testimonial", renderTestimonial);
app.get("/project-detail/:project_id", renderProjectDetail);
app.get("/edit-project/:project_id", renderEditProject);
app.post("/edit-project/:project_id", editProject);
app.get("/delete-project/:project_id", deleteProject);

function renderContact(req, res) {
   res.render("contact");
}

function renderTestimonial(req, res) {
   res.render("testimonial");
}

function renderProject(req, res) {
   res.render("project", {
      data: [...projects],
   });
}

function addProject(req, res) {
   console.log(req.body);

   const newProject = {
      id: projects.length + 1,
      title: req.body.title,
      content: req.body.content,
      createdAt: new Date(),
      author: "Fabian",
   };

   projects.push(newProject);

   res.redirect("/project");
}

function renderProjectDetail(req, res) {
   const id = req.params.project_id;

   const project = projects.find((project) => project.id == id);

   res.render("project-detail", {
      data: project,
   });
}

function renderEditProject(req, res) {
   const id = req.params.project_id;

   const project = projects.find((project) => project.id == id);
   console.log(projects);
   res.render("edit-project", {
      data: project,
   });
}

function editProject(req, res) {
   const id = req.params.project_id;
   const newProject = {
      id: id,
      title: req.body.title,
      content: req.body.content,
      createdAt: new Date(),
      author: "Fabian",
   };

   const index = projects.findIndex((project) => project.id == id);

   projects[index] = newProject;

   res.redirect("/project");
}

function deleteProject(req, res) {
   const id = req.params.project_id;

   const index = projects.findIndex((project) => project.id == id);

   projects.splice(index, 1);

   res.redirect("/project");
}

// akhir routes

app.listen(port, () => {
   console.log(`Server berjalan di port ${port}`);
});