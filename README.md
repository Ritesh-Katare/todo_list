# todo_list
Todo SPA
simply management of todolist
- add a new list
  - edit a list, list name can be edited
  - delete a list
- each list will many items
  - each item can be edited, the name of the item can be edited
  - item can be added or deleted

- Used AngularJS, Bootstrap(gem bootstrap-sass), Angular-xeditable to create editable elements(http://vitalets.github.io/angular-xeditable/)

Download Project to your machine, after unzip follow below instructions 
 1. Application using MySQL, install MySQL community server (https://dev.mysql.com/downloads/mysql/) .
 2. goto root of application dir using terminal/command prompt and run 'bundle install'
 3. make sure database.yml updated as your local MySQL config, run 'rake db:migrate'
 4. run 'rails server' .
