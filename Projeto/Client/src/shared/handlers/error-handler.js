import { createToast } from 'mosha-vue-toastify';

export function handleErrors(error, generic, locale) {
    console.error(error);

    if (!error || !error.response 
        || !error.response.data || !error.response.data.errors 
        || error.response.data.errors.length === 0
    )
        return createToast(generic, { type: 'danger' });

    error.response.data.errors.forEach(error => createToast(locale[error] || error, { type: 'danger' }));
}