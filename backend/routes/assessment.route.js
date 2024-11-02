import express from 'express';
const router = express.Router();

router.get('/:userid', (req, res) => {
    res.send('Gets all the tasked assessments for a userid: ' + req.params.userid);
});

router.get('/:userid/category/:categoryName', (req, res) => {
    res.send('Gets all the questions for a category: ' + req.params.categoryName);
});

router.post('/addQuestions/:categoryName', (req, res) => {
    res.send('Posts new questions for a category: ' + req.params.categoryName);
});

router.post('/submitAssessment/:userid', (req, res) => {
    res.send('Posts assessment for a userid: ' + req.params.userid+" and calculates the score");
});






export default router;