Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
WshShell.CurrentDirectory = fso.GetParentFolderName(WScript.ScriptFullName)
WshShell.Run "cmd /c set PORT=3600&& node server.mjs", 0, False
WScript.Sleep 2000
WshShell.Run "http://localhost:3600"
