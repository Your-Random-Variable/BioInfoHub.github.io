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
    const rssFeedUrl = 'https://journals.plos.org/ploscompbiol/feed/rss'; // Replace with the actual RSS feed URL

    fetch(rssFeedUrl)
      .then(response => response.text())
      .then(xmlData => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, 'application/xml');
        const items = xmlDoc.getElementsByTagName('item');

        // Update the newsContent element with the retrieved RSS feed items
        const newsContent = document.getElementById('newsContent');
        newsContent.innerHTML = '';

        for (let i = 0; i < items.length; i++) {
          const title = items[i].getElementsByTagName('title')[0].textContent;
          const description = items[i].getElementsByTagName('description')[0].textContent;
          const link = items[i].getElementsByTagName('link')[0].textContent;

          const newsItemElement = document.createElement('div');
          newsItemElement.classList.add('news-item');
          newsItemElement.innerHTML = `
            <h2>${title}</h2>
            <p>${description}</p>
            <a href="${link}" target="_blank">Read more</a>
          `;

          newsContent.appendChild(newsItemElement);
        }
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
    fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=bioproject&term=${searchTerm}&retmax=10`)
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
