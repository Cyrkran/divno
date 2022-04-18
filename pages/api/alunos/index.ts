import type { NextApiRequest, NextApiResponse } from 'next'

type Aluno = {
    id: number,
    nome: string,
}

const Alunos: Aluno[] = [
    {
        id: 1,
        nome: 'Paulo'
    }
];

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    
    if(req.method === 'POST'){
        const body = req.body;
        Alunos.push({
            id: 2,
            nome: body.nome
        });

        res.status(200).send({message: "Aluno adicionado com sucesso"});
        return;
    }else if(req.method === 'GET'){
        res.status(200).json(Alunos);
        return;
    }

    res.status(405).send({message: "Não é possível responder a essa solicitação"}); 
    return;
  }