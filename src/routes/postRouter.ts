//import => 외부에 있는 걸 끌어와서 내가 사용 하는거
//       => 외부에서는 내보내는게 있다
// export => 내보내기
import express from "express";

const router = express.Router();     // 라우터를 새로 생성

// 데이터베이스가 없어서 임시로 만든 데이터 변수 (mock)
const mockPosts = [
    { id: 1, title: "첫 번째 택배", content: "무사히 도착했습니다." },
    { id: 2, title: "두 번째 택배", content: "파손 주의해주세요!" },
    { id: 3, title: "세 번째 택배", content: "문 앞에 두고 가주세요." },
];

//   /posts => 글 목록을 출력해줄 때 필요한 주소
//          => 글 1개를 출력해줄 때 필요한 주소

router.get("/posts", (req, res) => {
    // res.json(보낼 데이터) 메소드 : string이 아닌, 객체 타입의 데이터(단, 함수 빼고)를 보낼 때 사용
    // res.json 메소드를 사용하려면 app.use(express.json())을 꼭 써줘야 함
    res.json(mockPosts);
});

// 경로에 "/"로 나눴을 때,
// posts까지는 정해져 있고, 그 뒤 경로가 어떤 값이 들어올지 모를때
// ":"를 붙이고, 이름표를 붙여줌 => id하고 하는 이름을 붙여줬다.
// 예) /posts/1    => 여기에 걸리고, id가 1
// 예) /posts/300  => 여기에 걸리고, id가 300(300은 문자다. string이다. 주소로 들어오는건 전부다 string)
router.get("/posts/:id", (req, res) => {
    // 이렇게 가져온 저 "id"라는 값은
    // req.params.id 안에 있음  -> 이건 주소에서 가져온 값이라 String
    const targetId = Number(req.params.id);
    // 1. 숫자값이 들어왔으면 정상적으로 형변환
    // 2. 문자값이 들어왔으면 NaN이 targetId에 저장되겠네?

    //1. 정상
    // targetId를 가지고, mockPosts에서 해당하는 글(객체)를 찾아서 빈박스에 넣어야 함
    const result = mockPosts.find((value) => {
        // 첫 순회 : value = { id: 8, title: "...", content: "..."}
        // 2 순회 : value = { id: 3, title: "...", content: "..."}
        // 3 순회 : value = { id: 5, title: "...", content: "..."}
        return value.id === targetId;
    });   // 일치하는게 있으면 그 value가 반환되고, 없으면 undefined

    // 1-1. 값이 반환됬을 때
    // 1-2. 값이 없을 때

    if (!result) {
        return res.status(404).json({message: "Posts not found"})    // 에러. 404 not found
        // .json은 우리가 보내는 자바스크립트 객체를 json 형식으로 바꿔주는 일
        // 우리가 json() 안에 매개변수에 넣어준 건, 자바스크립트 객체 => jSON문법을 써서 쓰는 게 아니라, js 문법을 써서 씀
    }
    res.json({ data: result });
});


export default router;