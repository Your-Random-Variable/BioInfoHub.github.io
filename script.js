function showSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.remove('page-transition-enter-active');
    section.style.display = 'none';
  });

  // Show the selected section
  const selectedSection = document.getElementById(sectionId);
  selectedSection.style.display = 'block';
  selectedSection.classList.add('page-transition-enter-active');

  // Remove the class after the transition ends
  selectedSection.addEventListener('transitionend', () => {
    selectedSection.classList.remove('page-transition-enter-active');
  });

  // Update the active link in the navigation
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.classList.remove('active');
  });

  const selectedNavLink = document.querySelector(`nav ul li a[onclick="showSection('${sectionId}')"]`);
  selectedNavLink.classList.add('active');

  // Fetch and display news if the section is the "News" section
  if (sectionId === 'news') {
    fetchNews();
  }
}
function fetchNews() {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = 'Loading news...';

  const parser = new RSSParser();
  const feedUrl = 'http://bioinformaticsreview.com/feed/rss.xml'; // Replace with the URL of your RSS feed

  parser.parseURL(feedUrl)
    .then(feed => {
      let html = '';

      feed.items.forEach(item => {
        const title = item.title;
        const link = item.link;
        const pubDate = new Date(item.pubDate).toLocaleDateString();
        const description = item.contentSnippet;
        const image = item.enclosure && item.enclosure.url;

        html += `
          <div class="news-item">
            <div class="news-image">
              <img src="${image}" alt="${title}">
            </div>
            <div class="news-content">
              <h3 class="news-title"><a href="${link}">${title}</a></h3>
              <p class="news-description">${description}</p>
              <p class="news-pubdate">${pubDate}</p>
              <p class="news-source">Source: UN Website</p> <!-- Added line for source -->
            </div>
          </div>
        `;
      });

      newsContainer.innerHTML = html;
    })
    .catch(error => {
      console.error('Error fetching news:', error);
      newsContainer.innerHTML = 'Failed to fetch news.';
    });
}
function toggleBlogDetails(button) {
  const blogPost = button.closest('.blog-post');
  const blogDetails = blogPost.querySelector('.blog-details');
  const blogImage = blogPost.querySelector('.blog-image');

  blogDetails.classList.toggle('hidden');
  blogImage.classList.toggle('expanded');
  button.textContent = blogDetails.classList.contains('hidden') ? 'Read More' : 'Read Less';
}

