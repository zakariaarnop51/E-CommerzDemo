import axios from 'axios'
import { create } from 'zustand'


export const FeatureStore = create((set)=>({
  FeatureList : false,
  FeatureRequest : async() => {
    let res = await axios.get('http://localhost:5000/api/v1/FeaturesRead')
    if (res.data["status"]==='success') {
        set({FeatureList: res.data["data"]})
    }
  },
  Footer : false,
  FooterRequest : async(id) => {
    let res = await axios.get(`http://localhost:5000/api/v1/PolicyDetails/${id}`)
    if (res.data["status"]==='success') {
      set({Footer: res.data["data"]})
    }
  }
}))
 