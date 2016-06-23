'use strict';

module.exports = function (t, a) {
	a(t(''), false, "Empty code");
	a(t('""'), true, "Empty \" string");
	a(t('\'\''), true, "Empty ' string");
	a(t('"sdfsdf'), false, "Not finished \" string");
	a(t('\'sdfsdf'), false, "Not finished ' string");
	a(t('\'sdf\\\'fefeefe\\\\efefe\\n\\\\\\\'\\\'efef"" "sdfdfsdf\''), true, "' string");
	a(t('"sdf\\"fefeefe\\\\efefe\\n\\\\\\"\\"efef\'\' \'sdfdfsdf"'), true, "\" string");
	a(t('  "sdf\\"fefeefe\\\\efefe\\n\\\\\\"\\"efef\'\' \'sdfdfsdf"'), false, "Starts with ws");
	a(t('"sdf\\"fefeefe\\\\efefe\\n\\\\\\"\\"efef\'\' \'sdfdfsdf"  '), false, "Ends with ws");
	a(t('34'), false, "Number");
};
