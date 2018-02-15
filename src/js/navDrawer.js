// Site drawer

export default function NavDrawer() {

  console.log('NavDrawer has loaded');
  console.log('----------------------------------------');

  const burger = document.querySelector('.burger');
  const drawer = document.querySelector('.drawer');
	const close = document.querySelector('.drawer__close');

  const addClasses = (target) => {
    drawer.classList.add('is-active');
  }

  const removeClasses = () => {
    drawer.classList.remove('is-active');
  }

  if (burger !== null) {
		burger.addEventListener('click', (e) => {
	    e.preventDefault();
	    addClasses();
	  })

		close.addEventListener('click', (e) => {
			e.preventDefault();
			removeClasses();
		})
	}

}
