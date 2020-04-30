const mongoose = require('mongoose');
const connectSchema = require('./connect.schema.server');
module.exports = mongoose.model('ConnectModel', connectSchema);