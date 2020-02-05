import axios from 'axios'

import {
    APIEndpoint,
    searchRoute,
    searchPageSize,
    suggestionsRoute,
    suggester,
} from './constants'

const client = axios.create({
    baseURL: APIEndpoint,
    validateStatus: function (status) {
        return status >= 200 && status < 300
    },
})


export default class searchapi {

    static buildSearchUrl(query, filters={}) {
        let queryList = [];
        queryList.push(`search=${query}`);
//         for (var filterName in filters) {
//             // Apply additional suffixes for range filters
//             let filterSuffix = (constants.api.rangeFilters.indexOf(filterName) > -1) ? '__range' : '';
// //            console.log('filterName: ', filterName);
// //            console.log('filterSuffix: ', filterSuffix);
//             for (var filterValue in filters[filterName]) {
//                 queryList.push(`${filterName}${filterSuffix}=${filterValue}`);
//             }
//         }
        return queryList.join('&');
    };

    static search = (query, filters, page=1) => {
        // console.log('constants: ', constants);
        const params = searchapi.buildSearchUrl(query, filters);
        console.log('params: ', params);
        return client({
            method: 'get',
            url: `${searchRoute}?` +
                //  `${constants.api.searchRouteParams}` +
                 `${'&'}page_size=${searchPageSize}` +
                 `${'&'}page=${page}` +
                 `${'&'}${params}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
        });
    };

    static detail = (id) => {
        return client({
            method: 'get',
            url: `${searchRoute}${id}/`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
        });
    };

    static suggest = (query, field=suggester) => {
        return client({
            method: 'get',
            url: `${suggestionsRoute}?${field}=${query}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
        });
    }
}