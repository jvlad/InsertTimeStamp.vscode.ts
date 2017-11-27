'use strict';
import * as vscode from 'vscode';
const timezone = require('moment-timezone');

function composeTimeStamp(date: Date): string {
    const prefix: string = "######"
    const weekDayName: string = getTodayWeekDayName(date);
    const monthName: string = getTodayMonthName(date);
    const monthDay: string = date.getDate().toString();
    const time: string = date.toLocaleTimeString('en-US', { hour12: false });
    const timeZoneAbbr: string = getTimeZoneAbbreviation();
    const year: string = date.getFullYear().toString();
    return concatWithDelimiter(" ", [prefix, weekDayName, monthName, monthDay, time, timeZoneAbbr, year]);
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

export function activate(context: vscode.ExtensionContext) {
    let disposable = [
        vscode.commands.registerCommand('inserttimestamp.perform', () => {
            const timeStamp: string = composeTimeStamp(new Date());
            replaceEditorSelection(timeStamp);
        })
    ];
    context.subscriptions.push(...disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}