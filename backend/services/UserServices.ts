import { db } from "../db";

const userLogin = async (email: string) => {
  return db.query("select * from users where email = $1", [email]);
};

const userRegister = async (
  name: string,
  email: string,
  hashedPassword: string
) => {
  const text = `INSERT INTO users (name,email,password) VALUES($1,$2,$3)`;

  return db.query(text, [name, email, hashedPassword]);
};

const UserServices = {
  userLogin,
  userRegister,
};

export default UserServices;
