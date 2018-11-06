$(function () { 
    //current date
    var d = new Date();
    var strDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-0" + d.getDate();
    //alert(strDate);
    //curent time
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
//    alert(dt.getHours());
    $('.search-form__current-time').text(time);
    
    //now in cinema
    $('<span class="nowInCinema"/>').text('Сгодня в кино').appendTo('tr[datetime="' + strDate + '"] > .table__date');
    
    //alert(strDate);
    //Header hover effect by poster
    $('#posters .table__header-link').mouseover(function () {
        var ChoosePoster = $(this).attr('data-name');
        $('.names .table__header-link[id="' + ChoosePoster + '"]').addClass(' jshover');
    });
    //Header hover effect out by poster
    $('#posters .table__header-link').mouseout(function () {
        $('.names .table__header-link').removeClass(' jshover');
    });
    //Hover effect to poster by title
    $('.names .table__header-link').mouseover(function () {
        var ChooseTitle = $(this).attr('id');
        $('#posters .table__header-link[data-name="' + ChooseTitle + '"]').addClass(' poster-JShover');
    });
    //Hover effect out by title
    $('.names .table__header-link').mouseout(function () {
        $('#posters .table__header-link').removeClass(' poster-JShover');
    });
    //choose date
    $('.search-form__input').on('change', function () {
        $('tbody tr').removeClass(' dnone');
        var DateNum = $('[name="calendar"]').val();
        $('#table tbody tr:not([datetime="' + DateNum + '"])').addClass('dnone');
    });
    //modal
    $('.table__time-item').on('click', function () {
        $(this).preventDefault;
        $('.modal tr td').removeClass('booked');
        $('.modal__row').empty();
        $('.modal__seat').empty();
        $('.number-ticets, .cost, .sum').empty();
        $('.modal, .pre-modal').css('display', 'block');
    });
    //modal-close
    $('.modal-close, .pre-modal').on('click', function () {
        $('.modal, .pre-modal').css('display', 'none');
    });
    //Find theader for td
    $('td').on('click', 'a.table__time-item', function () {
        var $mdate = $(this).closest('tr').find('.table__date > .table__current-time').text();
        $('.modal__seanse-date').text($mdate);
        $('.modal .table__time-item').removeClass(' dnone');
        var $timeIndex = $(this).index();
        $('.modal .table__time-item').eq($timeIndex).addClass(' dnone');
        var $curTime = $(this).text();
        $('.modal__seanse-time').text($curTime);
        var $column = $(this).closest('td').index();
        var $jqtd = $('tr.names td').eq($column);
        var $title = $($jqtd).children("a").text();
        $('.modal__title').text($title);
        $('.modal__other-seanse').on('click', 'a.table__time-item', function(){
            console.log("ok");
            
                    var x = $(this).closest('.table__seanse-times').html();
        //alert(x);
        $('.modal__other-seanse').html(x);
            
        });
        
        $('.modal .table__time-item').on('click', function(){
            $('.table__time-item').removeClass('dnone');
            $(this).addClass("dnone");
            var newSeanseTime = $(this).text();
            $('.modal__seanse-time').text(newSeanseTime);
            //alert($(this).text());
        });
    });

    var messageLimit = "Один человек может забронировать 10 мест";

    $('.modal tr td').on('click', function(){
        if($(this).is('.booked') === false){               
        if($('.modal__row').children().length < 10){
            $(this).toggleClass('booked');
            var seat = $(this).find('span').attr('data-id');
            var row = $(this).closest('tr').attr('data-row');
            var sumId = row + seat;
                
            //Get sum for tickets
               
            var cost = 150
            var ticketsNumber = $('.modal__seat').children().length + 1;
            var tickeSum = ticketsNumber * cost;
            $('.number-ticets').text(ticketsNumber + ' X');
            $('.cost').text(cost + ' руб =');
            $('.sum').text(tickeSum + ' руб');
            
            //show button for buying
            $('button.endBuy').removeClass(' dnone');
                
            $('<span class="el"/>').attr('data-id', sumId).text(seat).appendTo('.modal__seat');
            $('<span class="elr"/>').attr('data-id', sumId).text(row).appendTo('.modal__row');
            
                } else {
                    
         $('.modal__message').text(messageLimit);                
    };
        } else {
            
        $(this).removeClass('booked');  
        $('.modal__message').text("");
        var seat = $(this).find('span').attr('data-id');
        var row = $(this).closest('tr').attr('data-row');
        var sumId = row + seat;
        $('.el[data-id="' + sumId + '"]').remove();
        $('.elr[data-id="' + sumId + '"]').remove();
                    var cost = 150
            var ticketsNumber = $('.modal__seat').children().length;
            var tickeSum = ticketsNumber * cost;
            $('.number-ticets').text(ticketsNumber + ' X');
            $('.cost').text(cost + ' руб =');
            $('.sum').text(tickeSum + ' руб');
             if(ticketsNumber === 0){
                 $('button.endBuy').addClass(' dnone');
                 $('.number-ticets, .cost, .sum').empty();
           } 
            };
    });
    
    $('td.engaged, .unavailable').off();
    
    $('.table__seanse-times a.table__time-item').on('click', function() {
        var x = $(this).closest('.table__seanse-times').html();
       // alert(x);
        $('.modal__other-seanse').html(x);
    });
    
var target = $('.names');   
var targetPos = target.offset().top;   
var winHeight = $(window).height();
var scrollToElem = winHeight - targetPos;
$(window).scroll(function(){
  var winScrollTop = $(this).scrollTop();
  if(winScrollTop > targetPos){
      $('.names .table__header-link').addClass(' fixed');
  } else {
      $('.names .table__header-link').removeClass(' fixed');
  }
}); 
    
    var x = $('tr[datetime="2018-11-06"]').prevUntil("tbody").find('a').addClass(' archiv');
    
    $('a.archiv').off();
});
