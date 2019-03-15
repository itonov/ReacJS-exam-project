class FlavourService {
    static findFlavour(flavourId) {
        return fetch(`http://localhost:9999/feed/flavour/find/${flavourId}`);
    };

    static receiveAllFlavours(filter) {
        return fetch('http://localhost:9999/feed/flavours/all', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify(filter)
            }
        );
    };

    static addNewFlavour(flavour) {
        const data = new FormData();
        for (const fieldName in flavour) {
            if (flavour.hasOwnProperty(fieldName)) {
                data.append(fieldName, flavour[fieldName]);
            }
        }
        return fetch('http://localhost:9999/feed/flavour/create', {
            method: 'POST',
            headers: {
                'Authorization': sessionStorage.getItem('token'),
            },
            body: data
        });
    };

    static deleteFlavour(flavourId) {
        return fetch('http://localhost:9999/feed/flavour/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token'),
            },
            body: JSON.stringify({flavourId})
        });
    }
}

export default FlavourService;