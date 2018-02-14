// Site drawer

export default function NavDrawer() {

  console.log('NavDrawer has loaded');
  console.log('----------------------------------------');

  const burger = document.querySelector('.burger');
  const drawer = document.querySelector('.drawer');
  console.log('1')
  console.log(drawer)

  const addClasses = (target) => {
    drawer.classList.add('is-active');
  }

  const removeClasses = () => {
    drawer.classList.remove('is-active');
  }

  burger.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('2')
    console.log(drawer)
    addClasses();
  })

}
