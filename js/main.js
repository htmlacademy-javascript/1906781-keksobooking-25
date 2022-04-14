import {deactivatePage} from './page.js';
import {enablePage} from './map.js';
import {setUserFormSubmit, resetByResetClick, onFormSubmit}  from './form.js';


deactivatePage();
enablePage();
resetByResetClick();
setUserFormSubmit(onFormSubmit);


