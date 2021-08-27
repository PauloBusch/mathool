const { User, Answer } = require('../database/mysql/models');
const { bindAll } = require('../utils/helpers/context');



class ClasstReportService {

    
    query = "SELECT u.classCode, "+
        "a.rightAnswers, "+
        "( a.rightAnswers / (a.rightAnswers + b.wrongAnswers)*100) AS rightAnswersPercent, "+
        "b.wrongAnswers, ( b.wrongAnswers / (a.rightAnswers + b.wrongAnswers)*100) AS wrongAnswersPercent, "+
        "(a.rightAnswers + b.wrongAnswers) AS totalAnswers "+
    "FROM users AS u INNER JOIN "+
        "(SELECT "+
            "userId, "+
            "classCode, "+
            "COUNT(answers.id) AS rightAnswers "+
        "FROM answers INNER JOIN users ON (users.id = answers.userId) "+
        "WHERE rightAnswer = 1 GROUP BY classCode) AS a ON (a.userId = u.id) "+
    "INNER JOIN "+
        "(SELECT "+
            "userId, "+
            "classCode, "+
            "COUNT(answers.id) AS wrongAnswers "+
        "FROM answers INNER JOIN users ON (users.id = answers.userId) "+
        "WHERE rightAnswer = 0 GROUP BY classCode) AS b ON (b.userId = u.id) "

    async getReportClassByClassCodeAsync(req, res){
        const myClassCode = req.params.classCode;
        const [results] = await Answer.sequelize.query({
            query: this.query + 'WHERE u.classCode = "' + myClassCode + '"'
        })
        res.json({data : results});
    }
    async getReportClassAsync(req, res){
        const [results] = await Answer.sequelize.query({
            query: this.query
        })
        res.json({data : results})
    }

}

module.exports = bindAll(ClasstReportService, new ClasstReportService());