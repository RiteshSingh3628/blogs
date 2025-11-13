import User from "#models/User.js";
import { generateToken } from "#utils/jwtToken.js";
export const register = async (body) => {
  try {
    const { username, email, password } = body;
    if (!username || !email || !password) {
      return { status: "error", message: "All fields required" };
    }

    const user = await User.findOne({ email });
    if (user) {
      return {
        status: "error",
        message: "User already exists with this email",
      };
    }
    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = generateToken({ id: newUser._id });
    return { status: "sucesss", data: { user: newUser, token: token } };
  } catch (error) {
    console.error("Error in register service:", error);
  }
};

export const login = async (body) => {
  const { email, password } = body;
  try {
    if (!email || !password) {
      return { status: "error", message: "All fields required" };
    }
    const user = await User.findOne({ email });

    if (!user) {
      return { status: "error", message: "Invalid email or password" };
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return { status: "error", message: "Invalid email or password" };
    }

    const safeData = {
      name: user.username,
      email:user.email,

    }

    const token = generateToken({ id: user._id });

    return { status: "success", data: { token, safeData} };
  } catch (error) {
    console.error("Error in login service:",error);
  }
};
export default { register,login };
