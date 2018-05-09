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
