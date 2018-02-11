'use strict';

const 
    mongoose = require('mongoose'),
    coord = require('./DataModel'),
    Coordinate = mongoose.model('Coordinate'),
    parse = require('csv-parse'),
    fs = require('fs'),
    moment = require('moment');

const DATA_FOLDER = './data/';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/map-db');

fs.readdirSync(DATA_FOLDER).forEach(file => {
    // console.log(DATA_FOLDER + file);
    // fs.createReadStream(DATA_FOLDER + file).pipe(parser);
    var contents = fs.readFileSync(DATA_FOLDER + file, 'utf8');
    parser(contents, DATA_FOLDER + file);
});

function parser (content, file) {
    console.log(file);
    const data = parse(content, {delimiter: ','});
    const header = data[0];
    for (let i = 1; i < data.length; i++) {
        const coordinate = new Coordinate({
            time: moment(getRowByName(header, data[i], 'time')),
            lat: getRowByName(header, data[i], 'lat'),
            lon: getRowByName(header, data[i], 'lon'),
            accuracy: getRowByName(header, data[i], 'accuracy'),
            satellites: getRowByName(header, data[i], 'satellites'),
            provider: getRowByName(header, data[i], 'provider'),
            activity: getRowByName(header, data[i], 'activity'),
            battery: getRowByName(header, data[i], 'battery')
        });
        coordinate.save(function(err, coord){
            console.log('saved');
            if (err) {
                throw new Error(err);
            }
        });
    }
}

function getRowByName(header, row, name) {
    const index = header.indexOf(name);
    if (index !== -1) {
        return row[index];
    }
}