function showSection(sectionId) {
  const sections = document.getElementsByTagName('section');
  for (let i = 0; i < sections.length; i++) {
    sections[i].style.display = 'none';
  }
  document.getElementById(sectionId).style.display = 'block';
}

function searchNews() {
  // RSS feed URL for bioinformatics news
  const rssFeedUrl = 'https://journals.plos.org/ploscompbiol/feed/rss';

  // Number of news items to display
  const newsItemCount = 10;

  // Fetch the RSS feed
  fetch(rssFeedUrl)
    .then(response => response.text())
    .then(xmlString => {
      // Parse the XML string to an XML document
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

      // Retrieve the news items from the XML document
      const items = xmlDoc.getElementsByTagName('item');

      // Update the newsContent element with the retrieved data
      const newsContent = document.getElementById('newsContent');
      // Clear previous content
      newsContent.innerHTML = '';

      // Iterate through the news items and create HTML elements for each item
      for (let i = 0; i < Math.min(newsItemCount, items.length); i++) {
        const item = items[i];
        const title = item.querySelector('title').textContent;
        const link = item.querySelector('link').textContent;
        const description = item.querySelector('description').textContent;

        const newsItemElement = document.createElement('div');
        newsItemElement.classList.add('news-item');
        newsItemElement.innerHTML = `
          <h2>${title}</h2>
          <p>${description}</p>
          <a href="${link}" target="_blank">Read more</a>
        `;

        // Append the news item element to the newsContent element
        newsContent.appendChild(newsItemElement);
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
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
