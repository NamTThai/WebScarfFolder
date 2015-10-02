### How to integrate this application into IIS

1. Go to Server Manager and add IIS as Roles
  a. The following features:
    * `.NET Framework 3.5 Features`
    * `.NET Framework 4.5 Featuers > (ASP.NET, WCF Services > (HTTP Activation + TCP Activation))`
  b The following role services:
    `Security > Basic Authentication, Windows Authentication`
2. Install IISNode, Chocolatey, Git, Node.js if currently doesn't exist
3. Using Chocolatey, install Python2, vcredist2010, URLRewrite if currently doesn't exist
  `choco install python2`
  `choco install vcredist2010`
  `choco install urlrewrite`
4. Clone the project into a folder such as `C:\Program Files\iisnode\app-name`
5. `npm install`, `bower install`
6. Edit `web.config file`
7. Copy `setup.bat` to parent folder and run this file
