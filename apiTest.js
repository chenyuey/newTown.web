const Parse = require('parse/node')
Parse.initialize('myAppId', 'myMasterKey')
Parse.serverURL = 'http://47.95.200.31:1340/api/1'

Parse.Cloud.run('getYZItem', { item_id: '2odzpqu3zwc95' })
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })
