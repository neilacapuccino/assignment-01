import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;


type User = {
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
        email: string;
        [key: string]: any;
};

let storeVar: User[] = [];

async function fetchUsers(count: number = 1000): Promise<User[]> {
    const res = await fetch(`https://randomuser.me/api/?results=${count}`);
    const data = await res.json() as { results: User[] };
    return data.results;
}

(async () => {
    storeVar = await fetchUsers(1000);
})();
app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .get('/api', (req: Request, res: Response) => {
    const results = parseInt(req.query.results as string) || 1;
    if (results === 1) {
        res.status(200).json({ results: [storeVar[0]] });
    } else {
        res.status(200).json({ results: storeVar.slice(0, results) });
    }
})
    .listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
