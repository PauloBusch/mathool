import { getTokenStorage, getUserStorage } from '../shared/services/storage-service';

export function guardMiddleware(roles) {
    return (to, from, next) => {
        const token = getTokenStorage();
        const user = getUserStorage();
        if (!token || !user) return next("/login");
        if (roles.indexOf(user.role) !== -1) return next();
        
        next('/login');
    };
}