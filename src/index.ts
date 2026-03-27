import express from "express";
import dotenv from "dotenv";
import postRouter from "./routes/postRouter.ts";

//1. 환경 변수 초기화
dotenv.config();

//2. Express 앱 생성
const app = express();
app.use(express.json()); //app.use() 메소드는 미들웨어를 사용하게 할 때 사용어

// "/"로 들어왔을 때 동작되는 일꾼
app.get("/", (req, res) => {
    // res.send() 메소드는 string을 내보낼 때 사용
    res.send("여기는 루트입니다.");
});

app.get("/hello", (a, b) => {
    b.send("여기는 hello 주소로 들어왔습니다.");
});

app.use(postRouter);

//3. app.listen : 서버를 실행하는 메소드
//       매개변수 2개  (포트번호, 함수)
app.listen(process.env.PORT, () => {
    //얘가 실행되면 처음 할 일
    console.log(`서버가 실행되었습니다. http://localhost:${process.env.PORT}`);
});
