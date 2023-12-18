
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import User from '@/app/api/models/User/User';

export const authMiddleware = async (req: NextRequest): Promise<boolean> => {
  try {
    const secret = 'aniket';
    const token = req.headers.get('authtoken') // Assuming token is sent as "Bearer token"
    if (!token) { 
      return false;
    }
    const decodedToken: any = jwt.verify(token, secret); 
    const userId = decodedToken.id; // Make sure the payload structure matches the token creation
    const user = await User.findOne({ _id: userId }).select('-password'); 
    if (!user) { 
      return false;
    }

    if (user.role ==='admin') {
      return true;
    } else { 
      return false;
    }
  } catch (error) { 
    return false;
  }
};
