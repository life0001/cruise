$(function(){
    function AjaxTime(){
        $.ajax({
            url:'date.txt',
            success:function(data){
                pickerEvent.setPriceArr(eval("("+data+")"));
                pickerEvent.Init("calendar");
            },
            error:function(){}
        });
    }
    AjaxTime();
    var obj = { date: new Date(), year: -1, month: -1, priceArr:[] };
    var htmlObj = { header: "", left: "", right: "" };
    var elemId = null,t=1;
        $('#calendar').on('click','.selectMonth',function(){
            $('.monthList').show();
            return false;
        });
        $(document).on('click',function(){
            $('.monthList').hide();
        });
//选择日期
    function addEle(){
        var oDate=new Date(),
            oMonth=oDate.getMonth()+ 1,
            oMonth2=1;
        for(var j= 0;j<12; j++ ){
            $('.monthList').append('<a href="javascript:">'+oMonth2+++'月</a>');
        }
    }

    function getAbsoluteLeft(objectId) {
        var o = document.getElementById(objectId);
        var oLeft = o.offsetLeft;
        while (o.offsetParent != null) {
            oParent = o.offsetParent;
            oLeft += oParent.offsetLeft;
            o = oParent
        }
        return oLeft
    }
//获取控件上绝对位置
    function getAbsoluteTop(objectId) {
        var o = document.getElementById(objectId);
        var oTop = o.offsetTop + o.offsetHeight + 10;
        while (o.offsetParent != null) {
            oParent = o.offsetParent;
            oTop += oParent.offsetTop;
            o = oParent
        }
        return oTop
    }
//获取控件宽度
    function getElementWidth(objectId) {
        x = document.getElementById(objectId);
        return x.clientHeight;
    }
    var pickerEvent = {
        Init: function (elemid) {
            if (obj.year == -1) {
                dateUtil.getCurrent();
            }
            for (var item in pickerHtml) {
                pickerHtml[item]();
            }
            var p = document.getElementById("calendar_choose");
            if (p != null) {
                $('#calendar').empty(p);
            }
            var html = '<div id="calendar_choose" class="calendar">';
            html += htmlObj.header;
            html += '<div class="basefix clearfix" id="bigCalendar" style="display: block;">';
            html += htmlObj.left;
            html += htmlObj.right;
            //html += '<div style="clear: both;"></div>';
            html += "</div></div>";
            elemId=elemid;
            var elemObj = document.getElementById(elemid);
            $('#calendar').append(html);
            addEle();
            document.getElementById("picker_last").onclick = pickerEvent.getLast;
            document.getElementById("picker_next").onclick = pickerEvent.getNext;
            document.getElementById("backNowMonth").onclick = pickerEvent.getCurMonth;
            //document.getElementById("backNowMonth").onclick = pickerEvent.getBack;
            $('.monthList a').click(function(){
                pickerEvent.getSelect(parseInt($(this).text()))
            });
            //document.getElementById("calendar_choose").style.left = getAbsoluteLeft(elemid)+"px";
            //document.getElementById("calendar_choose").style.top  = getAbsoluteTop(elemid)+"px";
            //document.getElementById("calendar_choose").style.zIndex = 1000;
            var tds = document.getElementById("calendar_tab").getElementsByTagName("td");
            for (var i = 0; i < tds.length; i++) {
                if (tds[i].getAttribute("date") != null && tds[i].getAttribute("date") != "" && tds[i].getAttribute("price") != "-1") {
                    tds[i].onclick = function () {
                        commonUtil.chooseClick(this)
                    };
                }
            }
            // return html;
            //return elemObj;
        },
        getLast: function () {
            dateUtil.getLastDate();
            pickerEvent.Init(elemId);
        },
        getNext: function () {
            dateUtil.getNexDate();
            pickerEvent.Init(elemId);
        },
        getCurMonth:function(){
            dateUtil.getCurrent();
            pickerEvent.Init(elemId);
        },
        setPriceArr: function (arr) {
            obj.priceArr = arr;
        },
        remove: function () {
            var p = document.getElementById("calendar_choose");
            if (p != null) {
                //document.body.removeChild(p);
            }
        },
        isShow: function () {
            var p = document.getElementById("calendar_choose");
            if (p != null) {
                return true;
            }
            else {
                return false;
            }
        },
        getSelect:function(str){
            dateUtil.getSelectDate(str);
            pickerEvent.Init(elemId);
        }
    };
    var pickerHtml = {
        getHead: function () {
            var head = '<p class="thead basefix clearfix"><span class="bold">周日</span><span>周一</span><span>周二</span><span>周三</span><span>周四</span><span>周五</span><span class="bold">周六</span></tr></tbody></table><!--<li class="picker_today bold" id="picker_today">回到今天</li>--></ul>';
            htmlObj.header = head;
        },
        getLeft: function () {
            var left = '<div class="calendar_left pkg_double_month"><div class="date_text">' + obj.year + '年<br>' + obj.month + '月<div class="selectMonth"><s></s>选择月份<div class="monthList"></div></div></div>' +
                '<a href="javascript:void(0)" title="上一月" id="picker_last" class="pkg_circle_top">上一月</a>' +
                '<a href="javascript:void(0)" title="下一月" id="picker_next" class="pkg_circle_bottom ">下一月</a>' +
                '<a href="javascript:void(0)" title="返回当月" id="backNowMonth">返回当月</a>'+
                '</div>';
            htmlObj.left = left;
        },
        getRight: function (repeat) {
            var days = dateUtil.getLastDay();
            var week = dateUtil.getWeek();
            var html = '<table id="calendar_tab" class="calendar_right"><tbody>';
            var index = 0;
            for (var i = 1; i <= 42; i++) {
                if (index == 0) {
                    html += "<tr>";
                }
                var c = week > 0 ? week : 0;
                if ((i - 1) >= week && (i - c) <= days) {
                    var price = commonUtil.getPrice((i - c));
                    //var price2 = commonUtil.getdateRepeat((i - c));
                    var priceStr='',
                        classStyle='',
                        schuan='',
                        shref='',
                        scity='',
                        smonth='',
                        shot='',
                        ssale='',
                        sday='',
                        repeatDate='',
                        sCityLink='',
                        ssReturn='',
                        sCityPrice='';
                    var dt = obj.year + "-";
                    if (obj.month < 10)
                    {
                        dt += "0"+obj.month;
                    }
                    else
                    {
                        dt+=obj.month;
                    }
                    if ((i - c) < 10) {
                        dt += "-0" + (i - c);
                    }
                    else {
                        dt += "-" + (i - c);
                    }
                    if (price != -1) {
                        priceStr = "<dfn>¥</dfn>" + price.pri+'<span>起</span>';
                        classStyle = "class='on'";
                        schuan = price.sship;
                        scity = price.scity;
                        shref = 'href='+price.href+'';
                        smonth = obj.month+'月';
                        sday = '日';
                        shot=price.shot;
                        ssale=price.ssale;
                        ssReturn=price.sCityReturn;
                        sCityLink=price.sCityLink;
                        sCityPrice=price.sCityPrice;

                        repeatDate='<div class="uMore clearfix"><img src="../img/cruise_arrow02.png" class="uimgfloat"/></s><span class="uimg fl"><span>所有相关产品</span></span>';
                        //如果有重复的日期
                        //if(isRepeat){
                            //for(var g=0;g<arry.length;g++){
                            //        if(arry[g]==dt) {
                            //            console.log(arry[g])
                            //        }
                            //    }
                        //}
                    }

                    if (price != -1&&obj.year==new Date().getFullYear()&&obj.month==new Date().getMonth()+1&&i-c==new Date().getDate()) {
                        //classStyle = "class='on today'";
                    }
                    //判断今天
                    //if(obj.year==new Date().getFullYear()&&obj.month==new Date().getMonth()+1&&i-c==new Date().getDate()){
                    //    html += '<td  ' + classStyle + ' date="' + obj.year + "-" + obj.month + "-" + (i - c) + '" price="' + price.pri + '"><a '+shref+' target="_blank"><span class="date basefix">今天</span><span class="team basefix" style="display: none;">&nbsp;</span><span class="fontBlue">'+schuan+'</span><span class="fontBlue">'+scity+'</span><span class="calendar_price01">' + priceStr + '</span></a>' +
                    //    '<span class="tags">'+shot+ssale+'</span>'+
                    //    '</td>';
                    //}
                    //else{
                    //if(isRepeat){
                    //    for(var g=0;g<arry.length;g++){
                    //        //console.log(arry[g])
                    //        if(arry[g]==dt) {
                    //           ibo=true;
                    //        }
                    //    }
                    //    if(ibo){
                    //        html += '<td  ' + classStyle + ' date="' + arry[g] + '" price="' + price.pri + '"><a '+shref+' target="_blank"><span class="date basefix">' +smonth+ (i - c) + sday+'</span><span class="team basefix" style="display: none;">&nbsp;</span><span class="fontBlue">'+schuan+'</span><span class="fontBlue">'+scity+'</span><span class="calendar_price01">' + priceStr + '</span></a>' +
                    //        '<span class="tags">'+shot+ssale+'</span>'+
                    //        repeatDate+
                    //        '</td>';
                    //    }
                    //    isRepeat=false;
                    //}else{
                    //    html += '<td  ' + classStyle + ' date="' + obj.year + "-" + obj.month + "-" + (i - c) + '" price="' + price.pri + '"><a '+shref+' target="_blank"><span class="date basefix">' +smonth+ (i - c) + sday+'</span><span class="team basefix" style="display: none;">&nbsp;</span><span class="fontBlue">'+schuan+'</span><span class="fontBlue">'+scity+'</span><span class="calendar_price01">' + priceStr + '</span></a>' +
                    //    '<span class="tags">'+shot+ssale+'</span>';
                    //    '</td>';
                    //}

                    //}
                    //html += '<td  ' + classStyle + ' date="' + obj.year + "-" + obj.month + "-" + (i - c) + '" price="' + price.pri + '"><a '+shref+' target="_blank"><span class="date basefix">' +smonth+ (i - c) + sday+'</span><span class="team basefix" style="display: none;">&nbsp;</span><span class="fontBlue">'+schuan+'</span><span class="fontBlue">'+scity+'</span><span class="calendar_price01">' + priceStr + '</span></a>' +
                    //    '<span class="tags">'+shot+ssale+'</span>';
                    //    '</td>';

                    if (price.srepeat) {///////
                        html += '<td  ' + classStyle + ' date="' + obj.year + "-" + obj.month + "-" + (i - c) + '" price="' + price.pri + '"><a ' + shref + ' target="_blank"><span class="date basefix">' + smonth + (i - c) + sday + '</span><span class="team basefix" style="display: none;">&nbsp;</span><span class="fontBlue">' + schuan + '</span><span class="fontBlue">' + scity + '</span><span class="calendar_price01">' + priceStr + '</span></a>' +
                        '<span class="tags">' + shot + ssale + '</span>' +repeatDate;
                        for(var g=0;g<price.sCityReturn.length;g++){
                            html+='<p class="clearfix"><span class="uicount">'+t+++'</span><a href="'+price.sCityLink[g]+'" target="_blank">'+ price.sCityReturn[g]+'</a><span class="ujiage fontOrange">￥'+price.sCityPrice[g]+'</span>起</p>';
                        }
                        t=1;
                        html+='</div></td>';
                    }else{
                        html += '<td  ' + classStyle + ' date="' + obj.year + "-" + obj.month + "-" + (i - c) + '" price="' + price.pri + '"><a '+shref+' target="_blank"><span class="date basefix">' +smonth+ (i - c) + sday+'</span><span class="team basefix" style="display: none;">&nbsp;</span><span class="fontBlue">'+schuan+'</span><span class="fontBlue">'+scity+'</span><span class="calendar_price01">' + priceStr + '</span></a>' +
                        '<span class="tags">'+shot+ssale+'</span>';
                        '</td>';
                    }
                    if (index == 6) {
                        html += '</tr>';
                        index = -1;
                    }
                }
                else {
                    html += "<td></td>";
                    if (index == 6) {
                        html += "</tr>";
                        index = -1;
                    }
                }
                index++;
            }
            html += "</tbody></table>";
            htmlObj.right = html;
        }
    };
    var dateUtil = {
        //根据日期得到星期
        getWeek: function () {
            var d = new Date(obj.year, obj.month - 1, 1);
            return d.getDay();
        },
        //得到一个月的天数
        getLastDay: function () {
            var new_year = obj.year;
            var new_month = obj.month;
            var new_date = new Date(new_year, new_month, 1);
            return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();
        },
        getCurrent: function () {
            var dt = obj.date;
            obj.year = dt.getFullYear();
            obj.month = dt.getMonth() + 1;
            obj.day = dt.getDate();
        },
        getLastDate: function () {
            if (obj.year == -1) {
                var dt = new Date(obj.date);
                obj.year = dt.getFullYear();
                obj.month = dt.getMonth() + 1;
            }
            else {
                var newMonth = obj.month - 1;
                if (newMonth <= 0) {
                    obj.year -= 1;
                    obj.month = 12;
                }
                else {
                    obj.month -= 1;
                }
            }
        },
        getNexDate: function () {
            if (obj.year == -1) {
                var dt = new Date(obj.date);
                obj.year = dt.getFullYear();
                obj.month = dt.getMonth() + 1;
            }
            else {

                var newMonth = obj.month + 1;
                if (newMonth > 12) {
                    obj.year += 1;
                    obj.month = 1;
                }
                else {
                    obj.month += 1;
                }
            }
        },
        getSelectDate:function(str){
            obj.month=str;
            $('.monthList').hide();
        }
    };
    var commonUtil = {
        getPrice: function (day) {
            var dt = obj.year + "-";
            if (obj.month < 10)
            {
                dt += "0"+obj.month;
            }
            else
            {
                dt+=obj.month;
            }
            if (day < 10) {
                dt += "-0" + day;
            }
            else {
                dt += "-" + day;
            }
            for (var i = 0; i < obj.priceArr.length; i++) {
                if (obj.priceArr[i].Date == dt) {
                    return odata={
                        pri:obj.priceArr[i].Price.split('.')[0],
                        href:obj.priceArr[i].href,
                        sship:obj.priceArr[i].ship,
                        scity:obj.priceArr[i].City,
                        shot:obj.priceArr[i].hot,
                        ssale:obj.priceArr[i].sale,
                        sCityReturn:obj.priceArr[i].CityReturn,
                        sCityLink:obj.priceArr[i].CityLink,
                        sCityPrice:obj.priceArr[i].CityPrice,
                        srepeat:obj.priceArr[i].isRepeay
                    }
                }
            }
            return -1;
        },
        chooseClick: function (sender) {
            var date = sender.getAttribute("date");
            var price = sender.getAttribute("price");
            var el = document.getElementById(elemId);
            if (el != null) {
                el.value = date;
                //alert("日期是："+date);
                //alert("价格是：￥"+price);
                pickerEvent.remove();
            }
        }
    };

});