const { api, statusCheck, onError, onSuccess } = require('./api');

export const authService = {
    login: (data) => api.post('/auth/login', data, statusCheck).then(onError, onSuccess),
    register: (data) => api.post('/auth/register', data, statusCheck).then(onError, onSuccess),
    forgotPassword: (data) => api.post('/auth/forgot-password', data, statusCheck).then(onError, onSuccess),
    verifyForgotPassCode: (data) => api.post('/auth/forgot-password-code-verify', data, statusCheck).then(onError, onSuccess),
    resetPassword: (data) => api.post('/auth/reset-password', data, statusCheck).then(onError, onSuccess),
    getUserProfile: () => api.get('/user', statusCheck).then(onError, onSuccess),
    updatePassword: (id, data) => api.post(`/user/${id}/update-password`, data, statusCheck).then(onError, onSuccess),
    updateProfile: (id, data) => api.post(`/user/${id}`, data, statusCheck).then(onError, onSuccess)
}
