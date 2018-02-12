import ContactForm from './contactForm';
//import SVGImageReplacer from './svgImageReplacer';

// Internal scripts
ContactForm();
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
