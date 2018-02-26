import ContactForm from './contactForm';
import Slider from './slider';
import NavDrawer from './navDrawer';
import Choices from './choices';
import Newsletter from './newsletter';
//import SVGImageReplacer from './svgImageReplacer';

// Internal scripts
ContactForm();
Slider();
NavDrawer();
Choices();
Newsletter();
//SVGImageReplacer();


// Better login handling
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}


// Navbar link effect
const links = document.querySelectorAll('[data-strike]');
let i;

for (i = 0; i < links.length; i++) {
	var node = links[i];
	node.addEventListener('mouseover', (e) => {
		//console.log(e.currentTarget.children[1]);
    e.currentTarget.children[1].classList.add('animate--strike');
	})
  node.addEventListener('mouseout', (e) => {
    //console.log(e.currentTarget.children[1]);
    e.currentTarget.children[1].classList.remove('animate--strike');
  })
}
