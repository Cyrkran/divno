import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const uri: string = process.env.MONGODB_URI as string;
    const { idUser } = req.query;
    let cursosDoProfessor: any;

    const client = new MongoClient(uri);

    if (!process.env.MONGODB_URI) {
        throw new Error("Please add your Mongo URI to .env.local");
    }

    try {
        await client.connect();
        cursosDoProfessor = await client
            .db()
            .collection("horarios")
            .findOne({ userId: idUser });
        
        res.status(200).json(cursosDoProfessor);
    } catch {
        res.status(200).json({});
    } finally {
        client.close();
    }
};
