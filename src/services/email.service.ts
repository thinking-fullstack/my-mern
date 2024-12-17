import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
  );
}

export const sendConfirmUserRegistered = async (user) => {
  const token = generateToken(user);
  console.log(token);
  //Todo: send email
}

export const sendChangePasswordConfirmEmail = async (user) => {
  const token = generateToken(user);
  console.log(token);
  //Todo: send email
}