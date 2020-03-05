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

//modals functions
const modal = document.querySelector(".js-modal");
const createPartyBtn = document.querySelector(".js-create-story");
const modalCancelBtn = document.querySelector(".js-cancel-modal");

const showCreateModal = (e) => {
	modal.style.display = 'block';
};

const hideModal = (e) => {
	modal.style.display = 'none';
}

if(createPartyBtn) createPartyBtn.addEventListener('click', showCreateModal);
if(modalCancelBtn) modalCancelBtn.addEventListener('click', hideModal);