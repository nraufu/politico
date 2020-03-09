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
const modal_create = document.querySelector(".js-modal");
const modal_info = document.querySelector(".js-party-modal");
const onSuccess = document.querySelector('.modal-politician');
const createPartyBtn = document.querySelector(".js-create-party");
const modalCancelBtn = document.querySelector(".js-cancel-modal");
const viewBtn = document.querySelectorAll('.js-view-party');
const placeBtn = document.querySelector('.js-place-button');

const showCreateModal = (e) => {
	modal_create.style.display = 'block';
};

const hideModal = (e) => {
	modal_create.style.display = 'none';
}

const showPartyModal = (e) => {
	modal_info.style.display = 'block';
}

const showSuccess = (e) => {
	onSuccess.style.display = 'block';
	e.preventDefault();
}

if(placeBtn) placeBtn.addEventListener('click', showSuccess);
if(createPartyBtn) createPartyBtn.addEventListener('click', showCreateModal);
if(modalCancelBtn) modalCancelBtn.addEventListener('click', hideModal);
if(viewBtn) {
	for (let i = 0; i < viewBtn.length; i++) {
		viewBtn[i].addEventListener('click', showPartyModal);
	}
}

//edit party function
let editMode = false;
const storyEditBtn = document.querySelector(".js-edit-story");

const editStory = (e) => {
	const el = document.querySelector(".js-content");
	if (!editMode) {
		const range = document.createRange();
		const sel = window.getSelection();
		range.setStart(el.childNodes[0], 0);
		range.collapse(true);
		sel.removeAllRanges();
		sel.addRange(range);
		el.focus();
		e.target.innerHTML = "Save";
		editMode = true;
	}
	else {
		e.target.innerHTML = "Edit";
		editMode = false;
		window.focus();
	}
};

if (storyEditBtn) storyEditBtn.addEventListener('click', editStory);
