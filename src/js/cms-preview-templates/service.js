import React, { Component } from "react";

export default class ServicePreview extends Component {
  render() {
    const {entry, getAsset, widgetFor, widgetsFor} = this.props;

    let image = getAsset(entry.getIn(["data", "image"]));

    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (image && !image.fileObj) {
      image = window.parent.location.protocol + "//" + window.parent.location.host + image;
    }

		return (
			<article>
        <header className="article__header center">
      		<h1 className="article__title">{ entry.getIn(["data", "title"]) }</h1>
      		<p className="intro">{ entry.getIn(["data", "intro"]) }</p>
    			<div className="article__hero">
            { image !== null ? <img src={ image } alt={ entry.getIn(["data", "title"]) } /> : <div className="admin__placeholder__image">No image uploaded</div> }
          </div>
      	</header>

      	<section className="bg--2">
      		<div className="content">
      			{ widgetFor("body") }
      		</div>
      	</section>
			</article>
    );
  }
}
