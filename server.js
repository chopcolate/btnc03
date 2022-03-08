const express = require('express')
const app = express()

const router = express.Router()
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    initValues = {
        num1: '',
        num2: '',
        result: '',
        notify: '',
        calc: '',
    }
    res.render('index', initValues)
})

const checkValid = (string) => {
    let isnum = /^\d+$/.test(string);
    return isnum
}

app.post('/', (req, res) => {
    let data = req.body
    if (!checkValid(data.num1)) {
        data.notify = `Giá trị nhập ở ô số thứ nhất không phải là số`
        data.result = ''
    }
    else if (!checkValid(data.num2)) {
        data.notify = `Giá trị nhập ở ô số thứ hai không phải là số`
        data.result = ''
    }
    else if (!data.calc)
    {
        data.notify = `Chưa chọn phép tính`
        data.result = ''
    }
    else {
        data.notify = ''
        switch (data.calc) {
            case '+':
                data.result = Number(data.num1) + Number(data.num2)
                break;
            case '-':
                data.result = Number(data.num1) - Number(data.num2)
                break;
            case '*':
                data.result = Number(data.num1) * Number(data.num2)
                break;
            case '/':
                data.result = Number(data.num1) / Number(data.num2)
                break;
        }
        data.result = String(data.result)
    }
    res.render('index', data)
})

app.listen(3000)