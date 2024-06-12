module.exports = {
    DEVELOPMENT_ENV: "development",
    PRODUCTION_ENV: "production",
    OTP_LENGTH_DIGITS: 4,
    SECRET_KEY:'wL6kUhgYo/4?)F@%40;9rsMJs{h`.hI|4oT/`mJ"EE|Vw#kjH?FRE{vYWC<^;=t',
    STATUS: {
        ACTIVE: 1,
        INACTIVE: 0
    },
    ROLES: {
        ADMIN: "admin",
        USER: "user"
    },
    ROLES_IDS: {
        ADMIN: 1,
        USER: 2
    },
    STATUS_CODE: {
        CREATED: 201,
        UPDATED: 202,
        OK: 200,
        NOT_FOUND: 404,
        BAD_REQUEST: 400,
        SERVER_ERROR: 500,
        METHOD_NOT_ALLOWED: 405,
        PERMISSION_NOT_ALLOWED:422
    }
}