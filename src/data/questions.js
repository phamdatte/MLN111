// Multiple choice questions about the August Revolution
// Each question has 4 options (A, B, C, D)

export const questions = [
    // Easy questions (5)
    {
        id: 1,
        level: "easy",
        question: "Cách mạng Tháng Tám thành công vào năm nào?",
        options: [
            "A. 1940",
            "B. 1945",
            "C. 1950",
            "D. 1954"
        ],
        correctAnswer: "B"
    },
    {
        id: 2,
        level: "easy",
        question: "Ai là người đọc Tuyên ngôn Độc lập ngày 2/9/1945?",
        options: [
            "A. Võ Nguyên Giáp",
            "B. Trường Chinh",
            "C. Hồ Chí Minh",
            "D. Phạm Văn Đồng"
        ],
        correctAnswer: "C"
    },
    {
        id: 3,
        level: "easy",
        question: "Tuyên ngôn Độc lập được đọc tại quảng trường nào?",
        options: [
            "A. Quảng trường Đông Kinh Nghĩa Thục",
            "B. Quảng trường Ba Đình",
            "C. Quảng trường Lam Sơn",
            "D. Quảng trường Hồ Chí Minh"
        ],
        correctAnswer: "B"
    },
    {
        id: 4,
        level: "easy",
        question: "Nước Việt Nam Dân chủ Cộng hòa được thành lập ngày nào?",
        options: [
            "A. 19/8/1945",
            "B. 25/8/1945",
            "C. 2/9/1945",
            "D. 15/8/1945"
        ],
        correctAnswer: "C"
    },
    {
        id: 5,
        level: "easy",
        question: "Cách mạng Tháng Tám diễn ra vào tháng mấy?",
        options: [
            "A. Tháng 7",
            "B. Tháng 8",
            "C. Tháng 9",
            "D. Tháng 10"
        ],
        correctAnswer: "B"
    },

    // Medium questions (5)
    {
        id: 6,
        level: "medium",
        question: "Đại hội Đảng lần thứ VIII (tháng 5/1941) họp ở đâu?",
        options: [
            "A. Tân Trào",
            "B. Pác Bó",
            "C. Hà Nội",
            "D. Huế"
        ],
        correctAnswer: "B"
    },
    {
        id: 7,
        level: "medium",
        question: "Mặt trận Việt Minh được thành lập năm nào?",
        options: [
            "A. 1930",
            "B. 1940",
            "C. 1941",
            "D. 1945"
        ],
        correctAnswer: "C"
    },
    {
        id: 8,
        level: "medium",
        question: "Vua Bảo Đại thoái vị vào ngày nào?",
        options: [
            "A. 19/8/1945",
            "B. 23/8/1945",
            "C. 25/8/1945",
            "D. 2/9/1945"
        ],
        correctAnswer: "C"
    },
    {
        id: 9,
        level: "medium",
        question: "Cuộc Tổng khởi nghĩa giành chính quyền bắt đầu từ thành phố nào?",
        options: [
            "A. Sài Gòn",
            "B. Huế",
            "C. Hà Nội",
            "D. Đà Nẵng"
        ],
        correctAnswer: "C"
    },
    {
        id: 10,
        level: "medium",
        question: "Tên gọi đầy đủ của Việt Minh là gì?",
        options: [
            "A. Việt Nam Cách mạng Đồng minh",
            "B. Việt Nam Độc lập Đồng minh",
            "C. Việt Nam Giải phóng Đồng minh",
            "D. Việt Nam Dân chủ Đồng minh"
        ],
        correctAnswer: "B"
    },

    // Hard questions (5)
    {
        id: 11,
        level: "hard",
        question: "Hội nghị nào quyết định phát động Tổng khởi nghĩa?",
        options: [
            "A. Hội nghị Pác Bó",
            "B. Hội nghị Tân Trào",
            "C. Hội nghị Toàn quốc",
            "D. Đại hội VIII"
        ],
        correctAnswer: "C"
    },
    {
        id: 12,
        level: "hard",
        question: "Đội Việt Nam Tuyên truyền Giải phóng quân được thành lập ngày nào?",
        options: [
            "A. 19/5/1941",
            "B. 22/12/1944",
            "C. 15/8/1945",
            "D. 2/9/1945"
        ],
        correctAnswer: "B"
    },
    {
        id: 13,
        level: "hard",
        question: "Ai là Tổng tư lệnh Quân đội Giải phóng Việt Nam đầu tiên?",
        options: [
            "A. Hồ Chí Minh",
            "B. Trường Chinh",
            "C. Võ Nguyên Giáp",
            "D. Hoàng Văn Thái"
        ],
        correctAnswer: "C"
    },
    {
        id: 14,
        level: "hard",
        question: "Hội nghị Tân Trào diễn ra từ ngày nào đến ngày nào?",
        options: [
            "A. 10-12/8/1945",
            "B. 13-15/8/1945",
            "C. 16-18/8/1945",
            "D. 19-21/8/1945"
        ],
        correctAnswer: "B"
    },
    {
        id: 15,
        level: "hard",
        question: "Ủy ban Dân tộc Giải phóng Việt Nam được thành lập tại hội nghị nào?",
        options: [
            "A. Hội nghị Pác Bó",
            "B. Đại hội VIII",
            "C. Hội nghị Tân Trào",
            "D. Hội nghị Toàn quốc"
        ],
        correctAnswer: "C"
    }
];

// Get random question by difficulty level, excluding already used questions
export const getRandomQuestion = (level, usedQuestionIds = []) => {
    const filteredQuestions = questions.filter(
        q => q.level === level && !usedQuestionIds.includes(q.id)
    );

    // If no questions left, reset and use all questions of this level
    if (filteredQuestions.length === 0) {
        const allLevelQuestions = questions.filter(q => q.level === level);
        const randomIndex = Math.floor(Math.random() * allLevelQuestions.length);
        return allLevelQuestions[randomIndex];
    }

    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    return filteredQuestions[randomIndex];
};
