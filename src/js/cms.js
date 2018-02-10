import React from "react";
import CMS from "netlify-cms";

import DataSelectControl from "./DataSelect";

CMS.registerWidget('dataSelect', DataSelectControl);
