import { NextRequest, NextResponse } from 'next/server';
import { encode } from '@/lib/jwt';

interface RequestBody {
  email: string;
  password: string;
}


function authenticateUser(email: string, password: string): string | null {
  const validEmail = 'johndoe@somecompany.com';
  const validPassword = 'strongpassword';

  if (email === validEmail && password === validPassword) {
    return encode({
      id: 'f678f078-fcfe-43ca-9d20-e8c9a95209b6',
      name: 'John Doe',
      email: 'johndoe@somecompany.com',
    });
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json() as RequestBody;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing required params' },
        { status: 400 }
      );
    }

    const token = authenticateUser(email, password);

    if (token) {
      const response = NextResponse.json({ success: true });
      
      response.cookies.set('my_auth', token, {
        path: '/',
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production', // HTTPS in production
        // sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });

      return response;
    } else {
      return NextResponse.json(
        { 
          success: false,
          error: 'Wrong email or password' 
        },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 }
    );
  }
}

// Export other HTTP methods as needed
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}