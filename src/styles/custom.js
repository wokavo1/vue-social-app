const successModal = new bootstrap.Modal("#success");
const popupSignup = new bootstrap.Modal("#popup-signup");
const navMenu = new bootstrap.Modal("#nav-menu");

function on_form_submit() {
    successModal.show();
    popupSignup.hide();
}

function on_nav_menu_item_click() {
    navMenu.hide();
}
