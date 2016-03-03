$(function(){
   var $SliderNav=$('.SliderNav a'),
       $SliderHeaderImg=$('.SliderHeaderImg a'),
       oTimer,
       iDelay=5000,
       iCount=0;
    var $searchLi=$('.cruiseSearchMain li'),
        $xsthLI=$('.xsthSlider li'),
        $xsthUI=$('.xsthSlider ul'),
        iLiMGL=parseInt($xsthLI.eq(1).css('margin-left')),
        iLength=Math.floor($xsthLI.length/4),
        iUlWidth=($xsthLI.outerWidth()+iLiMGL)*$xsthLI.length-iLiMGL,
        setTime=$('.CountdownTime').eq(0).attr('date'),
        setTimePath=setTime.split(','),
        iMax=iLength,
        $Ul=$('.ulBox ul'),
        $Li=$('.ulBox li'),
        iLisize=$Li.length,
        inumMax=iLisize/2-1,
        iliWidth=parseInt($Li.css('width')),
        $dateA=$('.departure a'),
        $dateB=$('.pcfrq'),
        sMonth='3月';
        $('img').lazyload({
            effect:"fadeIn"
        });
    //轮播 点击小图标
    $('.SliderNav').on('click','a',function(){
        var iIndex=$(this).index();
        if(iCount==iIndex) return;
        iCount=iIndex;
        move();
    });
    //轮播动作
    function move(){
        if(iCount>$SliderNav.length-1) iCount=0;
        $SliderNav.eq(iCount).addClass('cur').siblings().removeClass('cur');
        $SliderHeaderImg.hide().eq(iCount).fadeIn().css("display","block");
    }
    //自动轮播
    function autoPlay(){
        iCount++;
        move();
    }
    //轮播开始
    function headerSliderStart(){
        oTimer=setInterval(autoPlay,iDelay);
    }
    headerSliderStart();
    //轮播结束
    function headerSliderStop(){
        clearInterval(oTimer);
    }
    $('.cruiseSlider').hover(headerSliderStop,headerSliderStart);

    $('.hideBoxTit').on('click','a',function(){
        $(this).addClass('cur').siblings().removeClass('cur').parents('.cruise_hideContent').find('.hideBoxTabs').removeClass('on').eq($(this).index()).addClass('on');
    });

    $searchLi.on('click','.TabsBoxlist a',function(){
        $(this).parents('.cruise_hideBox').prev().val($(this).text());
    });

    (function timer() {
        var ts = (new Date(setTimePath[0],setTimePath[1]-1,setTimePath[2],setTimePath[3],setTimePath[4])) - (new Date());//计算剩余的毫秒数
        var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
        var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
        var mm = parseInt(ts / 1000 / 60 % 60, 10);//计算剩余的分钟数
        var ss = parseInt(ts / 1000 % 60, 10);//计算剩余的秒数
        dd = checkTime(dd);
        hh = checkTime(hh);
        mm = checkTime(mm);
        ss = checkTime(ss);
        var d1=dd.toString().substr(0,1),
            d2=dd.toString().substr(1,1),
            h1=hh.toString().substr(0,1),
            h2=hh.toString().substr(1,1),
            m1=mm.toString().substr(0,1),
            m2=mm.toString().substr(1,1),
            s1=ss.toString().substr(0,1),
            s2=ss.toString().substr(1,1);
        if(s2=='-'){
            return;
        }
        $('.CountdownTime').html(
            '<span>'+d1+'</span>'+'<span>'+d2+'</span>'+"<em></em>"
            +'<span>'+h1+'</span>'+'<span>'+h2+'</span>'+"<em></em>"
            +'<span>'+m1+'</span>'+'<span>'+m2+'</span>'+"<em></em>"
            +'<span>'+s1+'</span>'+'<span>'+s2+'</span>'
        );
        setTimeout(timer,500);
    })();
    function checkTime(i){
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    (function init(){
        $xsthUI.width(iUlWidth);
        $Ul.width(iliWidth*iLisize);
        $('.icountAll').text(iLisize/2);
        setDate();
        $('.pcfrq label').text(new Date().getFullYear()+'年');
        setDate($dateB);
    })();
    //设置年月
    function setDate(ele){
        var date=new Date(),
            year=date.getFullYear(),
            month=date.getMonth()+ 1;
        if(ele==undefined) {
            for(var i= 0,len=$dateA.length; i<len; i++){
                if(month>12){
                    month=1;
                    year++;
                    $dateA.eq(i).addClass('fontBlue');
                }
                $dateA[i].innerHTML=year+'年'+month+++'月';
            }
        }else{
            for(var j= 0,len2=12-month; j<=len2; j++ ){
                ele.append('<a href="javascript:">'+month+++'月</a>');
            }
            setIcon(sMonth);
        }
    }
    //设置图标
    function setIcon(str){
        var $ele=$dateB.find('a');
        for(var i= 0,len=$ele.length; i<len; i++){
            if($ele.eq(i).text()==str) $ele.eq(i).addClass('hot');
        }
    }

    function Move(ele,target,max,eleText){
        this.ele=ele;
        this.target=target;
        this.max=max;
        this.eleText=eleText;
        this.index=0;
        this.doCount=function(){
            this.eleText.text(this.index+1)
        }
    }
    Move.prototype={
        toPrev:function(){
            if(this.index==0) return;
            this.ele.stop().animate({left:this.target*--this.index})
        },
        toNext:function(){
            if(this.index==this.max) return;
            this.ele.stop().animate({left:this.target*++this.index})
        }
    };

    var xsth=new Move($xsthUI,-(1200+iLiMGL),iMax),moreCruise=new Move($Ul,-iliWidth*2,inumMax,$('.icount'));

    $('.xsthPrev').click(function(){
        xsth.toPrev()
    });
    $('.xsthNext').click(function(){
        xsth.toNext()
    });

//    邮轮公司
    $('.cruiseBox').on('click','.blueTit a',function(){
        $(this).addClass('cur').siblings().removeClass('cur').parent().nextAll('.cruiseCompanyTabs').removeClass('on').eq($(this).index()).addClass('on');
    });

    $('.morePrev').click(function(){
        moreCruise.toPrev();
        moreCruise.doCount();
    });
    $('.moreNext').click(function(){
        moreCruise.toNext();
        moreCruise.doCount();
    });
//    邮轮公司鼠标交互
    $('.CompanyTabsRight').on('mouseenter mouseleave','a',function(e){
        if(e.type=='mouseenter'){
            $(this).find('span').stop().animate({bottom:0})
        }else{
            $(this).find('span').stop().animate({bottom:-62})
        }
    });
//    常见问题
    $('.uddulQANav').on('click','a',function(){
        var nindex=$(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.uddulQATABS').removeClass('on').eq(nindex).addClass('on');
    })
});
