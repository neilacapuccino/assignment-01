import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
const app = express();
const port = process.env.PORT || 3000;
let storeVar = [];
async function fetchUsers(count = 1000) {
    const res = await fetch(`https://randomuser.me/api/?results=${count}`);
    const data = await res.json();
    return data.results;
}
(async () => {
    storeVar = await fetchUsers(1000);
})();
app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .get('/api', (req, res) => {
    const results = parseInt(req.query.results) || 1;
    if (results === 1) {
        res.status(200).json({ results: [storeVar[0]] });
    }
    else {
        res.status(200).json({ results: storeVar.slice(0, results) });
    }
})
    .listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
