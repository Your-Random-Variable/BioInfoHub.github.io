function showSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    section.style.display = 'none';
  });
  
  // Show the selected section
  const selectedSection = document.getElementById(sectionId);
  selectedSection.style.display = 'block';
}

// Load the default section on page load
window.addEventListener('load', () => {
  showSection('home');
});
