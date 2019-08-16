system.callSystem("cmd.exe /c powershell.exe -c \"[System.Reflection.Assembly]::LoadWithPartialName('System.Drawing');set-content fontlist.json (convertTo-json(New-Object System.Drawing.Text.InstalledFontCollection))\"");
var fontlistFile = new File ("~/appdata/adobe/after effects/16.1/Scripts/fontlist.json");
fontlistFile.open("r");
var theFonts = fontlistFile.read();
alert(theFonts);
fontlistFile.close();
