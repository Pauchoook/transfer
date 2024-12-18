import * as functions from "./files/functions.js";

import "../scss/style.scss";
import spoller from "./files/spoller.js";
import dropdown from "./files/dropdown.js";
import burger from "./files/burger.js";
import select from "./files/select.js";
import selectInput from "./files/selectInput.js";
import { initReserve, reserveLink, sides } from "./files/reserve.js";
import more from "./files/more.js";
import initSelectInput from "./files/initSelectInput.js";
import sliders from "./files/sliders.js";
import tableTime from "./files/tableTime.js";

functions.mediaAdaptive();
spoller();
dropdown();
burger();
select();
selectInput();
reserveLink();
more();
initSelectInput();
sides();
initReserve();
sliders();
tableTime();