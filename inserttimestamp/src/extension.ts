'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "inserttimestamp" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = [
        vscode.commands.registerCommand('inserttimestamp.insertsample', () => {
            replaceEditorSelection("We'll do it today!");
        }),
        vscode.commands.registerCommand('inserttimestamp.perform', () => {
            replaceEditorSelection(composeTimeStamp());
        })
    ];
    context.subscriptions.push(...disposable);
}

function composeTimeStamp(): string {
    let prefix: string = "######"
    let weekDayName: string = getTodaysWeekDay();
    let monthName: string;
    // return "123";
    return concatWithDelimiter(" ", [prefix, weekDayName]);
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

function getTodaysWeekDay(): string {
    let weekDayList: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let weekDayShortenList: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let weekDayNumber: number = new Date().getDay();
    return (weekDayShortenList[weekDayNumber]);
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

// this method is called when your extension is deactivated
export function deactivate() {
}