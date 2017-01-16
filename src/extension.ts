'use strict';
import * as vscode from 'vscode';
let moment = require('moment');

function composeTimeStamp(date: Date): string {
    let prefix: string = "######"
    let weekDayName: string = getTodayWeekDayName(date);
    let monthName: string = geTodayMonthName(date);
    let monthDay: string = date.getDate().toString();
    let time: string = date.toLocaleTimeString('en-US', { hour12: false });
    let timeZoneAbbr: string = getTimeZoneAbbreviation();
    let year: string = date.getFullYear().toString();
    let configuration = vscode.workspace.getConfiguration('inserttimestamp');
    if (configuration.has('format') && configuration.get('format') !== false) {
        let format = configuration.get('format');
        return moment(date).format(format);
    } else {
        return concatWithDelimiter(" ", [prefix, weekDayName, monthName, monthDay, time, timeZoneAbbr, year]);
    }
}

function geTodayMonthName(date: Date): string {
    // let fullNameList: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let shortNameList: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let targetIndex: number = date.getMonth();
    return (shortNameList[targetIndex]);
}

function getTodayWeekDayName(date: Date): string {
    // let fullNameList: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let shortNameList: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let targetIndex: number = date.getDay();
    return (shortNameList[targetIndex]);
}

function getTimeZoneAbbreviation(): string {
    let timezone = require('moment-timezone');
    let userTimeZone: string = timezone.tz.guess();
    return timezone.tz(userTimeZone).zoneAbbr();
}

function concatWithDelimiter(delimiter: string, stringList: string[]): string {
    let result: string[] = [];
    for (var i = 0; i < stringList.length - 1; i++) {
        result.push(stringList[i]);
        result.push(delimiter);
    }
    result.push(stringList[stringList.length - 1]);
    return result.join("");
}

function replaceEditorSelection(text: string) {
    const editor = vscode.window.activeTextEditor;
    const selections = editor.selections;

    editor.edit((editBuilder) => {
        selections.forEach((selection) => {
            editBuilder.replace(selection, '');
            editBuilder.insert(selection.active, text);
        });
    });
}

function insertAlternativeFormat() {
    const configuration = vscode.workspace.getConfiguration('inserttimestamp');
    const format = configuration.has('alternative')
        ? configuration.get('alternative')
        : null; // A null format tells moment.js to output ISO 8601 format
    replaceEditorSelection(moment().format(format));
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = [
        vscode.commands.registerCommand('inserttimestamp.perform', () => {
            let timeStamp: string = composeTimeStamp(new Date());
            replaceEditorSelection(timeStamp);
        }),
        vscode.commands.registerCommand('inserttimestamp.alternative', insertAlternativeFormat)
    ];
    context.subscriptions.push(...disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}