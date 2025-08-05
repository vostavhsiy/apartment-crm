import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "@prisma/client";

import { ActivationGuard } from "../guards/activation.guard";
import { JwtAuthGuard } from "../guards/jwt.guard";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "./roles.decorator";

export function Auth(
  { roles, checkActivation }: { roles?: Role[]; checkActivation?: boolean } = {
    roles: [],
    checkActivation: true,
  },
) {
  const guards = [JwtAuthGuard, RolesGuard, checkActivation && ActivationGuard];
  return applyDecorators(
    Roles(...(roles || [])),
    UseGuards(...guards.filter((guard) => !!guard)),
  );
}
