import express from "express";
import Path from "path";
import path from "path";

const router = express.Router();

const mockUsers = [
    { id: 1, email: "admin@test.com", password: "password123", name: "관리자" },
    { id: 2, email: "user@test.com", password: "1234", name: "일반유저" }
];

router.get("/users/login", (req, res) => {
    // const email = req.query.email;
    // const password = req.query.password;
    // req.query는 객체에서 1개 이상의 프로퍼티 값을 뽑아오려 한다면 이렇게도 쓸 수 있음
    const { email, password } = req.query;    // 쿼리 스트링으로 들어온 값을 꺼내는 방법

    const successPage = Path.join(process.cwd(), "public", "success.html");
    const failPage = path.join(process.cwd(), "public", "fail.html");

    // 1. email과 password가 둘 다 값이 정상적으로 도착이 됐는지  -> 성공, 실패
    if (!email || !password) {
        return res.sendFile(failPage);
    }

    // 2. email로 값을 찾았을 때 있는지                         -> 성공, 실패
    const user = mockUsers.find((value) =>{
        return value.email === email;
    });
    if (!user) {
        return res.sendFile(failPage);
    }

    // 3. 그 찾은 그 회원 정보와 비밀번호를 비교해서 맞는지        -> 성공, 실패
    if (user.password !== password) {
        return res.sendFile(failPage);
    }
    res.sendFile(successPage);
});


export default router;

