import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ProductStore } from "../Store/ProductStore";
import DetailsComponent from "../Component/DetailsComponent.jsx";
import Layout from "../Layout/Layout.jsx"; // uncomment if needed

const Details = () => {
    const { DetailsByProductRequest,ReviewRequest } = ProductStore();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            (async () => {
                await DetailsByProductRequest(id);
                await ReviewRequest(id);
            })();
        }
    }, [id]);

    return (
        <>
            <Layout>
                <DetailsComponent />
            </Layout>
        </>
    );
};

export default Details;
