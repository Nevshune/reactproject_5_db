import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 회원가입 컨트롤러
export const postRegisterMember = async (req, res) => {
    try {
        const { username, password, email, name, mobile, address2 } = req.body;
        const address = address2;
        console.log(req.body);
        const user = await User.create({
            username,
            password,
            name,
            email,
            mobile,
            address: address2,
            createdAt: Date.now(),
        });
        res.json({ ok: "true", user });
    } catch (error) {
        console.log(error);
    }
};

//로그인 컨트롤러
export const postUsernameSignIn = async (req, res) => {
    const { username, password } = req.body;
    //에러처리
    if (username === "" || password === "") {
        res.json({
            ok: "false",
            message: "아이디와 패스워드는 반드시 입력해야 됩니다.",
        });
    }
    //유저네임(아이디) 확인
    const user = await User.findOne({ username: username });
    if (!user) {
        return res
            .status(401)
            .json({ ok: "false", message: "해당하는 유저가 없습니다." });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(401).json({
            ok: "false",
            message: "아이디와 비밀번호를 다시 확인 해 주세요.",
        });
    }

    //쿠키 전송

    try {
        const accessToken = jwt.sign(
            {
                id: user._id,
            },
            process.env.ACCESS_SECRET
        );
        res.cookie("accessToken", accessToken, {
            secure: true,
            httpOnly: false,
            samsSite: "None",
        });
        res.status(200).json({ ok: "true" });
    } catch (error) {
        console.log(error);
    }
};

// 로그인 확인
export const getLoginSuccess = async (req, res) => {
    try {
        const token = req.cookies?.accessToken;
        const data = jwt.verify(token, process.env.ACCESS_SECRET);
        const userData = await User.findOne({ _id: data.id });

        res.status(200).json({
            ok: "true",
            email: userData.email,
            username: userData.username,
        });
    } catch (error) {
        console.log(error);
    }
};
