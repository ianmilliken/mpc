import React, { Component } from "react";

export default class WorkPreview extends Component {
  render() {
    const {entry, getAsset, widgetFor, widgetsFor} = this.props;

    let image = getAsset(entry.getIn(["data", "thumbnail"]));

    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (image && !image.fileObj) {
      image = window.parent.location.protocol + "//" + window.parent.location.host + image;
    }

    var results = entry.getIn(["data", "results"]); // object
    var key_results = widgetsFor('results').getIn(['data', 'key_results']); // list
    var brief = entry.getIn(["data", "brief"]);

		return (
			<article>
				<header className="container center">
					<div>
						<h1 className="article__title">{ entry.getIn(["data", "title"])}</h1>
            <div className="case">
      				<div className="casemeta">
      					<div className="casemeta__pre">Client</div>
      					<div className="casemeta__title">{ entry.getIn(["data", "client"])}</div>
      				</div>
      				<div className="case__results flex">
                { results }
                { key_results }
      				</div>
							<div className="casemeta grid--align-right">
								<div className="casemeta__pre">Location</div>
								<div className="casemeta__title">EXAMPLE</div>
							</div>
      			</div>
					</div>
          <div className="article__hero"><img src={ image } alt={ entry.getIn(["data", "title"])} /></div>
				</header>

        <section className="brief bg--2">
      		<div className="content">
      			<h2 className="content__subtitle"><span>The brief</span></h2>
      			{ widgetsFor("brief").getIn(['data', 'body']) }
      		</div>
      	</section>

        <section className="area services bg--3">
      		<div className="container">
      			<h2 className="content__subtitle reverse"><span>Services we provided</span></h2>
      			<div className="flex flex--justify-center">
      				<ul className="banner__services">
                { widgetsFor('service_list').map(function(el, index) {
                  return (
                    <li className="service" key={index}>
    									<a className="service__link">
    										<img src="" alt="Image not found" />
    										{ el.getIn(['data', 'service']) }
    									</a>
    								</li>
                  );
                })}
      				</ul>
      			</div>
      		</div>
      	</section>

        <section className="brief bg--2">
      		<div className="content">
      			<h2 className="content__subtitle"><span>Our solution</span></h2>
      			{ widgetsFor("solution").getIn(['data', 'body']) }
      		</div>
      	</section>

        <section className="results">
      		<div className="content">
      			<h2 className="content__subtitle"><span>The results</span></h2>
      			<div className="case__results flex"></div>
      			{ widgetsFor("results").getIn(['data', 'body']) }
      		</div>
      	</section>
			</article>
    );
  }
}
