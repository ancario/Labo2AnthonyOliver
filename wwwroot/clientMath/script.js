async function TestMaths(url, param, showresult) {
    try {
        console.log("test")
        const val = await showresult(url + param);
        const response = await fetch(url + param);
        const data = await response.json();

        let check = "";

        if (val === null) {
            if (data.error !== null) {
                check = "OK"; } else {
                check = "ERROR"; }
        } else {
            if (val.result === data.result) {
                check = "OK";}
                 else {
                check = "ERROR";}
        }
        return `${check} ---> ${JSON.stringify(data)}\n`;
        
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}