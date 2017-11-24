/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @experimental i18n support is experimental.
 */
export declare const LOCALE_DATA: {
    [localeId: string]: any;
};
/**
 * Register global data to be used internally by Angular. See the
 * {@linkDocs guide/i18n#i18n-pipes "I18n guide"} to know how to import additional locale data.
 *
 * @experimental i18n support is experimental.
 */
export declare function registerLocaleData(data: any, extraData?: any): void;
/**
 * Index of each type of locale data from the locale data array
 */
export declare const enum LocaleDataIndex {
    LocaleId = 0,
    DayPeriodsFormat = 1,
    DayPeriodsStandalone = 2,
    DaysFormat = 3,
    DaysStandalone = 4,
    MonthsFormat = 5,
    MonthsStandalone = 6,
    Eras = 7,
    FirstDayOfWeek = 8,
    WeekendRange = 9,
    DateFormat = 10,
    TimeFormat = 11,
    DateTimeFormat = 12,
    NumberSymbols = 13,
    NumberFormats = 14,
    CurrencySymbol = 15,
    CurrencyName = 16,
    PluralCase = 17,
    ExtraData = 18,
}
/**
 * Index of each type of locale data from the extra locale data array
 */
export declare const enum ExtraLocaleDataIndex {
    ExtraDayPeriodFormats = 0,
    ExtraDayPeriodStandalone = 1,
    ExtraDayPeriodsRules = 2,
}
