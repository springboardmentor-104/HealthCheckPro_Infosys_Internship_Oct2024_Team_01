import express from 'express';
const router = express.Router();
import {modifyQuestion,deleteQuestion,addQuestion,getQuestionsByCategory,getCategories,addCategory,deleteCategory } from '../controllers/admin.controller.js';

router.get('/categories', getCategories);
router.get('/questions/:id', getQuestionsByCategory);
router.post('/add-category', addCategory);
router.post('/add-question', addQuestion);
router.put('/modify-question/:id', modifyQuestion);
router.delete('/delete-question/:id', deleteQuestion);
router.delete('/delete-category/:id', deleteCategory);

export default router;