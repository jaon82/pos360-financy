import type { ExpressContextFunctionArgument } from '@as-integrations/express5';
import { verifyJwt } from '../../utils/jwt';

export type GraphQLContext = {
  user: string | undefined;
  token: string | undefined;
  req: ExpressContextFunctionArgument['req'];
  res: ExpressContextFunctionArgument['res'];
};

export const buildContext = async ({
  req,
  res,
}: ExpressContextFunctionArgument): Promise<GraphQLContext> => {
  const authHeader = req.headers.authorization;
  let user: string | undefined;
  let token: string | undefined;

  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.substring(7);
    try {
      const payload = verifyJwt(token);
      user = payload.id;
    } catch {}
  }

  return {
    user,
    token,
    req,
    res,
  };
};
