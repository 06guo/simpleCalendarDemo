(function () {
    var datepicker = {}
    var dataArray = [] // 用来存放输入框中的信息
    var minData = '' // 传入的最小日期
    var maxData = '' // 传入的最大日期
    var minDataArray = []
    var maxDataArray = []

    var datepicker = {}
    datepicker.getMonthData = function (year, month) {
        // 用来保存月份日期
        var dayArray = []
        // 获取年月日
        if (!year || !month) {
            var today = new Date()
            year = today.getFullYear()
            month = today.getMonth() + 1

        }
        console.log(year, month, 111111)
        // 判断第一天是星期几
        var firstDay = new Date(year, month-1, 1)
        var currentWeekDay = firstDay.getDay()
        // 判断月份最后一天是星期几，由此根据，需要前一个月份和后一个月份要补的天数是多少
        var finalDay = new Date(year, month, 0)
        var finalWeekDay = finalDay.getDay()
        console.log(currentWeekDay, finalWeekDay, 22222)

        // 获取月份有多少天,前一个月份有多少天，后一个月份有多少天
        var totalDay = new Date(year, month, 0).getDate()
        var beforeTotalDay = new Date(year, month-1, 0).getDate()
        var nextTotalDay = new Date(year, month+1, 0).getDate()
        console.log(new Date(year, month-1, 0),beforeTotalDay, totalDay, nextTotalDay, 3333)

        // 极端情况有6周，最少有4周，按照6周计算
        for (var i = 0; i < 7*6; i++) {
            var preDay = +beforeTotalDay + i - currentWeekDay + 1
            var showDay
            var thisMonth
            var thisYear
            var weekDay
            var isOut = false
            thisYear = year
            if (preDay <= beforeTotalDay) {
                // 获取显示前一个月份的天
                showDay = preDay
                isOut = true
                thisMonth = month - 1
                if (thisMonth === 0) {
                    thisMonth = 12
                    thisYear = year - 1
                }
            } else {
                // 获取月份正常显示的天
                showDay = i - currentWeekDay + 1
                thisMonth = month
                if (showDay > totalDay) {
                    // 如果显示天数大于该月份天数，表示是下一个月
                    // 获取显示下一个月份的天
                    showDay = showDay - totalDay
                    thisMonth = month  + 1
                    isOut = true
                    if (thisMonth === 13) {
                        thisMonth = 1
                        thisYear = year + 1
                    }
                }
            }
            weekDay = new Date(thisYear, thisMonth - 1, showDay).getDay()
            dayArray.push({
                year: thisYear,
                month: thisMonth,
                day: showDay,
                weekDay: weekDay,
                isOut: isOut
            })
        }
        console.log(dayArray, 44444)
        return {
            year: year,
            month: month,
            dayArray: dayArray
        }
    }
    var monthData
    // 把html添加到页面
    datepicker.buildUi = function (year, month) {
        monthData = datepicker.getMonthData(year, month)
        console.log(monthData, dataArray, 201901021)
        var html = '<div class="g-calendar-head">' +
            '<a href="#" class="g-calendar-preYear" />' +
            '<a href="#" class="g-calendar-preMonth" />' +
            '<a href="#" class="g-calendar-nextMonth" />' +
            '<a href="#" class="g-calendar-nextYear"></a>' +
            '<span>' + monthData.year + '-' + monthData.month + '</span>' +
            '</div>' +
            '<div class="g-calender-body">' +
            '<table>' +
            '<tr>' +
            '<th>日</th>' +
            '<th>一</th>' +
            '<th>二</th>' +
            '<th>三</th>' +
            '<th>四</th>' +
            '<th>五</th>' +
            '<th>六</th>' +
            '</tr>'
        console.log(html, 123)
        for (var i = 0; i < monthData.dayArray.length; i++) {
            if (i % 7 === 0) {
                html += '<tr>'
            }
            console.log(dataArray[1], monthData.month, 'monthData.month')
            if (monthData.dayArray[i].isOut) {
                // isOut为true，表示超过了当前月份的天数，则添加置灰样式
                if (dataArray.length > 0 && +monthData.dayArray[i].day === +dataArray[2] && +monthData.dayArray[i].month === +dataArray[1] ) {
                    // 判断输入框原来选择的天数和月份跟循环的td的天数是 同一天，则添加选中样式
                    html += '<td class="g-calendar-td-gray g-calendar-td-common g-calender-td-select" data-realMonth="' + monthData.dayArray[i].month + '">' + monthData.dayArray[i].day + '</td>'
                } else {
                    html += '<td class="g-calendar-td-gray g-calendar-td-common" data-realMonth="' + monthData.dayArray[i].month + '">' + monthData.dayArray[i].day + '</td>'
                }
            } else {
                if (dataArray.length> 0 && +monthData.dayArray[i].day === +dataArray[2] && +monthData.dayArray[i].month === +dataArray[1]) {
                    // 判断输入框原来选择的天数和月份跟循环的td的天数是 同一天，则添加选中样式
                    html += '<td class="g-calendar-td-common g-calender-td-select" data-realMonth="' + monthData.dayArray[i].month + '">' + monthData.dayArray[i].day + '</td>'
                } else {
                    html += '<td class="g-calendar-td-common" data-realMonth="' + monthData.dayArray[i].month + '">' + monthData.dayArray[i].day + '</td>'
                }
            }
            var tdList = document.querySelectorAll('.g-calendar-td-common')
            var lastTd = tdList[i]
            console.log(lastTd, 'lastTd')
            if (i % 7 === 6) {
                html += '</tr>'
            }
        }
        html += '</table>' +
            '<div class="g-calendar-operationBg">' +
            '<button class="g-calendar-operationBtn g-calendar-operationBtn-confirm">确定</button>' +
            '<button class="g-calendar-operationBtn g-calendar-operationBtn-clear">清除</button>' +
            '</div>' +
            '</div>'
        return html
    }
    var bgDom
    datepicker.create = function(direction) {
        var year, month
        if (monthData) {
            year = monthData.year
            month = monthData.month
        }
        if (direction === 'g-calendar-preMonth') month--
        if (direction === 'g-calendar-nextMonth') month++
        if (direction === 'g-calendar-preYear') year--
        if (direction === 'g-calendar-nextYear') year++
        bgDom = document.querySelector('.g-calendar-bg')
        if (!bgDom) {
            bgDom = document.createElement('div')
            bgDom.className = 'g-calendar-bg'
            document.body.appendChild(bgDom)
        }
        bgDom.innerHTML = datepicker.buildUi(year, month)
        // 给不符合范围的日期样式
        for (var i = 0; i < monthData.dayArray.length; i++) {
            var tdList = document.querySelectorAll('.g-calendar-td-common')
            var lastTd = tdList[i]
            if (lastTd) {
                var tdString = monthData.dayArray[i].year + '' + (monthData.dayArray[i].month < 10 ? '0' + monthData.dayArray[i].month : monthData.dayArray[i].month) + '' + (monthData.dayArray[i].day < 10 ? '0' + monthData.dayArray[i].day : monthData.dayArray[i].day)
                var minString = minDataArray[0] + '' + (minDataArray[1] < 10 ? '0' + minDataArray[1] : minDataArray[1]) + '' + (minDataArray[2] < 10 ? '0' + minDataArray[2] : minDataArray[2])
                var maxString = maxDataArray[0] + '' + (maxDataArray[1] < 10 ? '0' + maxDataArray[1] : maxDataArray[1]) + '' + (maxDataArray[2] < 10 ? '0' + maxDataArray[2] : maxDataArray[2])
                if (+tdString < +minString || +tdString > +maxString) {
                    lastTd.classList.add('g-calendar-table-disable')
                }
            }
        }
    }
    // 初始化布局
    datepicker.init = function(element, min, max) {
        var pageDom = document.querySelector(element) // 获取输入框
        minData = min
        maxData = max
        minDataArray = min ? min.split('-') : []
        maxDataArray = max ? max.split('-') : []
        datepicker.create()
        bgDom.classList.add('g-calendar-none')
        var isClick = false
        // 点击输入框，来判断显示还是隐藏日历组件
        pageDom.addEventListener('click', function(e) {
            dataArray = pageDom.value.split('-') // 获取输入框中显示的信息
            if (dataArray.length > 0 && (dataArray[0] !== monthData.year || dataArray[1] !== monthData.month)) {
                monthData.year = dataArray[0]
                monthData.month = dataArray[1]
                datepicker.create(dataArray[0], dataArray[1])
            }
            if (isClick) {
                bgDom.classList.add('g-calendar-none')
                isClick = false
            } else {
                bgDom.classList.remove('g-calendar-none')
                isClick = true
                var height = pageDom.offsetHeight
                var top = pageDom.offsetTop
                var left = pageDom.offsetLeft
                bgDom.style.top = top + height + 2 + 'px'
                bgDom.style.left = left + 'px'
            }
            e.stopPropagation()
        })
        var selectDay
        bgDom.addEventListener('click', function (event) {
            var e = event.target
            console.log(e, 121212)
            if (e.classList.contains('g-calendar-preMonth')) {
                // 上一个月
                datepicker.create('g-calendar-preMonth')
            } else if (e.classList.contains('g-calendar-nextMonth')) {
                // 下一个月
                datepicker.create('g-calendar-nextMonth')
            } else if (e.classList.contains('g-calendar-preYear')) {
                // 上一年
                datepicker.create('g-calendar-preYear')
            } else if (e.classList.contains('g-calendar-nextYear')) {
                // 下一年
                datepicker.create('g-calendar-nextYear')
            } else if (e.tagName.toLowerCase() === 'td') {
                // 选中日期，添加选中样式
                var selectTd = document.querySelector('.g-calender-td-select')
                console.log(selectTd, 234)
                selectDay = e.innerHTML
                if (!selectTd && !e.classList.contains('g-calendar-table-disable')) {
                    console.log(e, 'selecttd')
                    e.classList.add('g-calender-td-select')
                } else {
                    removeSelectClass()
                    if (!e.classList.contains('g-calendar-table-disable')) {
                        e.classList.add('g-calender-td-select')
                    }
                }
            } else if (e.tagName.toLowerCase() === 'button' && e.classList.contains('g-calendar-operationBtn-confirm')) {
                // 确定
                var realMonth = document.querySelector('.g-calender-td-select')
                pageDom.value = monthData.year + '-' + realMonth.dataset.realmonth + '-' + selectDay
                isClick = false
                bgDom.classList.add('g-calendar-none')
            } else if (e.tagName.toLowerCase() === 'button' && e.classList.contains('g-calendar-operationBtn-clear')) {
                // 清除
                pageDom.value = ''
                isClick = false
                bgDom.classList.add('g-calendar-none')
            }
            event.stopPropagation()
        })
        // 点击空白地方，日历弹框消失
        document.body.addEventListener('click', function (e) {
            bgDom.classList.add('g-calendar-none')
            // bgDom.classList.add('g-calendar-none-animation')
            isClick = false
        })
    }
    // 移除选中的所有样式方法
    function removeSelectClass() {
       var list =  document.getElementsByClassName('g-calendar-td-common')
        console.log(list)
        for (var i = 0; i < list.length; i++) {
            list[i].classList.remove('g-calender-td-select')
        }
    }
    window.datepicker = datepicker
})()
