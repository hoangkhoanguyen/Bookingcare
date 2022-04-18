import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import { path, USER_ROLE } from "../utils";


const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
    authenticatedSelector: state => state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectPath: path.LOGIN
});

export const userIsNotAuthenticated = connectedRouterRedirect({
    // Want to redirect the user when they are authenticated
    authenticatedSelector: state => !state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    redirectPath: (state, ownProps) => (state.user.userInfo && (state.user.userInfo.role == USER_ROLE.ADMIN ? path.ADMIN_SYSTEM : path.DOCTOR_SYSTEM)),
    // redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || (state.user.userInfo && (state.user.userInfo.role == USER_ROLE.ADMIN ? path.ADMIN_SYSTEM : path.DOCTOR_SYSTEM)),
    allowRedirectBack: false
});

export const userIsAdmin = connectedRouterRedirect({
    authenticatedSelector: state => state.user.role == USER_ROLE.ADMIN,
    wrapperDisplayName: 'userIsAdmin',
    redirectPath: path.DOCTOR_SYSTEM
});

export const userIsDoctor = connectedRouterRedirect({
    authenticatedSelector: state => state.user.role == USER_ROLE.DOCTOR,
    wrapperDisplayName: 'userIsDoctor',
    redirectPath: path.ADMIN_SYSTEM
});