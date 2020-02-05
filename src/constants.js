// let DEBUG = true;
let host = "http://127.0.0.1:8000";
// if (DEBUG === false) {
//     // host = "api.shwaymemes.com";
// }

export const APIEndpoint = `${host}/api/v1`;

export const fileUploadURL = `${APIEndpoint}/upload/`;
export const emailURL = `${APIEndpoint}/email/`;
export const changeEmailURL = `${APIEndpoint}/change-email/`;
export const changePasswordURL = `${APIEndpoint}/change-password/`;
export const groupSubscribeURL = `${APIEndpoint}/subscribe/`
export const APIkeyURL = `${APIEndpoint}/api-key/`;
export const cancelGroupSubscriptionURL = `${APIEndpoint}/cancel-subscription/`

export const loginURL = `${APIEndpoint}/rest-auth/login/`;
export const signupURL = `${APIEndpoint}/rest-auth/registration/`;

export const groupsURL = `${APIEndpoint}/groups/`

export const tagsURL = `${APIEndpoint}/tags/`

export const searchPageSize = 10
export const suggester = 'tag_suggest'
export const showZeroCountFacets = true
export const searchRoute = `${APIEndpoint}/search/tags/`
export const suggestionsRoute = `${APIEndpoint}/search/tags/suggest/`
export const rangeFilters = ['price', 'publication_date',]