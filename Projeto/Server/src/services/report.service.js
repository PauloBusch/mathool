const { User, Answer } = require('../database/mysql/models');
const { bindAll } = require('../utils/helpers/context');

class ReportService {

    

    async getReportAnswer(user, res){
        let data = { 
            rightAnswer : null,
            wrongAnswer : null,
            totalAnswer: null,
            rightAnswerPercent: null,
            wrongAnswerPercent: null
        };
        let users = await User.findOne({
            attributes: ['id','name', 'classCode'],
            where: {
                id: user
            } 
        });
        await Answer.count(  {
            where: { userId: user, rightAnswer: true}
        })
        .then((cont) => {  
            data.rightAnswer = cont; 
            Answer.count({
                where: { userId: user, rightAnswer: false}
            })
            .then((cont)=> { 
                data.wrongAnswer = cont; 
                data.totalAnswer = data.rightAnswer + data.wrongAnswer;
                data.rightAnswerPercent = (data.rightAnswer / data.totalAnswer * 100).toFixed(2);
                data.wrongAnswerPercent = (data.wrongAnswer / data.totalAnswer * 100).toFixed(2);
                res.json({ ...users.dataValues, ...data });
            });
        });
    }

    async getReportAnswerByMyUserAsync(req, res){
        this.getReportAnswer(req.user.id, res)  
    }
    async getReportAnswerByUserIdAsync(req, res){
        this.getReportAnswer(req.params.id, res )  
    }

}

module.exports = bindAll(ReportService, new ReportService());