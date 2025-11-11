import jwt from 'jsonwebtoken';

const JWT_SECRET = 'my_jwt_password';
interface User {
  id: string;
  name: string;
  email: string;
}
export function encode(payload: User) {
  return jwt.sign(payload, JWT_SECRET);
}

export function decode(token: string) {
  return jwt.verify(token, JWT_SECRET);
}