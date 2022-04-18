import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const uri: string = process.env.MONGODB_URI as string;
    const { idAluno } = req.query;
    let matriculasDoAluno: any[];

    const client = new MongoClient(uri);

    if (!process.env.MONGODB_URI) {
        throw new Error("Please add your Mongo URI to .env.local");
    }

    try {
        await client.connect();
        matriculasDoAluno = await client
            .db()
            .collection("matricula")
            .find({ idAluno: idAluno })
            .toArray();
        
        res.status(200).json(matriculasDoAluno);
    } catch {
        res.status(200).json([]);
    } finally {
        client.close();
    }
};
