import { useEffect } from "react";
import { FeatureStore } from "../Store/FeatureStore.js";
import  parse from 'html-react-parser';
import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout.jsx";

const FooterComponent = () => {
    const { id } = useParams();
    const { Footer, FooterRequest } = FeatureStore();

    useEffect(() => {
        FooterRequest(id);
        console.log(id)
        console.log(Footer)
    }, [id]); // ✅ Runs only when `id` changes

    return (
        <Layout>
            {Footer && <div>{parse(Footer[0]['description'])}</div>} {/* Example render */}
            this is footer
        </Layout>
    );
};

export default FooterComponent;
