# Quick Start App

- [ ] Clone the quick start app
```
git clone https://github.com/LeonAdeoye/quick-start-app.git
mv quick-start-app/ <app-name>/
cd <app-name>
rm -rf .git/
rm README.md
```

- [ ] Update **APP_NAME** value to new app's name in the **./models/constants.ts** file.

- [ ] Update the **\<title>NewApp\</title>** value to the new app's name in the **index.html** file.

- [ ] Update the app's name in the **win.loadURL** function's argument in the **main.js** file.

- [ ] Update the app's name in value of **name** property in the **package.json** file.

- [ ] Update the app's name in value of **name** property in the **package-lock.json** file.

- [ ] Update the app's directory name in the **CoverageIstanbulReporter dir** property value of the **karma.conf.js** file. 

- [ ] Search and replace all instances of the text **quick-start-app** in **angular.json** file with the app's name.

- [ ] Update the app's name in two the two locations of **app.component.spec.ts** file.

- [ ] Update the app's name in the **./e2e/src/app.e2e-spec.ts** file.

- [ ] run npm install.

- [ ] Run **ng build** to make sure everything compiles.

- [ ] Once you are ready to check-in then create the git repository with name **xxx-app**.
