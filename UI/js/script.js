// Responsive side menu

const closeMenuButton = document.querySelector('.js-close-menu');
const openMenuButton = document.querySelector('.js-open-menu');

const hideSideBar = (e) => {
	document.querySelector('.js-nav-list').style.display = "none";	
};

const showSideBar = (e) => {
	document.querySelector('.js-nav-list').style.display = "block";	
};

const toggleSideBar = (e) => {
	if (document.documentElement.clientWidth > 768) {
		document.querySelector('.js-nav-list').style.display = "block";		
	}
	else {
		document.querySelector('.js-nav-list').style.display = "none";	
	}
};

if (closeMenuButton) closeMenuButton.addEventListener('click', hideSideBar);
if (openMenuButton) openMenuButton.addEventListener('click', showSideBar);
window.addEventListener('resize', toggleSideBar);
