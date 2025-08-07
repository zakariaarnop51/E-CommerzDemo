import { ProductStore } from "../Store/ProductStore.js";

const ReviewedComponent = () => {
    const { Reviewed } = ProductStore();

    if (Reviewed === null) {
        return <div>Loading ..............</div>;
    }

    if (Reviewed.length === 0) {
        return <div>No Review</div>;
    }

    return (
        <div>
            {Reviewed.map((item, key) => (
                <div key={key} style={{ border: "1px solid black" }}>
                    <p  >{item["cus_name"]}</p>
                    <p>{item['des']}</p>
                    <p>{item['rating']}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewedComponent;
