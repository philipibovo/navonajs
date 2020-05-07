/*!
 * 2018.08.01
 * navonajs 1.0.0 (http://philipi.bovo.me/navonajs)
 * By Philipi Bovo
 */

var navonaLandscapeIcon = '';
var currentNavona = '';

$(document).ready(function() {
	$('.navona ul li').click(function(){
		if ($('#'+$(this).closest('div').attr('id')).data('navona-click')) {
			var openedSize = 0.7;
			var closedSize = 0.3;
			switch($('#'+$(this).closest('div').attr('id')+' ul li').length) {
			  case 1:
			    return;
			  case 2:
			    openedSize = 0.9;
			    closedSize = 0.1;
			    break;
			  case 3:
			    openedSize = 0.8;
			    closedSize = 0.2;
			    break;
			}

      $('#'+$(this).closest('div').attr('id')+' ul li').width(((($(window).width()*0.96)*closedSize))/($('#'+$(this).closest('div').attr('id')+' ul li').length-1));
      $(this).width(($(window).width()*0.96)*openedSize);
    }
	});

	$('.navona ul li').hover(function(){
		if (!$('#'+$(this).closest('div').attr('id')).data('navona-click')) {
			var openedSize = 0.7;
			var closedSize = 0.3;
			switch($('#'+$(this).closest('div').attr('id')+' ul li').length) {
			  case 1:
			    return;
			  case 2:
			    openedSize = 0.9;
			    closedSize = 0.1;
			    break;
			  case 3:
			    openedSize = 0.8;
			    closedSize = 0.2;
			    break;
			}

      $('#'+$(this).closest('div').attr('id')+' ul li').width(((($(window).width()*0.96)*closedSize))/($('#'+$(this).closest('div').attr('id')+' ul li').length-1));
      $(this).width(($(window).width()*0.96)*openedSize);
    }
  });

	$('.navona-go').click(function(){
		navonaShow($(this).attr('for'),$('#'+$(this).attr('for')).data('navona-portrait'));
  });

  $(document).on('keyup',function(e) {
		if (e.keyCode == 27) {
			if ($('.navona').is(':visible')) if ($('#'+$('.navona:visible').attr('id')).data('navona-speed')) $('#'+$('.navona:visible').attr('id')).fadeOut($('#'+$('.navona:visible').attr('id')).data('navona-speed'))
			else $('.navona').fadeOut(700);
		}
	});

	if ($('.navona-auto-start').length) {
		navonaSetSize($('.navona-auto-start').data('navona-start'));
		$('#'+$('.navona-auto-start').data('navona-start')).show()
	}
});

$(window).resize(function() {
  if (($(window).width() > $(window).height()) && (currentNavona != '')) {
  	$('.navona-landscape').remove();
  	navonaShow(currentNavona,'false');
  	currentNavona = '';
  }
});

function navonaClose(id) {
	if ($('#'+id).data('navona-speed')) $('#'+id).fadeOut($('#'+id).data('navona-speed'))
	else $('.navona').fadeOut(700);

	currentNavona = '';
}

function navonaSetTheme() {
	$('.navona').each(function(index) {
	  if ($(this).data('navona-theme') == 'light') $(this).addClass('light-theme')
	});
}

function navonaSetSize(id) {
	var openedSize = 0.7;
	var closedSize = 0.3;
	switch($('#'+id+' ul li').length) {
    case 1:
      openedSize = 1;
      closedSize = 1;
      break;
    case 2:
      openedSize = 0.9;
      closedSize = 0.1;
      break;
    case 3:
      openedSize = 0.8;
      closedSize = 0.2;
      break;
	}

	$('#'+id+' ul li').width(((($(window).width()*0.96)*closedSize))/($('#'+id+' ul li').length-1));
	$('#'+id+' ul li:first-child').width(($(window).width()*0.96)*openedSize);
	$('#'+id+' ul li').children('img').each(function () {
		if (this.width > (($(window).width()*0.96)*openedSize)) {
			$(this).width('100%');
			$(this).height('100%');
		} else {
			$(this).css('padding-top',((($(window).height()*0.91)/2.5)-((this.height)/2)));
			$(this).css('padding-left',(((($(window).width()*0.96)*openedSize)/2)-((this.width)/2)));
		}
	});

	$('.navona').append('<div class="navona-close"><button class="navona-close-button" onclick="navonaClose(\''+id+'\')">X</button></div>');
}

function navonaShow(id,portrait) {
	if ($('#'+id).data('navona-speed')) {
			navonaSetSize(id);
			if ($('#'+id).data('navona-theme') == 'light') $('#'+id).css('background','rgba(255,255,255,0.7)')
			if (portrait) {
				$('#'+id).fadeIn($('#'+id).data('navona-speed'))
			} else {
				if ($(window).width() < $(window).height()) {
					if (navonaLandscapeIcon) {
						$('body').append('<div class="navona-landscape" onclick="javascript:$(\'.navona-landscape\').remove()"></div><img class="navona-landscape" src="'+navonaLandscapeIcon+'"></img>');
					} else {
						$('body').append('<div class="navona-landscape" onclick="javascript:$(\'.navona-landscape\').remove()"></div><img class="navona-landscape" src="img/landscape.png"></img>');
					}
					currentNavona = id;
				} else $('#'+id).fadeIn($('#'+id).data('navona-speed'));
			}
		} else {
			navonaSetSize(id);
			if ($('#'+id).data('navona-theme') == 'light') $('#'+id).css('background','rgba(255,255,255,0.7)')
			if (portrait) {
				$('#'+id).fadeIn(700);
			} else {
				if ($(window).width() < $(window).height()) {
					if (navonaLandscapeIcon) {
						$('body').append('<div class="navona-landscape" onclick="javascript:$(\'.navona-landscape\').remove()"></div><img class="navona-landscape" src="'+navonaLandscapeIcon+'"></img>');
					} else {
						$('body').append('<div class="navona-landscape" onclick="javascript:$(\'.navona-landscape\').remove()"></div><img class="navona-landscape" src="img/landscape.png"></img>');
					}
					currentNavona = id;
				} else $('#'+id).fadeIn(700);
			}
		}
}