import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}


    canActivate(context: ExecutionContext): boolean {
        // roles exigidas na rota (ex: @Roles('admin'))
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY,[
            context.getHandler(),
            context.getClass(),
        ]);

        // se a rota não tem @Roles, libera
        if (!requiredRoles || requiredRoles.length === 0 ){
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || !user.role){
            throw new ForbiddenException('User has no role');
        }

        const hasRole = requiredRoles.includes(user.role);

        if (!hasRole){
            throw new ForbiddenException('You do not have permission to access this resource');
        }

        return true;
    }
}