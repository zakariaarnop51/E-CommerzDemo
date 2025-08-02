import { FeatureStore } from './../Store/FeatureStore';
import './ComponentcssCss/Feature.css'

function Feature() {
    const { FeatureList } = FeatureStore()
    if (FeatureList === false) {
        return(
            <div>Loading...</div>
        )
    }else if (FeatureList === " ") {
        return(
            <div>data not avable</div>
        )
    }else{
        return(
            <div className='Feature-header'>
                { FeatureList.map((feature, index) => (
                    <div className='Feature-row' key={index}>{feature.name}</div>
                ))}
            </div>
        )
    }
}

export default Feature

                  {/* {?(<p>${}</p>):(<p>${item['price']}</p>)} */}
