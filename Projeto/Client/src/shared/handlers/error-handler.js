import { createToast } from 'mosha-vue-toastify';

export function handleErrors(error, generic, locale) {
    console.error(error);

    if (!error || !error.response 
        || !error.response.data || !error.response.data.errors 
        || error.response.data.errors.length === 0
    )
        return createToast(generic, { type: 'danger' });

    const errorsTranslated = error.response.data.errors.filter(error => !!locale[error]);
    if (errorsTranslated.length === 0) return createToast(generic, { type: 'danger' });

    errorsTranslated.forEach(error => createToast(locale[error] || generic, { type: 'danger' }));
}