import { Session } from "@auth0/nextjs-auth0";
import type { NextPage } from "next";
import Dashboard from "../components/dashboard";
import Layout from "../components/layout";
import Api from "../lib/Api";
import auth0 from "../lib/auth0";
import { useFetchUser } from "../lib/user";

const Home: NextPage = (props: any) => {
    const { user, loading } = useFetchUser();
    return (
        <Layout user={user} loading={loading} isProfessor={props.isProfessor}>
            <Dashboard classes={props.cursos} />
        </Layout>
    );
};

export default Home;

export const getServerSideProps = auth0.withPageAuthRequired({
    async getServerSideProps(context: any) {
        const { req, res } = context;
        const session: Session | null | undefined = await auth0.getSession(
            req,
            res
        );

    
        if (!session) return { props: {} };
        const sub = session.user.sub;
    
        const cursos = await Api.getCursos();
        const matriculas = await Api.getMatriculaByAluno(sub);
        
        const isProfessor = cursos.some((aula: any) => {
            return aula.professor == sub;
        });

        matriculas.forEach((matricula: {_id: string, idAluno: string, idCurso: string}) => {
            const aula = cursos.find((aula: any) => {
                return aula._id == matricula.idCurso;
            });
            if(aula) aula.matriculado = true;
        })
   
        return {
            props: {
                cursos,
                isProfessor
            },
        };
    }
}) 