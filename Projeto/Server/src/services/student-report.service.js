const { User, Answer } = require('../database/mysql/models');
const { bindAll } = require('../utils/helpers/context');

class ReportService {

    

    async getReportAnswer(user, res){
        let data = { 
            rightAnswer : 0,
            wrongAnswer : 0,
            totalAnswer: 0,
            rightAnswerPercent: 0,
            wrongAnswerPercent: 0
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
                data.rightAnswerPercent = ((data.rightAnswer / data.totalAnswer) || 0 ).toFixed(2) * 100 + "%";
                data.wrongAnswerPercent = ((data.wrongAnswer / data.totalAnswer) || 0 ).toFixed(2) * 100 + "%";
                res.json({ data : { ...users.dataValues, ...data } });
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