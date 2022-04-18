// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

type Aula = {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    img: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri: string = process.env.MONGODB_URI as string;
    const options = {};
    let aulas:any[];

    const client = new MongoClient(uri);

    if (!process.env.MONGODB_URI) {
        throw new Error("Please add your Mongo URI to .env.local");
    }
    
    try{
        await client.connect();
        aulas = await client.db().collection("cursos").find({}).toArray();

        res.status(200).json(aulas);
    }
    catch{
        res.status(200).json([]);
    }
    finally{
        client.close();
    }
};

