# CloudWS Node.js lib

#### Installation
```
npm install cloudws-node-api
```
or
```
yarn add cloudws-node-api
```

#### Getting started
```javascript
import CloudWS from '@cloudws/node-api';

const cloudWS = new CloudWS(process.env.CLOUDWS_TOKEN);
```

#### Create channel
```javascript
cloudWS.createChannel('my_channel')
```

#### Get list of channels
```javascript
cloudWS.getAllChannels();
```

#### Send message
```javascript
cloudWS.sendMessage('my_channel', {data: 'Message to channel'});
```

#### Delete message
```javascript
cloudWS.deleteChannel('my_channel');
```

#### Example
```javascript
import CloudWS from '@cloudws/node-api';

const cloudWS = new CloudWSAPI(process.env.CLOUDWS_TOKEN);
const start = async () => {
     await cloudWS.createChannel('my_channel');
     await cloudWS.sendMessage('my_channel', {data: 'Message to channel'});
     await cloudWS.deleteChannel('my_channel');
};
start();
```

