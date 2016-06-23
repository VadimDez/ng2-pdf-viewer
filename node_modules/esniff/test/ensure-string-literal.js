'use strict';

module.exports = function (t, a) {
	var str;
	a.throws(function () { t(); }, TypeError, "Undefined");
	a.throws(function () { t(null); }, TypeError, "Null");
	a.throws(function () { t({}); }, TypeError, "Object");
	a.throws(function () { t(''); }, TypeError, "Empty code");
	a(t('""'), '""', "Empty \" string");
	a(t('\'\''), '\'\'', "Empty ' string");
	a.throws(function () { t('"sdfsdf'); }, TypeError, "Not finished \" string");
	a.throws(function () { t('\'sdfsdf'); }, TypeError, "Not finished ' string");
	str = '\'sdf\\\'fefeefe\\\\efefe\\n\\\\\\\'\\\'efef"" "sdfdfsdf\'';
	a(t(str), str, "' string");
	str = '"sdf\\"fefeefe\\\\efefe\\n\\\\\\"\\"efef\'\' \'sdfdfsdf"';
	a(t(str), str, "Messy \" string");
	a.throws(function () { t('  "sdf\\"fefeefe\\\\efefe\\n\\\\\\"\\"efef\'\' \'sdfdfsdf"'); },
		TypeError, "Starts with ws");
	a.throws(function () { t('"sdf\\"fefeefe\\\\efefe\\n\\\\\\"\\"efef\'\' \'sdfdfsdf"  '); },
		TypeError, "Ends with ws");
	a.throws(function () { t('34'); }, TypeError, "Number");
};
