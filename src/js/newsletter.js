export default function Newsletter() {

	console.log('Newsletter() ::: Running!');
	console.log('----------------------------------------');

	var form = document.getElementById('newsletterForm'),
			email = document.getElementById('newsletterEmail'),
			// Date and time
			now 		= new Date(),
			tomorrow 	= now.setHours(now.getHours() + 24);

	if (form !== null) {
		form.addEventListener('submit', function(e) {
			e.preventDefault();

			if (email.validity.valid) {
				console.log("Newsletter submitted");

				// Get the email of the visitor
				window._agile.set_email(email.value);

				// Create and send the contact
				var contact = {};
				contact.email = email.value;
				contact.tags = "website newsletter form";

				window._agile.create_contact(contact, {
					success: function (data) {
						alert("Thanks for signing up!");
						//console.log(data);
						createAgileTask();
					},
					error: function (data) {
						alert("Sorry, we could not complete your request!");
						//console.log(data);
					}
				});

				var createAgileTask = function() {
					// Create and send task
					var task = {};
					task.type = "EMAIL";
					task.priority_type = "NORMAL";
					task.subject = contact.email + ' has subscribed to your newsletter.';
					task.due = tomorrow;

					window._agile.add_task(task, {
						success: function (data) {
							//console.log("Success creating task");
							//console.log(data);
						},
						error: function (data) {
							console.log("Error creating task");
						}
					});
				}
			}
		});
	}
}
