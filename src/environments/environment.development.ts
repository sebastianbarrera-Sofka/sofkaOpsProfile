// Ambiente de desarrollo
export const environment = {
    API_URL: 'http://localhost:8081',
    API_RUL_LOGIN: 'http://localhost:8090/api/auth/login',
    EDPOINT_ACCOUNTS: 'api/OpsProfiler/get-accounts-by-user',
    EDPOINT_USER: 'api/User/get-users',
    EDPOINT_PROJECTS: 'api/Project',
    EDPOINT_CREATE_ACCOUNT: 'api/Account',
    EDPOINT_GET_TECHNOLOGIES: 'api/TechStack/get-tech-stacks',
    EDPOINT_GET_ACCOUNTS_OPSPROFILE: 'api/OpsProfiler?opsProfileId',
    EDPOINT_UPDATE_OPSPROFILEANDACCOUNT: 'api/OpsProfiler/update-Profiler-Account',
    EDPOINT_DELETE_ACCOUNT: 'api/Account/delete-account',
    ENDPOINT_CHANGE_STACK: 'api/Project/add-tech-stack-list'
};
