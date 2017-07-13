export class AgendaSession {
    id: string = '';

    // for output
    date: string = '';
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

    // for filters
    languageKey: string = '';
    cantonKey: string = '';
    sessionKey: string = '';
    chefKey: string = '';

    // for sort
    dateRaw: string = '';

    // for controls
    isInAgenda: boolean = false;
    isCanAdd: boolean = false;
    isCanRemove: boolean = false;

    constructor(srcData: AgendaSession) {
        Object.assign(this, srcData);

        this.resetFlags();
    }

    public resetFlags(){
        // Temporally check for max 1 session in agenda
        // this.isCanAdd = !this.isLocked && !this.isInAgenda;
        // this.isCanRemove = !this.isLocked && this.isInAgenda;
    }
}