import { getSession, Session, withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";
import BottomNav from "../../components/BottomNav";
import Courses from "../../components/Courses";
import Layout from "../../components/layout";
import Api from "../../lib/Api";
import auth0 from "../../lib/auth0";
import { useFetchUser } from "../../lib/user";

const CoursePage = (props: any) => {
    const { user, loading } = useFetchUser();
    return (
        <Layout user={user} loading={loading}>
            <>
                <Courses Aula={props.aula} />
                <BottomNav />
            </>
        </Layout>
    );
};

export default CoursePage;

export const getServerSideProps = auth0.withPageAuthRequired({
    async getServerSideProps(context: any) {
        const { req, res, query } = context;
        const session: Session | null | undefined = await auth0.getSession(
            req,
            res
        );
        
        if (!session) return { props: {} };
        const sub = session.user.sub;

        const aula = await Api.getAula(sub, query.idAula);
        console.log({aula});
        return {
            props: {
                aula
            },
        };
    },
});
