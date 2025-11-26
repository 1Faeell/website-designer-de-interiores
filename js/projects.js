// ========== DADOS DOS PROJETOS ==========
const projectsData = [
  {
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=800&fit=crop",
    title: "",
    subtitle: "Design Contemporâneo",
    large: true,
  },
  {
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
    title: "",
    subtitle: "Minimalismo Funcional",
  },
  {
    img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&h=400&fit=crop",
    title: "",
    subtitle: "Elegância Atemporal",
  },
  {
    img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=400&fit=crop",
    title: "",
    subtitle: "Produtividade & Estilo",
  },
  {
    img: "https://images.unsplash.com/photo-1687180498602-5a1046defaa4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "",
    subtitle: "Luxo & Conforto",
  },
  {
    img: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600&h=400&fit=crop",
    title: "",
    subtitle: "Conexão Natural",
  },
];

// ========== RENDERIZA OS PROJETOS ==========
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return; // segurança

  grid.innerHTML = projectsData
    .map(
      (project) => `
        <div class="project-card ${project.large ? "project-large" : ""}">
          <img src="${project.img}" alt="${project.title}" />
          <div class="project-overlay">
            <h3>${project.title}</h3>
            <p>${project.subtitle}</p>
          </div>
        </div>
      `
    )
    .join("");
}

// Chama a função depois que o DOM já existe
document.addEventListener("DOMContentLoaded", renderProjects);
