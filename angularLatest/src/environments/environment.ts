// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  notificationObjForError:{
    timeOut: 5000,
    closeButton: true,
    enableHtml: true,
    toastClass: "alert alert-danger alert-with-icon",
    positionClass: 'toast-top-right'
  } ,
  notificationObjForSuccess:{
    timeOut: 5000,
    closeButton: true,
    enableHtml: true,
    toastClass: "alert alert-success alert-with-icon",
    positionClass: 'toast-top-right'
  } 
};
