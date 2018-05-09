import User from './../components/process/Users';
import CalculateWorkingDays from '../components/process/CalculateWorkingDays';

const users = [];
users.push(new User('Alan', {day: 5, priority: 1}, [{initialDate: new Date(2018, 6, 1), finalDate: new Date(2018, 7, 1)}]));
users.push(new User('Mychelle', {day: 2, priority: 1}, [{initialDate: new Date(2018, 8, 1), finalDate: new Date(2018, 9, 1)}]));
users.push(new User('Ana', {day: 3, priority: 1}, [{initialDate: new Date(2018, 1, 1), finalDate: new Date(2018, 2, 1)}]));
users.push(new User('Thiago', {day: 5, priority: 0}, [{initialDate: new Date(2018, 4, 1), finalDate: new Date(2018, 5, 1)}]));

describe('CalculateWorkingDays', () => {
    
    it('Distribute days by users', () => {
        const calculateWorkingDays = new CalculateWorkingDays();
        let map = calculateWorkingDays.createMapForUsers(users, 2);
        map = calculateWorkingDays.distributeDaysForUsers(map, 3);

        expect(map['Alan']).toEqual(3);
        expect(map['Mychelle']).toEqual(3);
        expect(map['Ana']).toEqual(3);
        expect(map['Thiago']).toEqual(2);
    });
    
    it('Process simple number of working dates with no remnant', () => {
        const calculateWorkingDays = new CalculateWorkingDays();
        const numberOfWorkingDays = 8;
        const calculated = calculateWorkingDays.simpleNumberOfWorkingDaysForEachUser(numberOfWorkingDays, users);

        let numberOfDaysForEachUser = numberOfWorkingDays / users.length;
        expect(numberOfDaysForEachUser).toEqual(2);
        const rest = numberOfWorkingDays % users.length;
        expect(rest).toEqual(0);
        numberOfDaysForEachUser = Math.floor(numberOfDaysForEachUser);
        expect(numberOfDaysForEachUser).toEqual(2);

        expect(calculated['Alan']).toEqual(2);
        expect(calculated['Mychelle']).toEqual(2);
        expect(calculated['Ana']).toEqual(2);
        expect(calculated['Thiago']).toEqual(2);
    });

    it('Process simple number of working dates with 1 remnant', () => {
        const calculateWorkingDays = new CalculateWorkingDays();
        const numberOfWorkingDays = 9;
        const calculated = calculateWorkingDays.simpleNumberOfWorkingDaysForEachUser(numberOfWorkingDays, users);

        let numberOfDaysForEachUser = numberOfWorkingDays / users.length;
        expect(numberOfDaysForEachUser).toEqual(2.25);
        const rest = numberOfWorkingDays % users.length;
        expect(rest).toEqual(1);
        numberOfDaysForEachUser = Math.floor(numberOfDaysForEachUser);
        expect(numberOfDaysForEachUser).toEqual(2);

        expect(calculated['Alan']).toEqual(3);
        expect(calculated['Mychelle']).toEqual(2);
        expect(calculated['Ana']).toEqual(2);
        expect(calculated['Thiago']).toEqual(2);
    });

    it('Process simple number of working dates with 2 remnant', () => {
        const calculateWorkingDays = new CalculateWorkingDays();
        const numberOfWorkingDays = 10;
        const calculated = calculateWorkingDays.simpleNumberOfWorkingDaysForEachUser(numberOfWorkingDays, users);

        let numberOfDaysForEachUser = numberOfWorkingDays / users.length;
        expect(numberOfDaysForEachUser).toEqual(2.5);
        const rest = numberOfWorkingDays % users.length;
        expect(rest).toEqual(2);
        numberOfDaysForEachUser = Math.floor(numberOfDaysForEachUser);
        expect(numberOfDaysForEachUser).toEqual(2);

        expect(calculated['Alan']).toEqual(3);
        expect(calculated['Mychelle']).toEqual(3);
        expect(calculated['Ana']).toEqual(2);
        expect(calculated['Thiago']).toEqual(2);
    });

    it('Process simple number of working dates with 3 remnant', () => {
        const calculateWorkingDays = new CalculateWorkingDays();
        const numberOfWorkingDays = 11;
        const calculated = calculateWorkingDays.simpleNumberOfWorkingDaysForEachUser(numberOfWorkingDays, users);

        let numberOfDaysForEachUser = numberOfWorkingDays / users.length;
        expect(numberOfDaysForEachUser).toEqual(2.75);
        const rest = numberOfWorkingDays % users.length;
        expect(rest).toEqual(3);
        numberOfDaysForEachUser = Math.floor(numberOfDaysForEachUser);
        expect(numberOfDaysForEachUser).toEqual(2);

        expect(calculated['Alan']).toEqual(3);
        expect(calculated['Mychelle']).toEqual(3);
        expect(calculated['Ana']).toEqual(3);
        expect(calculated['Thiago']).toEqual(2);
    });

    it('Sort users by day priority', () => {
        const calculateWorkingDays = new CalculateWorkingDays();
        const array = calculateWorkingDays.copyArraySortingByUserPriority(5, users);

        expect(array[0].name).toEqual(users[3].name);
        expect(array[1].name).toEqual(users[0].name);
        expect(array[2].name).toEqual(users[1].name);
        expect(array[3].name).toEqual(users[2].name);
    });

    it('Distribute simple days by users with priority', () => {
        const calculateWorkingDays = new CalculateWorkingDays();
        const map = calculateWorkingDays.simpleNumberOfWorkingDaysForEachUser(9, users);
        const event = calculateWorkingDays.processUsersByDate(users, new Date(2018, 4, 11), map);
        expect(event.user.name).toEqual('Thiago');
        expect(map[event.user.name]).toEqual(1);
    });

    it('Distribute days by users with priority without holidays', () => {
        const calculateWorkingDays = new CalculateWorkingDays();
        const events = calculateWorkingDays.processDatesForUsers(new Date(2018, 4, 6), new Date(2018, 4, 12), users, []);
        expect(events[0].user.name).toEqual('Alan');
        expect(events[1].user.name).toEqual('Mychelle');
        expect(events[2].user.name).toEqual('Alan');
        expect(events[3].user.name).toEqual('Thiago');
        expect(events[4].user.name).toEqual('Ana');
    });
});




