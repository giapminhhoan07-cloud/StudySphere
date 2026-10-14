import test from "node:test";
import assert from "node:assert/strict";

import { analyzeResultWeakness } from "../public/backup/js/result.js";

test("detects the weakest knowledge area from incorrect and unanswered questions", () => {
  const questions = [
    { id: "q1", difficultyName: "Nhận biết", correctAnswer: 0 },
    { id: "q2", difficultyName: "Thông hiểu", correctAnswer: 1 },
    { id: "q3", difficultyName: "Vận dụng", correctAnswer: 2 },
    { id: "q4", difficultyName: "Vận dụng", correctAnswer: 3 },
    { id: "q5", difficultyName: "Vận dụng", correctAnswer: 1 },
    { id: "q6", difficultyName: "Vận dụng", correctAnswer: 0 },
  ];

  const answers = [0, 2, null, 0, 2, null];
  const analysis = analyzeResultWeakness(questions, answers);

  assert.equal(analysis.weakest.label, "Vận dụng");
  assert.equal(analysis.weakest.weakCount, 4);
  assert.ok(analysis.summary.toLowerCase().includes("vận dụng"));
  assert.ok(analysis.breakdown.some((item) => item.label === "Vận dụng" && item.weakCount === 4));
});
