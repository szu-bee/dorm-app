const connection = require('../utils/db');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const mongooseToCsv = require('mongoose-to-csv');

const livingSchema = new mongoose.Schema({
  room: String,
  name: String,
  sex: String,
  country: String,
  eduBackground: String,
  passport: String,
  studentId: String,
  regiDate: String,
  visaId: String,
  visaDue: String,
  bookRemark: String,
  deposit: String,
  paymentRecord: String,
  endTime: String,
  phone: String
});

livingSchema.plugin(mongooseToCsv, {
  headers: '房号 姓名 性别 国籍 学历 护照号码 学号 最新注册时间 签证编号 签证期限 交换学生预订 押金 交费记录 时间 手机',
  constraints: {
    '房号': 'room',
    '姓名': 'name',
    '性别': 'sex',
    '国籍': 'country',
    '学历': 'eduBackground',
    '护照号码': 'passport',
    '学号': 'studentId',
    '最新注册时间': 'regiDate',
    '签证编号': 'visaId',
    '签证期限': 'visaDue',
    '交换学生预订': 'bookRemark',
    '押金': 'deposit',
    '交费记录': 'paymentRecord',
    '时间': 'endTime',
    '手机': 'phone'
  }
});


livingSchema.plugin(autoIncrement.plugin, 'living');
module.exports = connection.model('living', livingSchema);