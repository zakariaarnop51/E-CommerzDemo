import axios from "axios";
import { create } from "zustand";

export const ProductStore = create((set) => ({
  BrandList: null,
  FilterList:false,
  BrandListRequest: async () => {
    let res = await axios.get("http://localhost:5000/api/v1/ProductBrandList");
    if (res.data["status"] === "success") {
      set({ BrandList: res.data["data"] });
    }
  },
  CategoryList: null,
  CategoryListRequest: async () => {
    let res = await axios.get(
      "http://localhost:5000/api/v1/ProductCategoryList"
    );
    if (res.data["status"] === "success") {
      set({ CategoryList: res.data["data"] });

    }
  },

  SliderList: null,
  SliderRequest: async () => {
    let res = await axios.get("http://localhost:5000/api/v1/ProductSliderList");
    if (res.data["status"] === "success") {
      set({  SliderList: res.data["data"],
            FilterList: false
      });

    }
  },
  CssRemark: "new",
  ListByProduct: null,
  ProductRemarkRequest: async (Remark) => {
    let res = await axios.get(
      `http://localhost:5000/api/v1/ProductListByRemark/${Remark}`
    );
    if (res.data["status"] === "Success") {
      set({ ListByProduct: res.data["data"] });
      set({ CssRemark: Remark
      });


    }
  },

  ListProduct: null,
  BrandByProductRequest: async (BrandID) => {
    let res = await axios.get(
      `http://localhost:5000/api/v1/ProductListByBrand/${BrandID}`
    );
    if (res.data["status"] === "Success") {
      set({ ListProduct: res.data["data"] ,
        FilterList: false
      });

    }
  },
  CategoryByProductRequest: async (CategoryID) => {
    let res = await axios.get(
      `http://localhost:5000/api/v1/ProductListByCategory/${CategoryID}`
    );
    if (res.data["status"] === "Success") {
      set({ ListProduct: res.data["data"] ,
        FilterList: false
      });

    }
  },

  Keyword: " ",
  setKeyword: (e) => {
    set({Keyword:e,
      FilterList: false
    });

  },
  KeywordByProductRequest: async (Keyword) => {
    let res = await axios.get(
      `http://localhost:5000/api/v1/ProductListByKeyword/${Keyword}`
    );
    if (res.data["status"] === "success") {
      set({ ListProduct: res.data["data"],
        FilterList: false
      });

    }
  },
  FilterByProductRequest: async (body) => {
    let res = await axios.post(
        `http://localhost:5000/api/v1/ProductFilter`,body
    );
    if (res.data["status"] === "success") {
      set({
        FilterList: true,
        ListProduct: res.data.data,
      });
    }
  },
  FilterListRequest:  () => {
    set({ FilterList: false });
  },

  DetailsByProduct: null,
  DetailsByProductRequest: async (id) => {
    let res = await axios.get(`http://localhost:5000/api/v1/ProductDetails/${id}`);
    if (res.data["status"] === "Success") {
      set({ DetailsByProduct: res.data["data"] ,
        FilterList: false
      });
    }
  },
  Reviewed: null,
  ReviewRequest: async (id) => {
    let res = await axios.get(`http://localhost:5000/api/v1/ProductReviewList/${id}`);
    if (res.data["status"] === "success") {
      set({ Reviewed: res.data["data"] ,
        FilterList: false
      });
    }
  },


}));
