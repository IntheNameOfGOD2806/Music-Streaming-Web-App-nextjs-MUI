import queryString from 'query-string';
import slugify from 'slugify';
export const sendRequest = async <T>(optionsP: IRequest) => {
    let {
        // url 
        url,
        // 
        method,
        body,
        queryParams = {},
        useCredentials = false,
        headers = {},
        nextOption = {}
    } = optionsP;
    const options: any = {
        method: method,
        // by default setting the content-type to be json type
        headers: new Headers({ 'content-type': 'application/json', ...headers }),
        body: body ? JSON.stringify(body) : null,
        ...nextOption
    };
    if (useCredentials) options.credentials = "include";
    if (queryParams) {
        // console.log(queryParams);
        // url = `${url}?${queryString.stringify(queryParams)}`;
        // console.log(url);
    }
    return fetch(url, options).then(res => {
        if (res.ok) {
            return res.json() as T;
        } else {
            return res.json().then(function (json) {
                // to be able to access error status when you catch the error 
                return {
                    statusCode: res.status,
                    message: json?.message ?? "",
                    error: json?.error ?? ""
                } as T;
            });
        }
    });
};

export const sendRequestFile = async <T>(optionsP: IRequest) => {
    let {
        // url 
        url,
        // 
        method,
        body,
        queryParams = {},
        useCredentials = false,
        headers = {},
        nextOption = {}
    } = optionsP;
    const options: any = {
        method: method,
        // by default setting the content-type to be json type
        headers: new Headers({ ...headers }),
        body: body ? (body) : null,
        ...nextOption
    };
    if (useCredentials) options.credentials = "include";
    if (queryParams) {
        url = `${url}?${queryString.stringify(queryParams)}`;
    }
    return fetch(url, options).then(res => {
        if (res.ok) {
            return res.json() as T;
        } else {
            return res.json().then(function (json) {
                // to be able to access error status when you catch the error 
                return {
                    statusCode: res.status,
                    message: json?.message ?? "",
                    error: json?.error ?? ""
                } as T;
            });
        }
    });
};
export const getAvatar = (type: string) => {
    if (type === "GITHUB") {
        return "/assets/images/github_avatar.png"

    }
    else if (type === "GOOGLE") {
        return "/assets/images/google.png"

    }
    return "/assets/images/default_avatar.avif"

}
export const convertToSlug = (str: string) => {
    if (!str) return "";
    let newStr = "";
    return newStr = slugify(str, { lower: true, strict: true, locale: "vi" })
}