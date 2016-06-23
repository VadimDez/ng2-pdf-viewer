'use strict';

module.exports = function (t, a) {
	a.deep(t('ech${}'),
		{ literals: ['ech', '' ], substitutions: [''] });

	a.deep(t('ech${"${foo}"}marko${(function () { if (elo) { return ' +
		'\'${foo}\'; } else { return "${mar}"; } })}boo'),
		{ literals: ['ech', 'marko', 'boo'], substitutions: ['"${foo}"',
			'(function () { if (elo) { return \'${foo}\'; } else { return "${mar}"; } })'] });

	a.deep(t('${x.raz} \\${$\\{ f${prik()}oo ${maroko}\n\\$mis\\1k\\2o' +
		'${markas()}${x.moled}ech${}eloo$${x.su}elo${marko'),
		{ literals: ['', ' ${$\\{ f', 'oo ', '\n$mis\\1k\\2o', '', 'ech', 'eloo$',
			'elo${marko'], substitutions: ['x.raz', 'prik()', 'maroko', 'markas()',
				'x.moled', '', 'x.su'] });

	a.deep(t('ula${melo}far${ulo}'), { literals: ['ula', 'far', ''],
		substitutions: ['melo', 'ulo'] });

	a.deep(t('${melo}far${ulo}ula'), { literals: ['', 'far', 'ula'],
		substitutions: ['melo', 'ulo'] });
};
