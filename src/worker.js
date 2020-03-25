import { CALL_API } from './enums';

export default () => { // eslint-disable-next-line no-restricted-globals
    self.addEventListener('message', e => {
        if (!e && e.data !== CALL_API) return;

        let { data } = e;

        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
            .then(res => {
                console.log('res -> ', res)
                const list = res.filter( (item, idx) => {
                    return item.email.includes(data);
                });
                postMessage(list);
            })
            .catch(error => postMessage(null));
    })
}