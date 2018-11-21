import React, { Component } from "react";

export default class LandingPreview extends Component {

	renderForm(entry, image) {
		return (
			<div className="result container container--small">
				<div className="result__image">
					<img src={ image } alt={ entry.getIn(["data", "title"]) } title={ entry.getIn(["data", "title"]) } />
				</div>
				<div className="result__form">
					<form id="landingForm" name="landingForm" action="/">
						<div className="form-group">
							<label for="landingFullName">Full Name</label>
							<input id="landingFullName" type="text" name="fullname" required placeholder="Your full name" />
						</div>
						<div className="form-group">
							<label for="landingEmail">Email address</label>
							<input id="landingEmail" type="email" name="email" required placeholder="Your email address" />
						</div>
						<div className="form-group">
							<label for="landingCompany">Company</label>
							<input id="landingCompany" type="text" name="company" required placeholder="Your company name" />
						</div>
						<div>
							<button className="button button--primary button--large dl-button" type="submit" id="landingSubmit">{ entry.getIn(["data", "cta"]) }</button>
						</div>
					</form>
					<a className="is-hidden" href={ entry.getIn(["data", "download"]) }></a>
				</div>
			</div>
		);
	}

  render() {
    const {entry, getAsset, widgetFor, widgetsFor} = this.props;

    let image = getAsset(entry.getIn(["data", "image"]));

    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (image && !image.fileObj) {
      image = window.parent.location.protocol + "//" + window.parent.location.host + image;
    }

		return (
			<article>
				<header className="article-header padder center">
					<div className="container container--small">
						<h1 className="article__title">{ entry.getIn(["data", "title"]) }</h1>
						<p className="content intro">{ entry.getIn(["data", "intro"]) }</p>
					</div>
				</header>
				{ entry.getIn(["data", "formPosition"]) === "belowIntro" ? this.renderForm(entry, image) : "" }
				<section className="container">
					<div className="content">
						{ widgetFor("body") }
					</div>
					{ entry.getIn(["data", "formPosition"]) === "belowContent" ? this.renderForm(entry, image) : "" }
				</section>
			</article>
    );
  }
}
