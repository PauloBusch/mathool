import { handleErrors as handleErrorsGeneric } from '@/shared/handlers/error-handler';
import { TRANSLATE } from '../locale';

export function handleErrors(error, generic) {
    handleErrorsGeneric(error, generic, TRANSLATE);
}