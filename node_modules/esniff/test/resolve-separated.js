'use strict';

module.exports = function (t, a) {
	a.deep(t('"raz", "dwa", [\'raz\', \'dwa\'], "trzy"', ','),
		['"raz"', ' "dwa"', ' [\'raz\', \'dwa\']', ' "trzy"']);
	a.deep(t('"raz", "dwa", [\'raz\', \'dwa\'], "trzy"', ',', 3),
		['"raz"', ' "dwa"', ' [\'raz\', \'dwa\']'], "Limit");
	a.deep(t('"trzy"', ','), ['"trzy"'], "One argument");
};
