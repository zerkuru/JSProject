(()=>{"use strict";const s=s=>s[0].toUpperCase()+s.substr(1,s.length).toLowerCase();capitalizeStr=t=>t?t.includes("-")?t.split("-").map((t=>s(t))).join("-"):t.includes(" ")?t.split(" ").map((t=>s(t))).join(" "):s(t):null})();