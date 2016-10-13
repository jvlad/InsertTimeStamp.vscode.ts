# Insert Time Stamp
Quick insertion of unix-shell-like time stamp into Visual Studio Code editor

## Example
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
Default shortcut is `ctrl + f5`  

in your `Code/User/keybindings.json` file add the following:
```
{
    "key": "ctrl+f5", // specify shortcut you like here
    "command": "inserttimestamp.perform",
    "when": "editorTextFocus"
}
```

## Format
Currently supported timestamp format: `###### Www Mmm dd h:mm:ss Tz yyyy`  

where:  
    `######` — prefix (as is: "######")  
    `Www` — week day name (3 letters)  
    `Mmm` — month name (3 letters)  
    `dd` — day in month  
    `h` — hours (24h format)  
    `mm` — minutes  
    `ss` — seconds  
    `Tz` — Time zone abbreviation (3 letters, I am not sure if it is true for any time zone)   
    `yyyy` — year (4 digits)

## License
Extension licensed under [MIT](./LICENSE)

## Author
[Vlad Zamskoi](https://www.freeraven.com/ "Developer website")

## Thanks
To [Nick Roach](https://www.elegantthemes.com/) for the great icon.