export class AgendaSession {
    id: string = '';

    // for output
    day: string = '';
    chef: string = '';
    restaurant: string = '';
    name: string = '';
    type: string = '';
    time: string = '';
    room: string = '';
    sessionDetails: string = '';
    restaurantDetails: string = '';
    chefPhotoUrl: string = '';
    chefBiography: string = '';
    downloadCalendarUrl: string = '';

    // for filters
    type_id: string = '';

    // for sort
    typeFormatted: string = '';

    // for controls
    isInAgenda: boolean = false;
    isInWaitingList: boolean = false;
    isCanAdd: boolean = false;
    isCanAddToWaitingList: boolean = false;
    isCanRemove: boolean = false;

    // for actions
    addToMyAgendaUrl: string = '';
    addToWaitingListUrl: string = '';
    removeFromMyAgendaUrl: string = '';
    removeFromWaitingListUrl: string = '';

    constructor(srcData: AgendaSession) {
        Object.assign(this, srcData);
        this.type_id = this.type_id + '';

        this.resetFlags();
    }

    public resetFlags() {
        // Temporally check for max 1 session in agenda
        // this.isCanAdd = !this.isLocked && !this.isInAgenda;
        // this.isCanRemove = !this.isLocked && this.isInAgenda;
    }
}