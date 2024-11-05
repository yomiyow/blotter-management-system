const menus = document.querySelectorAll('.js-menu');
const dropDownMenu = document.querySelectorAll('.js-dropdown-menu');

function showDropDown(dropDown) {
  dropDown.style.display = 'flex';
}

function hideDropDown(dropDown) {
  dropDown.style.display = 'none';
}

// Hide all dropdowns at start up

dropDownMenu.forEach((dropDown) => {
  hideDropDown(dropDown);
});

/*
  Hides all dropdown menus when the 
  document is clicked outside of a menu.
*/
document.addEventListener('click', (event) => {
  if (!event.target.closest('.js-menu'))
    dropDownMenu.forEach((dropDown) => hideDropDown(dropDown));
});

menus.forEach((menu) => {
  menu.addEventListener('click', (event) => {
    dropDownMenu.forEach((dropDown) => {
      (dropDown === menu.nextElementSibling) ?
        showDropDown(dropDown) : hideDropDown(dropDown);
    });
  });
});