import React from "react";
import CMS from "netlify-cms";

import DataSelectControl from "./DataSelect";
import WorkPreview from "./cms-preview-templates/work";
import ServicePreview from "./cms-preview-templates/service";
import BlogPreview from "./cms-preview-templates/blog";


CMS.registerPreviewStyle("/css/app.css");
CMS.registerPreviewTemplate("case_study", WorkPreview);
CMS.registerPreviewTemplate("services", ServicePreview);
CMS.registerPreviewTemplate("blog", BlogPreview);

CMS.registerWidget('dataSelect', DataSelectControl);

CMS.registerEditorComponent({
  // Internal id of the component
  id: "youtube",
  // Visible label
  label: "Youtube",
  // Fields the user need to fill out when adding an instance of the component
  fields: [{name: 'id', label: 'Youtube Video ID', widget: 'string'}],
  // Pattern to identify a block as being an instance of this component
  pattern: /^{{<\s?youtube (\S+)\s?>}}$/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      id: match[1]
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return '{{< youtube ' + obj.id + ' >}}';
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    return (
      '<div class="container image-wrapper"><img src="http://img.youtube.com/vi/' + obj.id + '/maxresdefault.jpg" alt="Youtube Video"/></div>'
    );
  }
});

CMS.registerEditorComponent({
  // Internal id of the component
  id: "cta",
  // Visible label
  label: "CTA",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { name: 'text', label: 'Text', widget: 'string' },
    { name: 'URL', label: 'Link', widget: 'string' },
    { name: 'scheme', label: 'Color Scheme', widget: 'select', options: [{label: 'Primary', value: 'button--primary'}, {label: 'Success', value: 'button--success'}, {label: 'Neutral', value: 'button--neutral'}]}
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^{{<\s?cta (\S+) ? (\S+) ? (.+)>}}$/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      scheme: match[1],
      URL: match[2],
      text: match[3]
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return (
      '{{< cta ' + obj.scheme + ' ' + obj.URL + ' ' + obj.text + '>}}'
    );
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    return (
      '<a class="button ' + obj.scheme + '" href="' + obj.URL + '">' + obj.text + '</a>'
    );
  }
});
