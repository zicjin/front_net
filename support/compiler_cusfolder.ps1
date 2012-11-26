#.\compiler cp_work
Param($Path)
Get-ChildItem -Path $Path -Include *.js -Recurse | % { .\closure-compiler\compiler.exe --js $_.FullName --js_output_file ($_.FullName -replace "\\$Path\\", "\\$Path\\__build\\") --charset=UTF-8 }