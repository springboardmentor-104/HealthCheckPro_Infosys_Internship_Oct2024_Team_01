import express from 'express';
const router = express.Router();
import {modifyQuestion,deleteQuestion,addQuestion,getQuestionsByCategory,getCategories,addCategory } from '../controllers/assessment.controller.js';

router.get('/categories', getCategories);
router.get('/questions/:id', getQuestionsByCategory);
router.post('/add-category', addCategory);
router.post('/add-question', addQuestion);
router.put('/modify-question/:id', modifyQuestion);
router.delete('/delete-question/:id', deleteQuestion);

export default router;