const repositoryList = document.querySelector("#repository-list");
const repositoryCount = document.querySelector("#repository-count");
const status = document.querySelector("#status");

const formatDate = (dateString) => {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium"
  }).format(new Date(`${dateString}T00:00:00`));
};

const formatStars = (stars) => {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(stars);
};

const createRepositoryItem = (repository) => {
  const item = document.createElement("li");
  item.className = "repository-item";
  item.innerHTML = `
    <div>
      <a class="repository-link" href="${repository.url}" target="_blank" rel="noreferrer">
        ${repository.name}
      </a>
      <p class="repository-description">${repository.description}</p>
    </div>
    <div class="repository-meta">
      <span class="language">${repository.language}</span>
      <span>${formatStars(repository.stars)} stars</span>
      <time datetime="${repository.starredAt}">${formatDate(repository.starredAt)}</time>
    </div>
  `;
  return item;
};

const renderRepositories = (repositories) => {
  repositoryList.replaceChildren(...repositories.map(createRepositoryItem));
  repositoryCount.textContent = `${repositories.length} repositories`;
  status.textContent = "";
};

const loadRepositories = async () => {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    renderRepositories(repositories);
  } catch (error) {
    status.textContent = "The repository list could not be loaded. Please try again later.";
    console.error(error);
  }
};

loadRepositories();