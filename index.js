const path = require('path');
const fs = require('fs');

const _typeException = "Type of random entry is incorrect!\n Entered: '{0}'.\n Available types:\n > FirstName: ['name', 'firsname', 0]\n > LastName: ['surname', 'lastname', 1]";

const random = function (min, max) {
    if (max < min) {
        max += min;
        min = max - min;
        max -= min;
    }
    const offset = max - min;
    return Math.floor(Math.random() * Math.floor(offset)) + min;
}

const loadJSON = function (_path) {
    const __path = path.join(__dirname, _path);
    if (fs.existsSync(__path) && fs.statSync(__path).isFile()) {
        return JSON.parse(fs.readFileSync(__path).toString());
    }
}

const randomEntry = function (type) {
    let filename;
    if (typeof type === 'string')
        type = type.toLowerCase();
    switch (type) {
        case 'name':
        case 'firstname':
        case 0: {
            filename = '/jsondata/firstname.json';
            break;
        }

        case 'surname':
        case 'lastname':
        case 1: {
            filename = '/jsondata/lastname.json';
            break;
        }

        default: break;
    }
    if (filename) {
        const json = loadJSON(filename);
        const length = json.length;
        return json[random(0, length)];
    }
    throw _typeException.replace('{0}', type);
}

const randomDOB = function () {
    const year = random(1970, 2010);
    const month = twoDigitNumber(random(1, 11));
    const day = twoDigitNumber(random(1, 25));

    return `${year}-${month}-${day}T00:00:00.0000000+00:00`;
}

const twoDigitNumber = function (num) {
    return num >= 10 ? num + '' : '0' + num;
}

const randomPerson = function () {
    const firstName = randomEntry(0);
    const lastName = randomEntry(1);

    let _object = {
        FirstName: firstName,
        LastName: lastName,
        Email: `${firstName}.${lastName}@example.com`,
        Fullname: `${firstName} ${lastName}`,
        DOB: randomDOB()
    }
    return _object;
}

module.exports = {
    random, randomEntry, randomPerson
}