// import '../../utils/global';

// const Base64Decode = require('base64-stream').decode;
// const stream = require('stream');

// const mybase64 = 'aGVsbG8gc3RyZWFtIHdvcmxkCg==';

// describe('Base64Decode', () => {
//     it('should decode base64', () => {
//         const inputData = mybase64;
//         const input = new stream.Readable({
//             read: function read() {
//                 this.push(Buffer.from(inputData), 'utf8');
//                 this.push(null);
//             },
//         });

//         let outputData = '';
//         const output = new stream.Writable({
//             write: function write(chunk, encoding, callback) {
//                 outputData += chunk.toString();
//                 callback();
//             },
//         });
//         output.on('finish', () => {
//             expect(outputData).toEqual('hello stream world\n');
//         });

//         input.pipe(Base64Decode()).pipe(output);
//     });
// });

// import React from 'react';
// import { shallow } from 'enzyme';
// import FetchEmail from '../../components/FetchEmail';

// jest.mock('react-native-fs', () => {
//     const fs = {
//         mkdir: jest.fn(),
//         moveFile: jest.fn(),
//         copyFile: jest.fn(),
//         pathForBundle: jest.fn(),
//         pathForGroup: jest.fn(),
//         getFSInfo: jest.fn(),
//         getAllExternalFilesDirs: jest.fn(),
//         unlink: jest.fn(),
//         exists: jest.fn(),
//         stopDownload: jest.fn(),
//         resumeDownload: jest.fn(),
//         isResumable: jest.fn(),
//         stopUpload: jest.fn(),
//         completeHandlerIOS: jest.fn(),
//         readDir: jest.fn(),
//         readDirAssets: jest.fn(),
//         existsAssets: jest.fn(),
//         readdir: jest.fn(),
//         setReadable: jest.fn(),
//         stat: jest.fn(),
//         readFile: jest.fn(),
//         read: jest.fn(),
//         readFileAssets: jest.fn(),
//         hash: jest.fn(),
//         copyFileAssets: jest.fn(),
//         copyFileAssetsIOS: jest.fn(),
//         copyAssetsVideoIOS: jest.fn(),
//         writeFile: jest.fn(),
//         appendFile: jest.fn(),
//         write: jest.fn(),
//         downloadFile: jest.fn(),
//         uploadFiles: jest.fn(),
//         touch: jest.fn(),
//         MainBundlePath: jest.fn(),
//         CachesDirectoryPath: jest.fn(),
//         DocumentDirectoryPath: jest.fn(),
//         ExternalDirectoryPath: jest.fn(),
//         ExternalStorageDirectoryPath: jest.fn(),
//         TemporaryDirectoryPath: jest.fn(),
//         LibraryDirectoryPath: jest.fn(),
//         PicturesDirectoryPath: jest.fn(),
//     };
//     return fs;
// });

// jest.mock('react-native-fetch-blob', () => {
//     const blob = {
//         DocumentDir: jest.fn(),
//     };
//     return blob;
// });


// const htmlMock = `<div>
//     <img src="cid:123" />
//     <img src="cid:abc" />
//     <p>cid:123</p>
//     <p>cid:abc</p>
//     <p>cid:ABC</p>
// </div>`;

// const parsedHtmlMock = `<div>
//     <img src="<file://imgs/picture1.jpg>" />
//     <img src="<file://imgs/picture2.jpg>" />
//     <p>cid:123</p>
//     <p>cid:abc</p>
//     <p>cid:ABC</p>
// </div>`;

// const onlyOneImageFoundParsedHtmlMock = `<div>
//     <img src="<file://imgs/picture1.jpg>" />
//     <img src="cid:abc" />
//     <p>cid:123</p>
//     <p>cid:abc</p>
//     <p>cid:ABC</p>
// </div>`;

// describe('<FetchEmail>', () => {
//     let wrapper;

//     beforeEach(() => {
//         wrapper = shallow(<FetchEmail>{() => null}</FetchEmail>);
//     });

//     it('should parse html to include 2 attachments file names', () => {
//         const attachmentsMock = { abc: 'imgs/picture2.jpg', 123: 'imgs/picture1.jpg' };
//         const result = wrapper.instance().parseAttachments(htmlMock, attachmentsMock);
//         expect(result).toEqual(parsedHtmlMock);
//     });

//     it('should parse html to include only 1 attachments file names', () => {
//         const attachmentsMock = { 123: 'imgs/picture1.jpg' };
//         const result = wrapper.instance().parseAttachments(htmlMock, attachmentsMock);
//         expect(result).toEqual(onlyOneImageFoundParsedHtmlMock);
//     });
// });