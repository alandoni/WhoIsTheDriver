
import DateUtils from './../../utils/Date';
const dateUtils = new DateUtils();

import ArrayUtils from './../../utils/Array';
import { WorkEvent } from './Event';
const arrayUtils = new ArrayUtils();

export default class CalculateWorkingDays {

    processDatesForUsers(initialDate, finalDate, users, holidays) {
        const numberOfWorkingDays = dateUtils.getWorkingDays(initialDate, finalDate, holidays);
        const numberOfDaysForEachUser = this.simpleNumberOfWorkingDaysForEachUser(numberOfWorkingDays, users);
        const events = [];
        dateUtils.mapDates(initialDate, finalDate, (date) => {
            if (dateUtils.isWorkingDay(date, holidays)) {
                const event = this.processUsersByDate(users, date, numberOfDaysForEachUser);
                events.push(event);
            }
        });
        return events;
    }

    processUsersByDate(users, date, numberOfDaysForEachUser) {
        const sortedUsers = this.copyArraySortingByUserPriority(date.getDay(), users);
        for (const user of sortedUsers) {
            if (!user.willWorkAtDate(date)) {
                continue;
            }
            if (numberOfDaysForEachUser[user.name] > 0) {
                numberOfDaysForEachUser[user.name]--;
                const event = new WorkEvent(user, date);
                return event;
            }
        }
        return null;
    }

    copyArraySortingByUserPriority(day, users) {
        const newUsers = arrayUtils.copy(users);
        const sorted = newUsers.sort((a, b) => {
            if (day === a.priority.day && day !== b.priority.day) {
                return -1;
            } else if (day === b.priority.day && day !== a.priority.day) {
                return 1;
            } else if (a.priority.day === b.priority.day && a.priority.day === day) {
                return a.priority.priority - b.priority.priority;
            } else {
                return 0;
            }
        });
        return sorted;
    }

    simpleNumberOfWorkingDaysForEachUser(numberOfWorkingDays, users) {
        let numberOfDaysForEachUser = numberOfWorkingDays / users.length;
        const rest = numberOfWorkingDays % users.length;
        numberOfDaysForEachUser = Math.floor(numberOfDaysForEachUser);

        const daysForUsers = this.createMapForUsers(users, numberOfDaysForEachUser);

        if (rest === 0) {
            return daysForUsers;
        }

        return this.distributeDaysForUsers(daysForUsers, rest);
    }

    createMapForUsers(users, numberOfDaysForEachUser) {
        const daysForUsers = {};
        for (const user of users) {
            daysForUsers[user.name] = numberOfDaysForEachUser;
        }
        return daysForUsers;
    }

    distributeDaysForUsers(users, days) {
        Object.keys(users).forEach(function(key) {
            if (days > 0) {
                users[key]++;
                days--;
            }
        });
        return users;
    }
}
