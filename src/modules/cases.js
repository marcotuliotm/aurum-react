import CasesApi from "../services/casesApi";

export const LOAD_CASES_LOADING = 'LOAD_CASES_LOADING';
export const LOAD_CASES_SUCCESS = 'LOAD_CASES_SUCCESS';
export const LOAD_CASES_ERROR = 'LOAD_CASES_ERROR';
export const FIND_CASES_SUCCESS = 'FIND_CASES_SUCCESS';
export const CASES_ERROR = 'LOAD_CASES_ERROR';
export const CREATE_CASE_LOADING = 'CREATE_CASE_LOADING';
export const CREATE_CASE_SUCCESS = 'CREATE_CASE_SUCCESS';
export const EDIT_CASE_LOADING = 'EDIT_CASE_LOADING';
export const EDIT_CASE_SUCCESS = 'EDIT_CASE_SUCCESS';
export const DELETE_CASE_LOADING = 'DELETE_CASE_LOADING';
export const DELETE_CASE_SUCCESS = 'DELETE_CASE_SUCCESS';
export const CANCEL = 'CANCEL';

export const loadAll = (page, pageSize) => dispatch => {
    dispatch({ type: LOAD_CASES_LOADING });

    CasesApi.getAll(page, pageSize)
        .then(response => response.data)
        .then(
            data => dispatch({ type: LOAD_CASES_SUCCESS, data }),
            error => dispatch({ type: LOAD_CASES_ERROR, error: [] || 'Unexpected Error!!!' })
        )
};

export const create = (person) => dispatch => {
    dispatch({ type: CREATE_CASE_LOADING });

    CasesApi.create(person)
        .then(response => response.data)
        .then(
            data => dispatch({ type: CREATE_CASE_SUCCESS, data }),
            error => dispatch({ type: CASES_ERROR, error: error.response.data || 'Unexpected Error!!!' })
        )

};

export const remove = (id) => dispatch => {
    dispatch({ type: DELETE_CASE_LOADING });

    CasesApi.remove(id)
        .then(response => response.data)
        .then(
            data => dispatch({ type: DELETE_CASE_SUCCESS, id }),
            error => dispatch({ type: CASES_ERROR, error: error.response.data || 'Unexpected Error!!!' })
        )
};

export const edit = (person) => dispatch => {
    dispatch({ type: EDIT_CASE_LOADING });

    CasesApi.update(person)
        .then(response => response.data)
        .then(
            data => dispatch({ type: EDIT_CASE_SUCCESS, data }),
            error => dispatch({ type: CASES_ERROR, error: error.response.data || 'Unexpected Error!!!' })
        )
};

export const find = (filter='', page = 0, pageSize = 5) => dispatch => {
    dispatch({ type: LOAD_CASES_LOADING, filter, page, pageSize });

    CasesApi.find(filter, page, pageSize)
        .then(response => response.data)
        .then(
            data => dispatch({ type: LOAD_CASES_SUCCESS, data, filter }),
            error => dispatch({ type: CASES_ERROR, error: error.response.data || 'Unexpected Error!!!' })
        )
};

const initialState = {
    data: {
        offset: 0,
        limit: 5,
        totalElements: 0,
        elements: []
    },
    filter: "",
    loading: false,
    error: [],
};

export const cancel = () => dispatch => {
    dispatch({ type: CANCEL });
}

const aCase = (state = {}, action) => {
    switch (action.type) {
        case EDIT_CASE_SUCCESS:
            if (state.id !== action.data.id) {
                return state;
            }
            return action.data;
        default:
            return state;
    }
};

export default function cases(state = initialState, action) {
    switch (action.type) {
        case DELETE_CASE_LOADING:
        case CREATE_CASE_LOADING:
        case LOAD_CASES_LOADING: {
            return {
                ...state,
                loading: true,
                error: [],
                filter: action.filter,
            };
        }
        case LOAD_CASES_SUCCESS: {
            return {
                ...state,
                data: action.data,
                loading: false
            }
        }
        case FIND_CASES_SUCCESS: {
            return {
                ...state,
                data: action.data,
                loading: false,
                filter: action.filter,
            }
        }
        case CASES_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }
        case EDIT_CASE_SUCCESS:
            return {
                ...state,
                data: {...state.data,
                    elements: state.data.elements.map(p => aCase(p, action))
                },
                loading: false,
                error: action.error
            }
        case CREATE_CASE_SUCCESS: {
            loadAll();
            return {
                ...state,
                loading: false,
            }
        }
        case DELETE_CASE_SUCCESS: {
            return {
                ...state,
                data: {
                    ...state.data,
                    elements: state.data.elements.filter(aCase => aCase.id !== action.id),
                },
                loading: false,
                error: []
            }
        }
        case CANCEL: {
            return {
                ...state,
                error: []
            };
        }
        default: {
            return state;
        }
    }
}