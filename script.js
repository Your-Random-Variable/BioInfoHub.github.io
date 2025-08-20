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
async function fetchNews() {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = 'Loading news...';

  const parser = new RSSParser();
  const proxyUrl = 'https://api.allorigins.win/get?url=';
  const feedUrl = 'https://bioinformaticsreview.com/feed/';

  try {
    const response = await fetch(proxyUrl + encodeURIComponent(feedUrl));
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();
    const feed = await parser.parseString(data.contents);

    let html = '';
    feed.items.forEach(item => {
      const title = item.title || '';
      const link = item.link || '';
      const pubDate = item.pubDate ? new Date(item.pubDate).toLocaleDateString() : '';
      const description = item.content || item.description || '';
      let image = '';

      if (item.enclosure && item.enclosure.url) {
        image = item.enclosure.url;
      } else {
        const imgMatch = description.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch && imgMatch[1]) image = imgMatch[1];
      }

      html += `
        <div class="news-item">
          ${image ? `<div class="news-image"><img src="${image}" alt="${title}"></div>` : ''}
          <div class="news-content">
            <h3 class="news-title"><a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a></h3>
            <p class="news-description">${description.replace(/<[^>]+>/g, '').substring(0, 200)}...</p>
            <p class="news-pubdate">${pubDate}</p>
            <p class="news-source">Source: Bioinformatics Review</p>
          </div>
        </div>
      `;
    });

    newsContainer.innerHTML = html;
  } catch (error) {
    console.error('Error fetching news:', error);
    newsContainer.innerHTML = 'Failed to fetch news.';
  }
}
function toggleBlogDetails(button) {
  const blogPost = button.closest('.blog-post');
  const blogDetails = blogPost.querySelector('.blog-details');
  const blogImage = blogPost.querySelector('.blog-image');

  blogDetails.classList.toggle('hidden');
  blogImage.classList.toggle('expanded');
  button.textContent = blogDetails.classList.contains('hidden') ? 'Read More' : 'Read Less';
}



