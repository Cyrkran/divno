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
    
    if(req.method !== 'GET'){
        res.status(405).send({message: "Somente POST requests"});
        return;
    }
    
    const { idAluno } = req.query;
    if(!idAluno) res.status(400).send({message: "Bad Request né bonitão"});

    const aluno = Alunos.find((el:Aluno) => {
        return el.id === +idAluno;
    });

    aluno ? res.status(200).json(aluno) : res.status(404).send({message: "Aluno não encontrado"});

    return;
  }