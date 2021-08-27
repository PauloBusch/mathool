const { User, Answer } = require('../database/mysql/models');
const { bindAll } = require('../utils/helpers/context');

class ReportService {

    query = "SELECT u.name, "+
            "u.classCode, "+
            "a.rightAnswer, "+
            "( a.rightAnswer / (a.rightAnswer + b.wrongAnswer)*100) AS rightAnswerPercent, "+
            "b.wrongAnswer, "+"( b.wrongAnswer / (a.rightAnswer + b.wrongAnswer)*100) AS wrongAnswerPercent, "+
            "(a.rightAnswer + b.wrongAnswer) AS totalAnswer "+
        "FROM users AS u "+
        "INNER JOIN "+
            "(SELECT users.name, "+
                "userId, "+
                "classCode, "+
                "COUNT(answers.id) AS rightAnswer "+
            "FROM answers "+
            "INNER JOIN users ON (users.id = answers.userId) "+
            "WHERE rightAnswer = 1 GROUP BY name) AS a ON (a.userId = u.id) "+
        "INNER JOIN "+
            "(SELECT users.name, "+
                "userId, "+
                 "classCode, "+
                 "COUNT(answers.id) AS wrongAnswer "+
            "FROM answers "+
            "INNER JOIN users ON (users.id = answers.userId) "+
            "WHERE rightAnswer = 0 GROUP BY name) AS b ON (b.userId = u.id) "
  

    async getReportAnswerByIdAsync(user, res){
        const newQuery = this.query + "WHERE u.id = :uid"
        let [ result] = await Answer.sequelize.query(newQuery, { 
            
            replacements: { uid: user },
        });
        res.json({data : result})
    }
    async getReportAllAnswerAsync(res){
        let [ result] = await Answer.sequelize.query(this.query);
        res.json({data : result})
    }

    async getReportAnswerByMyUserAsync(req, res){
        this.getReportAnswerByIdAsync(req.user.id, res)  
    }
    async getReportAnswerByUserIdAsync(req, res){
        const params = req.params.id;
        (params == "x") ? 
            this.getReportAllAnswerAsync(res) :
            this.getReportAnswerByIdAsync(params, res)  
    }

}

module.exports = bindAll(ReportService, new ReportService());