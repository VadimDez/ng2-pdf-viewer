uglifyjs sfx-core.js -cm | sed 's/.$//' > sfx-core.min.js
uglifyjs sfx-core-register.js -cm | sed 's/.$//' > sfx-core-register.min.js
uglifyjs amd-helpers.js -cm > amd-helpers.min.js
uglifyjs global-helpers.js -cm > global-helpers.min.js