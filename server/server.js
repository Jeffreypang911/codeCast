// const ENV              = require ('dotenv');
const app              = require('express')();
const http             = require('http').Server(app);
const { postgraphile } = require('postgraphile');
const path             = require('path');
const morgan           = require('morgan');
const bodyParser       = require('body-parser');

const activeData       = require('./testData/activeData.json');
const scheduleData     = require('./testData/scheduleData.json');
const archiveData      = require('./testData/archiveData.json');

const server           = http.listen(PORT, () => console.log('App listening on ' + PORT));
const io               = require('socket.io')(server);

const rootPath         = path.join(__dirname, '..');
const buildPath        = path.join(rootPath, 'client', 'build');
const devPath          = path.join(rootPath, 'client', 'public', 'index.html');

let fileCache          = null;
let dirCache           = null;
let pathCache          = null;

// app.use(postgraphile(process.env.DATABASE_URL || 'postgres:///codecast', {
//   'dynamicJson': true,
//   'watchPg': true,
//   'showErrorStack': 'json',
//   'exportJsonSchemaPath:': './db/',
//   'exportGqlSchemaPath:': './db/',
//   'bodySizeLimit': '50mb'
// }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(morgan('dev', {
  skip: (req, res) => {
    return res.statusCode < 400;
  }, stream: process.stderr
}));
app.use(morgan('dev', {
  skip: (req, res) => {
    return res.statusCode >= 400;
  }, stream: process.stdout
}));

app.get('/api/filecontent', (req, res) => {
  let fileID = req.body;
  fileCache ? 
    res.status(200).json(JSON.stringify(fileCache[fileID])) : 
    res.status(204).send('File not found');
});

app.get('/api/scheduledStreams/', (req, res) => {
  const testStreams = {
    "asdass": {
      title: 'Node JS',
      user: 'Spencer',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      scheduledDate: 'Thusday, August 12 2017',
      youtubeURL: null,
      userID: 1,
      streamID: 'asdass',
      languageImage: 'javascript',
      isActive: false
    },
    "asdasx": {
      title: 'HTML CSS',
      user: 'Angela',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      scheduledDate: 'Thusday, August 12 2017',
      youtubeURL: null,
      userID: 1,
      streamID: 'asdasx',
      languageImage: 'csshtml',
      isActive: false
    },
    "asdfad": {
      title: 'Ruby',
      user: 'Spencer',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      scheduledDate: 'Thusday, August 12 2017',
      youtubeURL: null,
      userID: 1,
      streamID: 'asdfad',
      languageImage: 'ruby',
      isActive: false
    },
    "asdwws": {
      title: 'Node JS',
      user: 'Spencer',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      scheduledDate: 'Thusday, August 12 2017',
      youtubeURL: null,
      userID: 1,
      streamID: 'asdwws',
      languageImage: 'javascript',
      isActive: false
    },
    "asdafs": {
      title: 'Node JS',
      user: 'Spencer',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      scheduledDate: 'Thusday, August 12 2017',
      youtubeURL: null,
      userID: 1,
      streamID: 'asdafs',
      languageImage: 'javascript',
      isActive: false
    },
    "asyyss": {
      title: 'Csharp',
      user: 'Nima',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      scheduledDate: 'Thusday, August 12 2017',
      youtubeURL: null,
      userID: 1,
      streamID: 'asyyss',
      languageImage: 'csharp',
      isActive: false
    }
  };

  // const query = req.query.user_id || '*';
  
  console.log('Get success');
  res.status(200).json(testStreams);
});



app.get('/api/activeStreams/', (req, res) => {
  const testActiveStreams = {
    "asdass": {
      title: 'Node JS',
      user: 'Spencer',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      scheduledDate: 'Thusday, August 12 2017',
      youtubeURL: null,
      userID: 1,
      streamID: 'asdass',
      languageImage: 'javascript',
      isActive: true
    },
    "asdfad": {
      title: 'Ruby',
      user: 'Benji',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      scheduledDate: 'Thusday, August 12 2017',
      youtubeURL: null,
      userID: 1,
      streamID: 'asdfad',
      languageImage: 'ruby',
      isActive: true
    },
    "asdasv": {
      title: 'Javascript',
      user: 'Space G',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      scheduledDate: 'Thusday, August 12 2017',
      youtubeURL: null,
      userID: 1,
      streamID: 'asdasv',
      languageImage: 'javascript',
      isActive: true
    },
    "asdasg": {
      title: 'Python',
      user: 'Silvia',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      scheduledDate: 'Thusday, August 12 2017',
      youtubeURL: null,
      userID: 1,
      streamID: 'asdasg',
      languageImage: 'python',
      isActive: false
    },
    "asdash": {
      title: 'HTML CSS',
      user: 'Ardellia',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      scheduledDate: 'Thusday, August 12 2017',
      youtubeURL: null,
      userID: 1,
      streamID: 'asdash',
      languageImage: 'csshtml',
      isActive: false
    },
    "asdasi": {
      title: 'C sharp',
      user: 'Jeff',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      scheduledDate: 'Thusday, August 12 2017',
      youtubeURL: null,
      userID: 1,
      streamID: 'asdasi',
      languageImage: 'csharp',
      isActive: false
    },
  };

  console.log('Get success');
  res.status(200).json(testActiveStreams);
});

