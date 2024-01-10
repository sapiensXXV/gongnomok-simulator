import * as wg from "./work-glove/work-glove.js";
import * as ew from "./evil-wings/evil-wings.js";
import * as da from "./dark-avarice/dark-avarice.js";

window.addEventListener('keydown', (e) => {
    let input = e.key;
    if (input === 'r' || input === 'R' || input === 'ㄱ' || input === 'ㄲ') {
        wg.resetItem(true);
        ew.resetItem(true);
        da.resetItem(true);
    }
});