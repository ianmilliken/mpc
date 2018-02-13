import ContactForm from './contactForm';
import Slider from './slider';
//import SVGImageReplacer from './svgImageReplacer';

// Internal scripts
ContactForm();
Slider();
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
