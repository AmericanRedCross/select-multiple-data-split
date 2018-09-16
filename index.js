const electron = require('electron');

const {app, BrowserWindow, Menu} = electron;

//var path = require('path');


app.on('ready',()=>{
    const mainWindow = new BrowserWindow({
    	//width:900,
    	//height:800,
    	//frame:false  //to hide the top bar of a window which has the close, minimize buttons
    	webPreferences: {backgroundThrottling:false},
    	icon: __dirname +  '/img/logo.png'
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)

});

const menuTemplate = [
	{
		label: 'File',
		submenu:[
			{
				label:'Quit',
				accelerator: (()=>{
					if(process.platform==='darwin'){
						return 'Command+Q';
					}
					else{
						return 'Ctrl+Q';
					}
				})(),
				click(){
					app.quit();
				}
		    },
		    {
				label:'Reset (New)',
				accelerator: process.platform === 'darwin' ? 'Command+R':'Ctrl+R',
				click(item, focusedWindow){
					focusedWindow.reload();
				}
			}
		]
	}
];

if(process.platform==='darwin'){
	menuTemplate.unshift({});
}

if(process.env.NODE_ENV !== 'production'){
	menuTemplate.push({
		label:'View',
		submenu:[
			{
				label:'Developer Tools',
				accelerator: process.platform === 'darwin' ? 'Command+Alt+I':'Ctrl+Shift+I',
				click(item, focusedWindow){
					focusedWindow.toggleDevTools();
				}
			}
		]
		
	});
}
