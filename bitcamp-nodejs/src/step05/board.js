// 주제 : DAO 모듈 만들기

const mysql = require('mysql')
const express = require('express')
const Router = express.Router();
const memberdao = require('./memberdao')

var pool = mysql.createPool({
    connectionLimit : 10, // 접속자 수
    host: '13.125.254.147', 
    //port: '3306',
    database: 'studydb',
    user: 'study',
    password: '1111'
});

memberdao.setConnectionPool(pool);


// get 요청에 대해 핸들러를 등록하기! (post요청은 post)
Router.get('/list', (req, res) => {
    
    var pageNo = 1;
    var pageSize = 3;
    
    if(req.query.pageNo){
        pageNo = parseInt(req.query.pageNo)
    }
    if(req.query.pageSize){
        pageSize = parseInt(req.query.pageSize)
    }
    
    memberdao.list(pageNo, pageSize, (err, results) => {
        
        if (err){
            res.end('DB 조회 중 예외 발생!')
            return;
        }
        
        for (var row of results) {
            res.write(`${row.email}, ${row.mid}\n`);
        }
        res.end(); 
        
    });
})
Router.get('/add', (req, res) => {
    
    res.writeHead(200,{'Content-Type' : 'text/plain;charset=UTF-8'})
   
    memberdao.add(req.query, (err, result) => {
        
        if (err){
            res.end('DB 조회 중 예외 발생!')
            return;
        }
        res.end('가입이 완료 됐습니다!'); 
    })
    
})
Router.get('/update', (req, res) => {
    
    res.writeHead(200,{'Content-Type' : 'text/plain;charset=UTF-8'})

    memberdao.update(req.query, (err,result) => {
        
        if (err){
            res.end('DB 조회 중 예외 발생!')
            return;
        }
        res.end('변경 성공입니다!'); 

    })
    
})
Router.get('/delete', (req, res) => {
    
    res.writeHead(200,{'Content-Type' : 'text/plain;charset=UTF-8'})
    
    memberdao.remove(req.query , (err, result) => {
        
        if (err){
            res.end('DB 조회 중 예외 발생!')
            return;
        }
        console.log(result);
        
        res.end('삭제성공입니다!'); 
    })
    
})

module.exports = Router;