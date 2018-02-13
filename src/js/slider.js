import Siema from 'siema';

export default function slider() {

	console.log('slider has loaded');
	console.log('----------------------------------------');

	if (document.querySelector('.siema') !== null) {
		const slider = new Siema({
			loop: true
		});
		
		const prev = document.querySelector('.siema__prev').addEventListener('click', () => slider.prev());
		const next = document.querySelector('.siema__next').addEventListener('click', () => slider.next());
	}
}
