export default function Choices() {

	console.log('Choices has loaded');
	console.log('----------------------------------------');

	var picked;

	const choices = document.querySelectorAll('[data-choice]'),
				results = document.querySelectorAll('[data-result]'),
				steps = document.querySelectorAll('[data-choice-step]');

	for (let i = 0; i < choices.length; i++) {
		choices[i].addEventListener('click', function(e) {
			e.preventDefault();
			proceed(choices[i].dataset.choice);
		})
	}

	function proceed(choice) {
		//console.log(choice);
		var resultArray = findMatchingResult(choice);
		//console.log('Match is ::: ' + x)
		picked = choice;
		console.log(picked);
		steps[0].classList.add('is-hidden');
		steps[1].classList.remove('is-hidden');
		for (let i = 0; i < resultArray.length; i++) {
			resultArray[i].classList.remove('is-hidden');
		}
	}

	function findMatchingResult(choice) {
		var arr = [];
		for (let i = 0; i < results.length; i++) {
			if (results[i].dataset.result === choice) {
				arr = arr.concat(results[i]);
			}
		}
		return arr;
	}

	document.getElementById('choiceBack').addEventListener('click', function(e) {
		e.preventDefault();
		picked = undefined;
		console.log(picked);
		steps[0].classList.remove('is-hidden');
		steps[1].classList.add('is-hidden');
		for (let i = 0; i < results.length; i++) {
			results[i].classList.add('is-hidden');
		}
	});





	// Handle form submit
	const form = document.getElementById('landingForm'),
				email = document.getElementById('landingEmail'),
				fullname = document.getElementById('landingFullName'),
				company = document.getElementById('landingCompany'),
				// Date and time
				now = new Date(),
				tomorrow = now.setHours(now.getHours() + 24);

	if (form !== null) {
		form.addEventListener('submit', function(e) {
			e.preventDefault();
			if (email.validity.valid && fullname.validity.valid && company.validity.valid) {
				//alert('all valid!');
				// Get the email of the visitor
				window._agile.set_email(email.value);

				// Set last name
				var last_name = fullname.value.split(' ')[1];

				// Create and send the contact
				var contact = {};
				contact.email = email.value;
				contact.first_name = fullname.value.split(' ')[0];
				contact.last_name = last_name !== undefined ? last_name : '';
				contact.company = company.value;
				contact.tags = "website landing page form";

				window._agile.create_contact(contact, {
					success: function (data) {
						alert("Thanks, we'll be in touch!");
						//console.log(data);
						createAgileTask();
						document.querySelector('[data-download=' + picked + ']').click();
					},
					error: function (data) {
						alert("Sorry, we could not complete your request!");
						//console.log(data);
					}
				});

				var createAgileTask = function() {
					// Create and send task
					var task = {};
					task.type = "FOLLOW_UP";
					task.priority_type = "HIGH";
					task.subject = fullname.value.split(' ')[0] + ' ' + fullname.value.split(' ')[1] + ' downloaded the market calendar form your website.';
					task.due = tomorrow;

					window._agile.add_task(task, {
						success: function (data) {
							//console.log("Success creating task");
							console.log(data);
						},
						error: function (data) {
							console.log("Error creating task");
							//console.log(data);
						}
					});
				}
			}
		});
	}
}
