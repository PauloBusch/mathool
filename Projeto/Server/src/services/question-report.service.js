const { User, Question, Answer } = require('../database/mysql/models');
const { bindAll } = require('../utils/helpers/context');



class ClasstReportService {


    async getReportQuestionByIdAsync(req, res){
        const question_id = req.params.id
        await Question.findAll({
            include: [
                { 
                    as: 'users',
                    model: User
                },
                {
                    as: 'answers',
                    model: Answer
                }
            ],
            where: {
                id: question_id 
            } 
        }).then((result) => {
            res.json({data: result})
        }).catch(()=>{
            res.status(400).json('Question is not found');
        });
    }
    
    async getReportAllQuestionByStudentAsync(req, res){
        const student_id = req.params.student;
        await Question.findAll({
            include: [
                { 
                    as: 'users',
                    model: User,
                    where: {
                        id: student_id
                    }
                },
                {
                    as: 'answers',
                    model: Answer
                }
            ]
        }).then((result) => {
            res.json({data: result})
        }).catch(()=>{
            res.status(400).json('Question is not found');
        });

    }
}

module.exports = bindAll(ClasstReportService, new ClasstReportService());