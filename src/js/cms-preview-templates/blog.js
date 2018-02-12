import React, { Component } from "react";
import format from "date-fns/format";

export default class BlogPreview extends Component {
  render() {
    const {entry, getAsset, widgetFor, widgetsFor} = this.props;

    let image = getAsset(entry.getIn(["data", "image"]));

    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (image && !image.fileObj) {
      image = window.parent.location.protocol + "//" + window.parent.location.host + image;
    }

		return (
			<article>
				<header className="article-header center">
					<h1 className="article__title">{ entry.getIn(["data", "title"]) }</h1>
					<p>
						<span>Published on { format(entry.getIn(["data", "publishDate"]), "dddd Do MMMM YYYY") }, </span>
						<span>by { entry.getIn(["data", "author"]) }</span>
					</p>
				</header>
				<section className="content">
					{ widgetFor("body") }
				</section>
			</article>
    );
  }
}
