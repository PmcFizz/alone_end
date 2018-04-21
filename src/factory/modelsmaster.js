/**
 * Created by fizz on 16-12-10.
 */
var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    mongooseValidateFilter = require('mongoose-validatefilter'),
    validate = new mongooseValidateFilter.validate(),
    filter = new mongooseValidateFilter.filter();

var waitreplaceSchema = new schema({
    name: String,                                             // name
    createUserId: {type: schema.Types.ObjectId, ref: 'user'}, // create User Id
    createDate: {type: Date, default: Date.now()},            // create time
    status: {type: Number, default: 1},                       // status
    lastModifyDate: {type: Date, default: Date.now()}         // the last  modify date
});

//add name rule
validate.add('name', {
    required: true,
    msg: 'name is must defind'
});

filter.add('name', 'trim');

mongooseValidateFilter.validateFilter(waitreplaceSchema, validate, filter);
mongoose.model('waitreplace', waitreplaceSchema);