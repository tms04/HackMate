import jwt from "jsonwebtoken";

export const sendCookie = (user, res) => {
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, // 1 hour
    });
    return token;
};