app.get('/api/archivedStreams/', (req, res) => {
  const testArchivedStreams = {
    "asdass": {
      title: 'Node',
      user: 'Jeff',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      scheduledDate: 'Thusday, August 12 2017',
      youtubeURL: null,
      userID: 1,
      streamID: 'asdass',
      languageImage: 'javascript',
      isActive: false,
      isArchived: true
    },
    "asdfad": {
      title: 'Ruby',
      user: 'Eric',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      scheduledDate: 'Thusday, August 12 2017',
      youtubeURL: null,
      userID: 1,
      streamID: 'asdfad',
      languageImage: 'ruby',
      isActive: false,
      isArchived: true
    },
    "asdasv": {
      title: 'Python',
      user: 'Joel',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      scheduledDate: 'Thusday, August 12 2017',
      youtubeURL: null,
      userID: 1,
      streamID: 'asdasv',
      languageImage: 'javascript',
      isActive: false,
      isArchived: true
    },
    "yuiuio": {
      title: 'Csharp',
      user: 'Angela',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      scheduledDate: 'Thusday, August 12 2017',
      youtubeURL: null,
      userID: 1,
      streamID: 'yuiuio',
      languageImage: 'csharp',
      isActive: false,
      isArchived: true
    },
    "asfeif": {
      title: 'Ruby',
      user: 'Space G',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      scheduledDate: 'Thusday, August 12 2017',
      youtubeURL: null,
      userID: 1,
      streamID: 'asfeif',
      languageImage: 'ruby',
      isActive: false,
      isArchived: true
    },
    "asteun": {
      title: 'Node',
      user: 'Spencer',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      scheduledDate: 'Thusday, August 12 2017',
      youtubeURL: null,
      userID: 1,
      streamID: 'asteun',
      languageImage: 'javascript',
      isActive: false,
      isArchived: true
    }
  };

  console.log('Get success');
  res.status(200).json(testArchivedStreams);
});


//recieve file dir/content from electron
app.post('/api/electron', (req, res) => {

  try {
    fileCache = req.body.content;
    dirCache = req.body.directory;
    pathCache = req.body.filepaths;
    res.status(200).send('Post request success');
  }
  catch (e) {
    res.status(500).send('Post request failed');
    console.log('Post to server failed:', e);
    throw e;
  }

});

app.get('/*', (req, res) => {
  res.sendFile(devPath);
});

