export default function contactForm() {

	console.log('contactForm has loaded');
	console.log('----------------------------------------');

	var form 		= document.getElementById('contactForm'),
		email 		= document.getElementById('contactEmail'),
		fullname 	= document.getElementById('contactFullName'),
		phone 		= document.getElementById('contactNumber'),
		message 	= document.getElementById('contactMessage'),
		// Date and time
		now 		= new Date(),
		tomorrow 	= now.setHours(now.getHours() + 24);

	form.addEventListener('submit', function(e) {
		e.preventDefault();
		console.log("Form submitted");

		// Get the email of the visitor
		window._agile.set_email(email.value);

		// Create and send the contact
		var contact = {};
		contact.email = email.value;
		contact.first_name = fullname.value.split(' ')[0];
		contact.last_name = fullname.value.split(' ')[1];
		contact.phone = phone.value;
		contact.tags = "website contact form";

		window._agile.create_contact(contact, {
			success: function (data) {
				alert("Thanks, we'll be in touch!");
				console.log(data);
				createAgileTask();
			},
			error: function (data) {
				alert("Sorry, we could not complete your request!");
				console.log(data);
			}
		});

		var createAgileTask = function() {
			// Create and send task
			var task = {};
			task.type = "FOLLOW_UP";
			task.priority_type = "HIGH";
			task.subject = fullname.value.split(' ')[0] + ' ' + fullname.value.split(' ')[1] + ' made an enquiry on your website.';
			task.due = tomorrow;

			window._agile.add_task(task, {
				success: function (data) {
					console.log("success");
					console.log(data);
					createAgileNote();
				},
				error: function (data) {
					console.log("error");
					console.log(data);
				}
			});
		}

		var createAgileNote = function() {
			var note = {};
			note.subject = fullname.value.split(' ')[0] + ' ' + fullname.value.split(' ')[1] + ' made an enquiry on your website.';
			note.description = message.value;

			_agile.add_note(note, {
				success: function (data) {
					console.log("success");
					console.log(data);
				},
				error: function (data) {
					console.log("error");
					console.log(data);
				}
			});
		}
	});

}
