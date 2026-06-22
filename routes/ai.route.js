const router = require("express").Router();
const { askAI, summarize,
    quiz,
    explain } = require("../controllers/ai.controller");
const protect = require("../middleware/auth.middleware");

const rateLimit = require("express-rate-limit");


const aiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message: {
        message: "Too many AI requests. Try again later."
    }
});


router.post(
    "/ask",
    protect,
    aiLimiter,
    askAI
);
router.post(
    "/summarize",
    protect,
    aiLimiter,
    summarize
);


router.post(
    "/quiz",
    protect,
    aiLimiter,
    quiz
);


router.post(
    "/explain",
    protect,
    aiLimiter,
    explain
);



module.exports = router;