io.on('connection', (socket) => {

  const clients = [];
  console.log(`Socket ${socket.id} connected`);
  clients.push(socket.id);
  console.log(clients);
  io.of('/redux').emit({ type: 'DIRECTORY_UPDATE', payload: dirCache })

  socket.on('action', (action) => {

    const actions = {
      'server/new_connection': (type, payload) => {
        console.log('Server message:', payload);
      }
    }

    function defaultAction(type, payload) {
      console.log("Default action triggered");
      socket.broadcast.emit(type, payload);
    }

    console.log('Action received:', action);
    const { type, payload } = action;
    actions[type] ? actions[type](type, payload) : defaultAction(type, payload);

  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`)
    let clientIndex = clients.findIndex(e => e === socket.id);
    clients.splice(clientIndex, 1);
    console.log(clients);
  });

  socket.on('error', (err) => {
    console.log(err, `from ${socket.id}`);
  });
});

const redux = io
  .of('/redux')
  .on('connection', (socket) => {

    const clients = [];
    console.log(`Redux ${socket.id} connected`);
    clients.push(socket.id);
    console.log(clients);
   
    socket.on('action', (action) => {      

      const actions = {
        'server/message': (type, payload) => {
          console.log('server/message action triggered', payload);
          redux.emit('action', { type: 'NEW_MESSAGE', payload });
        },
        'server/directory_update': (type, payload) => {
          console.log('server/dir_update triggered', payload);
          redux.emit('action', { type: 'DIRECTORY_UPDATE', payload });
        },
        'server/file_change': (type, payload) => {
          let file = fileCache[payload.fileID]
          socket.emit('action', { type: 'FILE_UPDATE', payload: file });
        }
        
      };
      function defaultReduxAction(type, payload) {
        console.log("Default redux action triggered");
        return null
      }
      const { type, payload } = action;
      actions[type] ? actions[type](type, payload) : defaultReduxAction(type, payload);

      socket.on('disconnect', () => {
        console.log(`Redux ${socket.id} disconnected`)
        let clientIndex = clients.findIndex(e => e === socket.id);
        clients.splice(clientIndex, 1);
        console.log(clients);
      });

      socket.on('error', (err) => {
        console.log(err, `from redux: ${socket.id}`);
      });
    });
  });

const terminalRecord = {};
const terminal = io
.of('/terminal')
.on('connection', (socket) => {
  const termClients = [];
  console.log(`Terminal Socket ${socket.id} connected`);
  termClients.push(socket.id);
  console.log(termClients);

  socket.on('data', (data) => {
    let now = Date.now();
    terminalRecord[now] = data;
    terminal.emit('terminal', terminalRecord[now]); // refactor to action when we store data
  });
  


  socket.on('disconnect', () => {
    console.log(`Terminal socket ${socket.id} disconnected`)
    let clientIndex = termClients.findIndex(e => e === socket.id);
    termClients.splice(clientIndex, 1);
    console.log(termClients);
  });
});
  


app.route('/api/scheduledStreams/')
  .get((req, res) => {
    // TODO remove test data
    res.status(200).json(scheduleData);
  })
  .post((req, res) => {
    const streamData = req.body;
    try {
      // insert into database, ensure id doesn't collide
      const streamID = uuid().slice(0,8);
      testData[streamID] = {
        streamID,
        "status": "scheduled",
        "youtubeURL": null,
        ...streamData
      };
      res.status(201).send('POST scheduledStream: Scheduled stream added to databse.');
    } 
    catch (e) {
      res.status(304).send('POST scheduledStream: Failed to insert scheduled stream to database.')
    };
  })
  .put((req, res) => {
    // Upsert query to database might replace this
    // !!missing sad path!!
    const streamData = req.body;
    testData[streamData.streamID] = {
      ...streamData
    };
    res.status(200).send('PUT /api/scheduledStreams: Stream started');
  });

app.route('/api/activeStreams/')
  .get((req, res) => {
    res.status(200).json(activeData);
  })
  .post((req, res) => {
    const streamData = req.body;
    try {
      // insert into database, ensure id doesn't collide
      const streamID = uuid().slice(0,8);
      testData[streamID] = {
        streamID,
        status: 'active',
        ...streamData
      };
      res.status(201).send('POST activeStream: Active stream added to database.');
    }
    catch (e) {
      res.status(304).send('POST activeStream: Failed to insert active stream to database.');
    };
  });

app.route('/api/archivedStreams/')
  .get((req, res) => {
    res.status(200).json(archiveData);
  })
  .post((req, res) => {
    res.send('To be implemented.')
  });

app.get('/api/filecontent/:file_uuid', (req, res) => {
  const uuid = req.params.file_uuid;
  console.log(
    'fileCache not null:', fileCache !== null, 
    'dirCache not null:', dirCache !== null,
    'fileCache[param] typeof:', fileCache && typeof fileCache[uuid]
  );  
  try {
    fileCache[uuid] ? res.status(200).json(fileCache[uuid]) : res.send('File not found') 
  }
  catch (e) {
    res.status(404).send('No files cached');
    throw e;
  }
});

app.get('/api/scheduledStreams/', (req, res) => {
  console.log('Get /scheduledStreams success');
  res.status(200).json(testData);
});

app.get('/api/activeStreams/', (req, res) => {
  const testActiveStreams = {};
  for (let streamID in testData) {
    if (testData[streamID].isActive === true) {
      testActiveStreams[streamID] = testData[streamID];
    }
  }
  console.log('Get success');
  res.status(200).json(testActiveStreams);
});

app.get('/api/archivedStreams/', (req, res) => {

  console.log('Get /archivedStreams success');
  res.status(200).json(testData);
});

app.get('/*', (req, res) => {
  res.status(200).json({ express: 'successful connection to express, /*', fileKeys: Object.keys(fileCache), dirCache });
});



//recieve file dir/content from electron
app.post('/api/electron/file_update', (req, res) => {
  let { file } = req.body;

  try {
    // redux.emit('action', { type: 'DIRECTORY_UPDATE', payload: dirCache });
    res.status(200).send('Post request success /api/electron/file_update');
  }
  catch (e) {
    console.log('Post to server failed /api/electron/file_update');
    res.status(500).send('Post request failed');
    throw e;
  }
  
});

app.post('/api/electron', (req, res) => {

  try {
    fileCache = req.body.content || fileCache;
    dirCache = req.body.directory || dirCache;
    pathCache = req.body.filepaths || pathCache;
    redux.emit('action', { type: 'DIRECTORY_UPDATE', payload: dirCache });
    res.status(200).json({ message: 'Post request success /api/electron', data: testData });
  }
  catch (e) {
    console.log('Post to server failed:', e);
    res.status(500).send('Post request failed /api/electron');
    throw e;
  }
  
});
