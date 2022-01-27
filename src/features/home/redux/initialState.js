const initialState = {
    token: null,
    fetchTokenPending: false,
    fetchTokenError: null,
    products: {
        items:[]
    },
    fetchProductsPending: false,
    fetchProductsError: null,
    searchName: ''
};

export default initialState;
