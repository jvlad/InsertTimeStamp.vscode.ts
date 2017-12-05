'use strict';
import * as vscode from 'vscode';
import * as timezone from 'moment-timezone';
import ISOCountries from './ISOCountries';
let choosenLocale = 'en';
const options = { weekday: 'short', year: 'numeric', hour12: false, month: 'short', day: 'numeric', hour:"numeric", minute:"numeric", second:"numeric" };
function composeTimeStamp(date: Date, locale: string): string {
    const prefix: string = "######"
    const weekDayName: string = getTodayWeekDayName(date);
    const monthName: string = getTodayMonthName(date);
    const monthDay: string = date.getDate().toString();
    const time: string = date.toLocaleTimeString(locale, { hour12: false });
    const timeZoneAbbr: string = getTimeZoneAbbreviation();
    const year: string = date.getFullYear().toString();
    return concatWithDelimiter(" ", [prefix, weekDayName, monthName, monthDay, time, timeZoneAbbr, year]);
}

function getIntlTimeStamp(): string {
    const intlDateTimeFormatter = new Intl.DateTimeFormat(choosenLocale, options);
    const prefix: string = "######"
    return concatWithDelimiter(" ", [prefix, intlDateTimeFormatter.format(Date.now())]);
}

function getTodayMonthName(date: Date): string {
    // let fullNameList: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const shortNameList: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const targetIndex: number = date.getMonth();
    return (shortNameList[targetIndex]);
}

function getTodayWeekDayName(date: Date): string {
    // let fullNameList: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const shortNameList: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const targetIndex: number = date.getDay();
    return (shortNameList[targetIndex]);
}

function getTimeZoneAbbreviation(): string {
    const userTimeZone: string = timezone.tz.guess();
    return timezone.tz(userTimeZone).zoneAbbr();
}

function concatWithDelimiter(delimiter: string, stringList: string[]): string {
    let result: string[] = [];
    for (let i = 0; i < stringList.length - 1; i++) {
        result.push(stringList[i]);
        result.push(delimiter);
    }
    result.push(stringList[stringList.length - 1]);
    return result.join("");
}

function replaceEditorSelection() {
    const timeStamp: string = composeTimeStamp(new Date(), choosenLocale);//getIntlTimeStamp(); prints out Intl-formatted datetime
    const editor = vscode.window.activeTextEditor;
    const selections = editor.selections;
    editor.edit((editBuilder) => {
        selections.forEach((selection) => {
            editBuilder.replace(selection, '');
            editBuilder.insert(selection.active, timeStamp);
        });
    });

}

export function activate(context: vscode.ExtensionContext) {
    let disposable = [
        vscode.commands.registerCommand('inserttimestamp.perform', () => {
            return replaceEditorSelection();
        }),
        vscode.commands.registerCommand('inserttimestamp.select', () => {
            vscode.window.showQuickPick(Object.keys(ISOCountries))
                .then(resp => {
                    choosenLocale = resp;
                });
        })
    ];
    context.subscriptions.push(...disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}