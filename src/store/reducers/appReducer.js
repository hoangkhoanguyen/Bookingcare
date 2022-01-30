import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null
}

const initialState = {
    started: true,
    language: 'vi',
    systemMenuPath: '/system/user-manage',
    contentOfConfirmModal: {
        ...initContentOfConfirmModal
    },
    isShowSidebar: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APP_START_UP_COMPLETE:
            return {
                ...state,
                started: true
            }
        case actionTypes.SET_CONTENT_OF_CONFIRM_MODAL:
            return {
                ...state,
                contentOfConfirmModal: {
                    ...state.contentOfConfirmModal,
                    ...action.contentOfConfirmModal
                }
            }
        case actionTypes.CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.language
            }
        case actionTypes.SET_SHOW_HIDE_SIDEBAR:
            return {
                ...state,
                isShowSidebar: action.isShow
            }
        default:
            return state;
    }
}

export default appReducer;