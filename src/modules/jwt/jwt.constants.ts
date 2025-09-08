import 'dotenv/config';

export const jwtConstants = {
    secret: process.env.JWT_SECRET ?? 'change_this_secret',
    expiresIn: process.env.JWT_EXPIRES ?? '1h',
    adminTokenName: process.env.ADMIN_JWT_TOKEN_NAME ?? 'admin_jwt_token',
};


