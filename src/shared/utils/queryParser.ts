export const queryParser = (requestQuery) => {
    let { query, projection, options } = requestQuery;

    let newQuery = {};
    if (query) {
        if (typeof query === 'string') {
            query = JSON.parse(query);
        }
        Object.entries(query).map(([key, value]) => {
            if (typeof value === 'string') {
                newQuery[key] = new RegExp(`${value}`, 'i');
            } else {
                newQuery[key] = value;
            }
        });
    }

    if (projection && typeof projection === 'string') {
        projection = JSON.parse(projection);
    }
    if (options && typeof options === 'string') {
        options = JSON.parse(options);
    }
    return { query: newQuery, projection, options }
};