var mongoose = require('mongoose')
require('./user')
exports.User = mongoose.model('User')
require('./question')
exports.Question = mongoose.model('Question')
require('./answer')
exports.Answer = mongoose.model('Answer')
require('./company')
exports.Company = mongoose.model('Company')
require('./occupationalHistory')
exports.OccupationalHistory = mongoose.model('OccupationalHistory')
require('./evaluate')
exports.Evaluate = mongoose.model('Evaluate')
require('./pictureStore')
exports.PictureStore = mongoose.model('PictureStore')
require('./design')
exports.Design = mongoose.model('Design')
require('./poetry')
exports.Poetry = mongoose.model('Poetry')