export default function Choices() {

	console.log('Choices has loaded');
	console.log('----------------------------------------');

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
						document.querySelector('[data-download]').click();
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
