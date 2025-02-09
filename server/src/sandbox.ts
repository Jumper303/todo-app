
const urls: string[] = ['https://www.index.hu', 'https://www.telex.hu'];

function getAll(urls: string[]) {
    return Promise.all(
        urls.map(async url => {
            const resp = await fetch(url);
            return resp;
        })
    )
}

getAll(urls).then(
    (resps) => {
        resps.map((resp) => {
            console.log(`${resp.url} ${resp.status}`);
        });
    }
);


