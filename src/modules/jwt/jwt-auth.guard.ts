import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants.js';


@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('Missing Bearer token');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });
            request.user = payload;
            return true;
        } catch {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }

    private extractTokenFromHeader(request: any): string | null {
        const authHeader: string | undefined = request.headers?.authorization || request.headers?.Authorization;
        if (authHeader) {
            const [scheme, token] = authHeader.split(' ');
            if (scheme === 'Bearer' && token) return token;
        }

        const cookieToken: string | undefined = request.cookies?.[jwtConstants.adminTokenName];
        if (cookieToken) return cookieToken;

        const headerToken: string | undefined = request.headers?.[jwtConstants.adminTokenName] || request.headers?.[jwtConstants.adminTokenName.toLowerCase()];
        if (headerToken) return String(headerToken);

        return null;
    }
}


