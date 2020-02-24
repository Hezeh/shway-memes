let DEBUG = false;
let host = "http://127.0.0.1:8000";
if (DEBUG === false) {
    host = "https://api.shwaymemes.com";
}

export const APIEndpoint = `${host}/api/v1`;

export const loginURL = `${APIEndpoint}/rest-auth/login/`;
export const signupURL = `${APIEndpoint}/rest-auth/registration/`;

export const groupsURL = `${APIEndpoint}/groups/list/`
export const trendingGroupsURL = `${APIEndpoint}/trending-groups`
export const groupPostsURL = `${APIEndpoint}/groups/posts/`

export const tagsURL = `${APIEndpoint}/tags/`
export const trendingTagsURL = `${APIEndpoint}/trending-hashtags`

export const feedURL = `${APIEndpoint}/feed/`
export const uploadsURL = `${APIEndpoint}/uploads`
export const userGroups = `${APIEndpoint}/mygroups`
export const userPostsURL = `${APIEndpoint}/userposts`
export const trendingProfilesURL = `${APIEndpoint}/trending-profiles`
export const favoritesURL = `${APIEndpoint}/favorites/`
export const followURL = `${APIEndpoint}/profiles/`
