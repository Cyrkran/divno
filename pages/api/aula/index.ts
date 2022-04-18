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
    const { idAluno, idCurso } = req.query;

    let aula: any;

    const client = new MongoClient(uri);

    if (!process.env.MONGODB_URI) {
        throw new Error("Please add your Mongo URI to .env.local");
    }

    if(!idAluno || !idCurso) {res.status(401).send({message: "id do aluno ou do curso não recebido"}); return;}
    console.log({idAluno, idCurso})
    try{
        await client.connect();
        aula = await client.db().collection("aulas").find({idAluno, idCurso });

        res.status(200).json(aula);
    }
    catch{
        res.status(500).send({message: "Erro"});
    }
    finally{
        client.close();
    }
};

