import jwt from "jsonwebtoken";

export const sendCookie = (user, res) => {
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction, // true in production
        sameSite: isProduction ? "none" : "strict", // 'none' in production to allow cross-site cookies
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        path: "/",
        domain: isProduction ? ".onrender.com" : undefined // adjust this based on your domain
    });
    return token;
};
