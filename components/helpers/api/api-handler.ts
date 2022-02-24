import type { NextApiRequest, NextApiResponse } from 'next';
import { errorHandler } from '../../../pages/api/error-handler';

// to-do define httpRequest --> POST GET PUT DELETE
export default function apiHandler(handler: any) {

    return async (req: NextApiRequest, res: NextApiResponse) =>{
        const method = req.method.toLocaleLowerCase();

        if (!handler[method]) {
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }

        try {
            //await jwtMiddleware(req, res);  -- axios interceptor 来控制token
            await handler[method](req, res);
        } 
        catch (error) 
        {
            errorHandler(error);
        }

    }
}

