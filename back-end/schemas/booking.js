const connection = require('../utils/db');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const mongooseToCsv = require('mongoose-to-csv');

const bookingSchema = new mongoose.Schema({
  roomType: String,
  sex: String,
  studentId: Number,
  passport: String,
  name: String,
  phone: String,
  email: String,
  bookingDate: Date,
  agreeStatus: String
})

bookingSchema.plugin(mongooseToCsv, {
  headers: '房间类型 姓名 性别 学号 护照号码 手机 邮箱 预计入住时间',
  constraints: {
    '房间类型': 'roomType',
    '姓名': 'name',
    '性别': 'sex',
    '学号': 'studentId',
    '护照号码': 'passport',
    '手机': 'phone',
    '邮箱': 'email'
  },
  virtuals: {
    '预计入住时间': doc => {
      if (!doc) return '';
      const date = doc.bookingDate;
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      return `${year}-${month}-${day}`;
    }
  }
});


bookingSchema.plugin(autoIncrement.plugin, 'booking');
module.exports = connection.model('booking', bookingSchema);