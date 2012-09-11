
Param($folder)
if($folder -eq "stop"){
Unregister-Event FileChanged
Unregister-Event FileCreated
return
}
#$folder = 'D:\Work\guoqude\src\main\webapp\pagejs' # Enter the root path you want to monitor.

$filter = '*.coffee*'  # You can enter a wildcard filter here.

# In the following line, you can change 'IncludeSubdirectories to $true if required.                          
$fsw = New-Object IO.FileSystemWatcher $folder, $filter -Property @{IncludeSubdirectories = $true;NotifyFilter = [IO.NotifyFilters]'FileName, LastWrite'}

Register-ObjectEvent $fsw Created -SourceIdentifier FileCreated -Action {
$path = $Event.SourceEventArgs.FullPath
coffee -c $path
}

Register-ObjectEvent $fsw Changed -SourceIdentifier FileChanged -Action {
$path = $Event.SourceEventArgs.FullPath
coffee -c $path
}