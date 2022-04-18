export default class Api {
    static getCursos() {
        return fetch(`${process.env.NEXT_PUBLIC_API_HOST}/cursos`, {
            method: "GET",
        }).then((res) => {
            return res.json();
        });
    }

    static getMatriculaByAluno(idAluno: string) {
        return fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/matricula?idAluno=${idAluno}`,
            {
                method: "GET",
            }
        )
            .then((res) => {
                return res.json();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    static getAula(idAluno: string, idCurso: string) {
        return fetch(`${process.env.NEXT_PUBLIC_API_HOST}/aula?idAluno=${idAluno}&idCurso=${idCurso}`, {
            method: "GET",
        })
            .then((res) => {
                return res.json();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    static matricular(idAluno: number, idAula: number) {
        return fetch(`${process.env.NEXT_PUBLIC_API_HOST}/matricula/`, {
            method: "POST",
            body: JSON.stringify({ idAluno, idAula }),
        })
            .then((res) => {
                return res.json();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    static getCursoPorProfessor(idUser: string) {
        return fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/professor/cursos?idUser=${idUser}`,
            {
                method: "GET",
            }
        )
            .then((res) => {
                return res.json();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    static getHorarios(idUser: string){
        return fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/professor/horarios?idUser=${idUser}`,
            {
                method: "GET",
            }
        )
            .then((res) => {
                return res.json();
            })
            .catch((err) => {
                console.log(err);
            }); 
    }
}
