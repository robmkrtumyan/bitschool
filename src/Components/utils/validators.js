export const isRequire = (value) => {
    return !!value.length ? undefined : "The Field is Required"
};
export const max = (length) => (value) => value.length > length ? "No more than 30 characters" + length : undefined;
export const min = (length) => (value) => value.length < length ? "No more than "+length+" characters " : undefined;
export const emailValidation = (email) =>  {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) ? undefined : "Invalid Email";
}