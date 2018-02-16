module.exports = function (app) {
    // HardCode
    var sessions = [
        {
            id: '1',
            isInAgenda: true,
            isInWaitingList: false,
            isCanAdd: false,
            isCanAddToWaitingList: false,
            isCanRemove: true,
            date: '19.07.2017',
            type_id: 2,
            typeFormatted: 'Type 2',
            name: 'First session Type 2 date 19.07.2017',
            languageKey: 'fr',
            downloadCalendarUrl: 'https://www.google.com/doodles/argentina-national-day-2017',
            addToMyAgendaUrl: '/addToAgenda',
            addToWaitingListUrl: '/addToWaitingList',
            removeFromMyAgendaUrl: '/removeFromAgenda',
            price: '5 UAH'
        },
        {
            id: '2',
            isInAgenda: false,
            isInWaitingList: false,
            isCanAdd: true,
            isCanAddToWaitingList: false,
            isCanRemove: false,
            date: '20.07.2017',
            type_id: 3,
            typeFormatted: 'Type 3',
            name: 'Second session Type 3 date 20.07.2017',
            languageKey: 'en',
            downloadCalendarUrl: 'https://www.google.com/doodles/canada-national-day-2017',
            addToMyAgendaUrl: '/addToAgenda',
            addToWaitingListUrl: '/addToWaitingList',
            removeFromMyAgendaUrl: '/removeFromAgenda',
            price: '3 UAH'
        },
        {
            id: '3',
            isInAgenda: false,
            isInWaitingList: false,
            isCanAdd: false,
            isCanAddToWaitingList: true,
            isCanRemove: false,
            date: '21.07.2017',
            type_id: 1,
            typeFormatted: 'Type 1',
            name: 'Third session Type 1 date 21.07.2017',
            downloadCalendarUrl: 'https://www.google.com/doodles/sdfgasdfsdfsd',
            addToMyAgendaUrl: '/addToAgenda',
            addToWaitingListUrl: '/addToWaitingList',
            removeFromMyAgendaUrl: '/removeFromAgenda',
            price: '2 UAH'
        },
        {
            id: '4',
            isInAgenda: false,
            isInWaitingList: true,
            isCanAdd: false,
            isCanAddToWaitingList: false,
            isCanRemove: false,
            date: '21.07.2017',
            type_id: 1,
            typeFormatted: 'Type 1',
            name: 'Four session Type 1 date 21.07.2017',
            downloadCalendarUrl: 'https://www.google.com/doodles/sdfgasdfsdfsd',
            addToMyAgendaUrl: '/addToAgenda',
            addToWaitingListUrl: '/addToWaitingList',
            removeFromMyAgendaUrl: '/removeFromAgenda',
            price: '1 UAH'
        }
    ];

    var requestAnswer = {
        "error": 0,
        "errorMessage": "",
        "data": {
            sessions: sessions,
            warningMessage: '',
            allowNextStep: true,
            actionResponseMessage: '',
            selectedSessionsNumber: 2,
            totalCost: '5 UAH'
        }
    };



//
// HTTP-request methods
//
    app.post('/getSessions', function (req, res) {
        res.status(200).send(JSON.stringify(requestAnswer));
    });

    // Добавляет сессию в агенду
    app.post('/addToAgenda', function (req, res) {
        var data = req.body.data && JSON.parse(req.body.data);
        if(data && data.id) {
            sessions.forEach(function(s) {
                if(s.id === data.id){
                    s.isInAgenda = true;
                    s.isInWaitingList = false;
                    s.isCanAdd = false;
                    s.isCanAddToWaitingList = false;
                    s.isCanRemove = true;
                }
            });
        }
        requestAnswer.data.selectedSessionsNumber = 9;
        requestAnswer.data.totalCost = '555 UAH';
        requestAnswer.data.warningMessage = '';
        requestAnswer.data.allowNextStep = true;
        requestAnswer.data.actionResponseMessage = 'Test action response message!!!';
        res.status(200).send(JSON.stringify(requestAnswer));
        requestAnswer.data.actionResponseMessage = '';
    });

    // Добавляет сессию в список ожиданий
    app.post('/addToWaitingList', function (req, res) {
        var data = req.body.data && JSON.parse(req.body.data);
        if(data && data.id) {
            sessions.forEach(function(s) {
                if(s.id === data.id){
                    s.isInAgenda = false;
                    s.isInWaitingList = true;
                    s.isCanAdd = false;
                    s.isCanAddToWaitingList = false;
                    s.isCanRemove = true;
                }
            });
        }
        requestAnswer.data.selectedSessionsNumber = 13;
        requestAnswer.data.totalCost = '777 UAH';
        requestAnswer.data.warningMessage = '';
        requestAnswer.data.allowNextStep = true;
        res.status(200).send(JSON.stringify(requestAnswer));
    });

    // Удаляет сессию из агенды
    app.post('/removeFromAgenda', function (req, res) {
        var data = req.body.data && JSON.parse(req.body.data);
        if(data && data.id) {
            sessions.forEach(function(s) {
                if(s.id === data.id){
                    s.isInAgenda = false;
                    s.isInWaitingList = false;
                    s.isCanAdd = true;
                    s.isCanAddToWaitingList = false;
                    s.isCanRemove = false;
                }
            });
        }
        requestAnswer.data.selectedSessionsNumber = 1;
        requestAnswer.data.totalCost = '111 UAH';
        requestAnswer.data.warningMessage = 'Test warning message - disable Next Step';
        requestAnswer.data.allowNextStep = false;
        res.status(200).send(JSON.stringify(requestAnswer));
    });


};