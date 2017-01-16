# Insert Time Stamp
Quick insertion of unix-shell-like time stamp into Visual Studio Code editor

## Example of default primary format

```
###### Sun Sep 18 15:29:29 IDT 2016
```

Here is how it looks after markdown processing:
###### Sun Sep 18 15:29:29 IDT 2016

## Install (see on [Market Place](https://marketplace.visualstudio.com/items?itemName=zvlad.inserttimestamp))

There are 2 options to install the extention
1. via VSCode UI
    * launch VS Code Quick Open (Ctrl+P)
    * execute the following command
        `ext install inserttimestamp`
    * hit green "Install" button next to **Insert Time Stamp** item in VSCode sidebar.

1. via system command line
    * in your terminal run the following command
        `code --install-extension zvlad.inserttimestamp`

## Uninstall

There are 2 options to uninstall the extention
1. via VSCode UI
    * open `Extensions` tab in the VS Code sidebar
    * hit "Uninstall" next to **Insert Time Stamp** item.

1. via system command line
    * in your terminal run the following command
        `code --uninstall-extension zvlad.inserttimestamp`

## Configure shortcuts

The default shortcut for the primary timestamp is `Ctrl+F5`. The default shortcut for the alternative timestamp is `Ctrl+Shift+F5`.

In your `Code/User/keybindings.json` file add the following:

```json
{
    "key": "ctrl+f5", // specify shortcut you like here
    "command": "inserttimestamp.perform",
    "when": "editorTextFocus"
}, {
    "key": "ctrl+shift+f5", // specify shortcut you like here
    "command": "inserttimestamp.alternative",
    "when": "editorTextFocus"
}
```

## Format

The timestamp format can be configured in `settings.json` as in the following examples:

```json
"inserttimestamp.format": "YYYY-MM-DD",
"inserttimestamp.alternative": "YYYY-MM-DDTHH:mm:ssZ"
```

Where the format strings are interpreted by [moment.js](https://momentjs.com/docs/#/displaying/format/). For example, the format string `"X"` is the unix timestamp in seconds, and a format of `null` will produce an ISO 8601 string.

The `format` setting is used for the primary entry (`Ctrl+F5`), while the `alternative` setting is used for the alternative entry (`Ctrl+Shift+F5`). A typical use case for this might be to have separate date and time entries, or a long and short date.

If the settings are left blank, the `alternative` setting defaults to the ISO 8601 format, while the primary format defaults to something like "`###### ddd MMM DD k:mm:ss zz YYYY`", where:

    `######` — prefix (as is: "######")
    `ddd` — week day name (3 letters)
    `MMM` — month name (3 letters)
    `DD` — day in month
    `k` — hours (24h format)
    `mm` — minutes
    `ss` — seconds
    `zz` — Time zone abbreviation (3 letters, I am not sure if it is true for any time zone)
    `YYYY` — year (4 digits)

## License
Extension licensed under [MIT](./LICENSE)

## Author
[Vlad Zamskoi](https://www.freeraven.com/)

## Thanks

To [Nick Roach](https://www.elegantthemes.com/) for the great icon.

To [Michael Hunter](http://coder-mike.com) for adding support for custom and alternative formats.
