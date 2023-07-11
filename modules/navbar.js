// event listeners to nav. links
const navLinks = document.querySelectorAll('nav a');

const showSection = (sectionId) => {
  // Hide contents sections
  const contentSections = document.querySelectorAll('.content-section');
  contentSections.forEach((section) => {
    section.classList.add('hidden');
  });

  // Display the selected content section
  const selectedSection = document.getElementById(sectionId);
  selectedSection.classList.remove('hidden');
};

const handleNav = () => {
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      // Active class removal from all nav. items
      navLinks.forEach((navLink) => {
        navLink.classList.remove('active');
      });

      // Active class to the clicked nav item addition
      link.classList.add('active');

      const sectionId = link.getAttribute('href').substring(1);
      showSection(sectionId);
    });
  });
};

export default handleNav;
