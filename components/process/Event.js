export default class Event {

    constructor(event, date) {
        this.event = event;
        this.date = date;
    }
}

export class WorkEvent extends Event {

    constructor(user, date) {
        super(user.name, date);
        this.user = user;
        this.date = date;
    }
}
