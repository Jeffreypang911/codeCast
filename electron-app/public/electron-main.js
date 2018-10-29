const { app, BrowserWindow, shell, ipcMain, Menu } = require('electron');
const {	default: installExtension,	REACT_DEVELOPER_TOOLS,	REDUX_DEVTOOLS } = require('electron-devtools-installer');
const {	StringDecoder } = require('string_decoder');
//require mapper function. Function call format: readDir(rootDirectory, done());
const {	readDir,	done } = require('../../server/fs-mapper');

const url = require('url')
const isDev = require('electron-is-dev');
const path = require('path');
const fs = require('fs');

const buildDir = path.join('file://', __dirname, '..', 'build');

// axios to send content to the server
const axios = require('../src/redux/ducks/api');

const decoder = new StringDecoder('utf8');
	//temp root targets project directory
	//**TODO: get rootDir from shell command**
const rootDir = path.join(__dirname, '..', '..');

let directory = null;
let content = null;
let filepaths = null;

/*TODO: pass variables from shell script that echos PWD*/


async function isDevMode() {
	return await new Promise((resolve, reject) => {
		installExtension(REACT_DEVELOPER_TOOLS)
		.then(name => {
			console.log(`Added Extension: ${name}`);
		}).catch(err => {
			console.log('An error occurred: ', err);
		});

		installExtension(REDUX_DEVTOOLS)
		.then(name => {
			console.log(`Added Extension: ${name}`);
		}).catch(err => {
			console.log('An error occurred: ', err);
		});
		isDev ? resolve(true) : reject(false);
	});
}

async function getAllFiles() {
	fs.existsSync('./fileData/directory.json') ? 
	null : await readDir(rootDir, done(path.join(__dirname, 'fileData')));
	postAllFiles();
}

async function postAllFiles() {
	if (fs.existsSync('./directory.json') && fs.existsSync('./content.json')) {
		directory = await decoder.write(fs.readFileSync('./directory.json'));
		content = await decoder.write(fs.readFileSync('./content.json'));
		filepaths = await decoder.write(fs.readFileSync('./content.json'));
		console.log(typeof content)
	}

	if (directory !== null && content !== null) {
		axios({
			method: 'post',
			url: '/api/electron',
			data: {
				directory: JSON.stringify(directory),
				content: JSON.stringify(content),
				filepaths: JSON.stringify(filepaths)
			}
		}).then((res) => {
			console.log(res.data);
		}).catch((err) => {
			console.error('Error:', err.data);
			throw err;
		});
	}
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const startUrl = process.env.ELECTRON_START_URL || url.format({
	pathname: isDev ? 'http://localhost:4000/' : path.join(__dirname, '/build', '/index.html'),
	protocol: 'file:',
	slashes: true
});

async function createMainWindow() {
	mainWindow = new BrowserWindow({
		backgroundColor: '#F7F7F7',
		minWidth: 880,
		height: 860,
		width: 1280,
		show: false
	});

	mainWindow.loadURL(`file://${__dirname}/indexTerminal.html`) //process.env.ELECTRON_START_URL || startUrl);
	// mainWindow.loadURL(url.format({
	// 	pathname: path.join(__dirname, 'public/build/index.html'),
	// 	protocol: 'file:',
	// 	slashes: true
	// }));
	mainWindow.webContents.openDevTools();

	isDevMode().then((res) => {
		res ? null // dev tools
		: null;
	}).catch((err) => {
		throw err;
	}).finally(() => {
		mainWindow.once('ready-to-show', () => {
			mainWindow.show();
		});
	})
}

let terminalWindow
function createTerminalWindow() {
	terminalWindow = new BrowserWindow({
		backgroundColor: '#F7F7F7',
		minWidth: 40,
		height: 800,
		width: 800
	});

	terminalWindow.loadURL(`file://${__dirname}/indexTerminal.html`)
	// 	url.format({
	// 	pathname: isDev ? 'http://localhost:4000/' : path.join(__dirname, '/build', 'indexTerminal.html'),
	// 	protocol: 'file:',
	// 	slashes: true
	// }));
	// Open the DevTools.
	terminalWindow.webContents.openDevTools();
	// Emitted when the window is closed.
	console.log('dir', fs.readdirSync(__dirname))
	terminalWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		terminalWindow = null;
	});
}

generateMenu = () => {
	const template = [{
			label: 'File',
			submenu: [{
				role: 'about'
			}, {
				role: 'quit'
			}],
		},
		{
			label: 'Edit',
			submenu: [{
					role: 'undo'
				},
				{
					role: 'redo'
				},
				{
					type: 'separator'
				},
				{
					role: 'cut'
				},
				{
					role: 'copy'
				},
				{
					role: 'paste'
				},
				{
					role: 'pasteandmatchstyle'
				},
				{
					role: 'delete'
				},
				{
					role: 'selectall'
				},
			],
		},
		{
			label: 'View',
			submenu: [{
					role: 'reload'
				},
				{
					role: 'forcereload'
				},
				{
					role: 'toggledevtools'
				},
				{
					type: 'separator'
				},
				{
					role: 'resetzoom'
				},
				{
					role: 'zoomin'
				},
				{
					role: 'zoomout'
				},
				{
					type: 'separator'
				},
				{
					role: 'togglefullscreen'
				},
			],
		},
		{
			role: 'window',
			submenu: [{
				role: 'minimize'
			}, {
				role: 'close'
			}],
		},
		{
			role: 'help',
			submenu: [{
					click() {
						require('electron').shell.openExternal(
							'https://github.com/Benji-Leboe/codeCast',
						);
					},
					label: 'Learn More',
				},
				{
					click() {
						require('electron').shell.openExternal(
							'https://github.com/Benji-Leboe/codeCast/issues',
						);
					},
					label: 'File Issue on GitHub',
				},
			],
		},
	];
	Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.on('ready', () => {
	getAllFiles();
	createMainWindow();
	generateMenu();
});

app.on('window-all-closed', () => {
	app.quit();
});

app.on('activate', () => {
	if (mainWindow === null) {
		createMainWindow();
	}
});

ipcMain.on('terminalOpen', (event, arg) => {
	console.log('terminalOpen in createWindow')
	createTerminalWindow()
});