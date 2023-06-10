function showSection(sectionId) {
  const sections = document.getElementsByTagName('section');
  for (let i = 0; i < sections.length; i++) {
    sections[i].style.display = 'none';
  }
  document.getElementById(sectionId).style.display = 'block';
}

function searchNews() {
  const searchInput = document.getElementById('newsSection').querySelector('input');
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    // Perform search operation for news using the searchTerm
    // Example: fetch news data from an API
    fetch('https://bionews-api.herokuapp.com/api/posts?category=bioinformatics&limit=10')
      .then(response => response.json())
      .then(newsData => {
        // Update the newsContent element with the retrieved data
        const newsContent = document.getElementById('newsContent');
        // Clear previous content
        newsContent.innerHTML = '';

        // Iterate through the newsData and create HTML elements for each news item
        newsData.forEach(newsItem => {
          const newsItemElement = document.createElement('div');
          newsItemElement.classList.add('news-item');
          newsItemElement.innerHTML = `
            <h2>${newsItem.title}</h2>
            <p>${newsItem.description}</p>
            <a href="${newsItem.url}">Read more</a>
          `;

          // Append the news item element to the newsContent element
          newsContent.appendChild(newsItemElement);
        });
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
}

function searchProjects() {
  const searchInput = document.getElementById('projectsSection').querySelector('input');
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    // Perform search operation for projects using the searchTerm
    // Example: fetch project data from an API
    fetch('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=bioproject&term=bioinformatics&retmax=10')
      .then(response => response.json())
      .then(projectsData => {
        // Update the projectsContent element with the retrieved data
        const projectsContent = document.getElementById('projectsContent');
        // Clear previous content
        projectsContent.innerHTML = '';

        // Iterate through the projectsData and create HTML elements for each project
        projectsData.forEach(project => {
          const projectElement = document.createElement('div');
          projectElement.classList.add('project-item');
          projectElement.innerHTML = `
            <h2>${project.name}</h2>
            <p>${project.description}</p>
            <a href="${project.url}">View project</a>
          `;

          // Append the project element to the projectsContent element
          projectsContent.appendChild(projectElement);
        });
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
}
