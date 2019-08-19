$folder = "$env:Windir\fonts\"; 
$objShell = New-Object -ComObject Shell.Application; 
$attrList = @();
$details = @{ name = 0; style = 1;}; 
$objFolder = $objShell.namespace($folder);
foreach($file in $objFolder.items()){ $name = $objFolder.getDetailsOf($file, $details.name); 
    $style = ($objFolder.getDetailsOf($file, $details.style)).split(";").trim(); 
    $attrList += ( @{name = $name; style = $style; }); 
};
set-content "$env:temp\fontlist.json" (ConvertTo-Json($attrList))
