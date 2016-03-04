$(function () {

  if ($.fn.select2) {
    $('select:not(.b-search select)').select2();

    $('.b-search select').select2({
      dropdownCssClass: 'b-search_select_dd'
    });
  }

  // carousel on profile page
  /* (function () {
   var $carousel, $users, $leftNav, $rightNav, widthUser, numUsers, numShownUsers, carouselScrolling, widthNavigation, scroll, checkScrolls, classDisabled;

   $carousel = $( '.b-msr' );
   $users = $carousel.find( '.users' );
   $leftNav = $carousel.find( '.left_nav' );
   $rightNav = $carousel.find( '.right_nav' );
   numUsers = $carousel.find( '.b-user_status' ).length;
   widthNavigation = 38;
   numShownUsers = 12;
   widthUser = 76;
   carouselScrolling = false;
   classDisabled = 'disabled';

   checkScrolls = function () {
   var firstShownUser, lastShownUser;

   firstShownUser = Math.abs( parseFloat( $users.css( 'left' ), 10 ) - widthNavigation ) / widthUser;
   if ( firstShownUser === 0 ) { $rightNav.addClass( classDisabled ); } else { $rightNav.removeClass( classDisabled ); }

   lastShownUser = Math.abs( parseFloat( $users.css( 'left' ), 10 ) - widthNavigation ) / widthUser + numShownUsers;
   if ( numUsers === lastShownUser ) { $leftNav.addClass( classDisabled ); } else { $leftNav.removeClass( classDisabled ); }
   };

   scroll = function ( direction, nav ) {
   var widthToScroll, firstShownUser, lastShownUser, currentLeft , toLeft;

   if ( carouselScrolling || nav.hasClass( classDisabled ) ) { return; }

   carouselScrolling = true;
   currentLeft = parseFloat( $users.css( 'left' ), 10 );

   switch ( direction ) {
   case 'left':
   lastShownUser = Math.abs( currentLeft - widthNavigation ) / widthUser + numShownUsers;

   if ( numUsers - lastShownUser < 12 ) {
   widthToScroll = numUsers - lastShownUser;
   } else {
   widthToScroll = numShownUsers;
   }

   toLeft = currentLeft - widthToScroll * widthUser;
   break;
   case 'right':
   firstShownUser = Math.abs( currentLeft - widthNavigation ) / widthUser;

   if ( firstShownUser < 12 ) {
   widthToScroll = firstShownUser;
   } else {
   widthToScroll = numShownUsers;
   }

   toLeft = currentLeft + widthToScroll * widthUser;
   break;
   }

   $users.animate( {
   left: toLeft
   }, function () {
   carouselScrolling = false;
   checkScrolls();
   } );

   };

   $users.css( 'width', (widthUser * numUsers) + 'px' );
   checkScrolls();

   $leftNav.on( 'click', function ( e ) {
   e.preventDefault();
   scroll( 'left', $( this ) );
   } );
   $rightNav.on( 'click', function ( e ) {
   e.preventDefault();
   scroll( 'right', $( this ) );
   } );
   }());
   */

  (function () {
    var profMenu, classSelected;

    classSelected = 'selected';
    profMenu = $('.b-main_menu .prof');

    profMenu.find('.prof_photo_wrap').on('click', function () {
      if (profMenu.hasClass(classSelected)) {
        profMenu.removeClass(classSelected);
      } else {
        profMenu.addClass(classSelected);
      }
    });

    $(document).on('click', function (e) {
      if (!$(e.target).closest(profMenu).length) {
        profMenu.removeClass(classSelected);
      }
    });

  }());

  (function () {
    var msgs, foot;

    msgs = $('.b-msgs');
    foot = $('.b-foot');

    if (!msgs.length || !foot.length) { return; }

    $(window).scroll(function () {
      var difference;

      difference = $(window).scrollTop() + $(window).height() - foot.offset().top;

      if (difference > -10) {
        msgs.css({bottom: (difference + 10) + 'px'});
      } else {
        msgs.css({bottom: '10px'});
      }
    });

  }());

  (function () {
    var $bMoreAct, classSelected;

    $bMoreAct = $('.b-more_act');
    classSelected = 'selected';

    $bMoreAct.find('.more_link').click(function (e) {
      var parent;

      e.preventDefault();

      parent = $(this).parent();
      if (parent.hasClass(classSelected)) {
        parent.removeClass(classSelected);
      } else {
        parent.addClass(classSelected);
      }
    });

    $(document).on('click', function (e) {
      if (!$(e.target).closest($bMoreAct).length) {
        $bMoreAct.removeClass(classSelected);
      }
    });
  }());

  $('.b-up_des .md').click(function (e) {
    var self;

    e.preventDefault();
    self = $(this);

    self.hide();
    self.closest('.text_wrap').find('.text_hide').show();
  });

  $('.b-sai .sml').click(function (e) {
    e.preventDefault();
    $(this).parent().hide().prev().addClass('all');
  });

  $('.b-content.pp .pf').click(function () {
    $(this).closest('.tariff_info').find('.hint').show();
  });

  $('.b-content.pp .hint').mouseleave(function () {
    $(this).hide();
  });

  // chats scroll
  (function () {
    (function () {
      var height, pane, api, paneWidth;

      pane = $('.b-chat_profile .b-messaging');

      height = 450;

      pane.find('.full_history').click(function (e) {
        e.preventDefault();
        $(this).parent('.full_history_wrap').remove();

        paneWidth = pane.width() - 7;

        // just to add some information
        pane.find('.messages').append(pane.find('.messages').html()).append(pane.find('.messages').html());

        pane.css({height: height}).jScrollPane({
          contentWidth: paneWidth,
          verticalGutter: 0,
          stickToBottom: true
        });

        api = pane.data('jsp');
        api.scrollToBottom();
      });
    }());

    if (location.pathname.indexOf('RB-view-chats.html') === -1 &&
      location.pathname.indexOf('RB-operator-chat.html') === -1 &&
      location.pathname.indexOf('RB-chat-notifications.html') === -1
    ) { return; }

    (function () {
      var minHeightChat, $bChat, userPhotoWrapHeight, btnsChatHeight, returnChatHeight, pane, paneApi, resetUsersList, resetBlockOnline, temp, oldChatHeight;

      $bChat = $('.content_table');
      userPhotoWrapHeight = $bChat.find('.user_wrap').outerHeight();
      btnsChatHeight = $bChat.find('.btns_chat').outerHeight();
      pane = $bChat.find('.b-messaging');

      minHeightChat = 570;

      returnChatHeight = (function () {
        var w, chatHeight, paneHeight;
        w = $(window);
        return function () {
          chatHeight = w.height() - 100;
          if (chatHeight < minHeightChat) { chatHeight = minHeightChat; }
          paneHeight = chatHeight - (userPhotoWrapHeight + btnsChatHeight + 34);
          return {
            bChatHeight: chatHeight,
            paneHeight: paneHeight
          };
        };
      }());

      resetUsersList = (function () {
        var numUsers, usersListHeight, usersListNavHeight, usersList, usersListApi;

        usersListNavHeight = $bChat.find('.nav').outerHeight();
        usersListApi = false;

        return function (sizes) {
          usersList = $bChat.find('.users_list_wrap');
          usersList.css({top: usersListNavHeight});
          numUsers = usersList.find('.message').length;
          usersListHeight = sizes.bChatHeight - usersListNavHeight - 17;

          if (numUsers * 75 - 1 > usersListHeight) {
            usersList.css({height: usersListHeight});

            if (usersListApi) {
              usersListApi.reinitialise();
            } else {
              usersList.jScrollPane({
                contentWidth: usersList.width() - 7,
                verticalGutter: 0
              });
              usersListApi = usersList.data('jsp');
            }
          } else {
            usersList.css({height: 'auto'});

            if (usersListApi) {
              usersListApi.destroy();
              usersListApi = false;
            }
          }
        };
      }());

      resetBlockOnline = (function () {
        var numItems, difference, itemHeight, $ONlList;

        itemHeight = 80;
        difference = $bChat.find('.b-sb_up2').outerHeight() + $bChat.find('.b-sb_stat').outerHeight() + $bChat.find('.b-sb_on').outerHeight() + 30;
        $ONlList = $bChat.find('.b-sb_on .list_wrap');

        return function (sizes) {
          numItems = Math.floor((sizes.bChatHeight - difference) / itemHeight);
          $ONlList.css({height: numItems * itemHeight});
        };
      }());

      temp = returnChatHeight();

      pane.css({height: temp.paneHeight}).jScrollPane({
        contentWidth: pane.width() - 7,
        verticalGutter: 0,
        stickToBottom: true
      });

      paneApi = pane.data('jsp');
      paneApi.scrollToBottom();

      resetUsersList(temp);
      resetBlockOnline(temp);

      $(window).resize(function () {
        temp = returnChatHeight();

        if (temp.bChatHeight === oldChatHeight) { return; }

        oldChatHeight = temp.bChatHeight;

        $bChat.css({height: temp.bChatHeight});

        pane.css({height: temp.paneHeight});
        paneApi.reinitialise();

        resetUsersList(temp);
        resetBlockOnline(temp);
      });

      setTimeout(function () {
        $(window).resize();
      });

    }());

  }());

  // gallery
  (function () {
    var $bGallery, resizeImg;
    $bGallery = $('.b-gallery');

    if (!$bGallery.length) { return; }

    resizeImg = function () {
      $bGallery.find('.photo_wrap')
        .css({height: 0})
        .css({height: $bGallery.find('.gallery_cell_photo').height()});
    };

    resizeImg();

    $(window).resize(function () {
      resizeImg();
    });
  }());

  // crop
  (function () {
    if (!$.fn.slick) { return; }

    $('.b-like_gallery_block .gallery').slick({
      slidesToShow: 8,
      slidesToScroll: 1
    });

    $('.b-like .pics_wrap').slick({
      slide: 'a',
      slidesToShow: 8,
      slidesToScroll: 1
    });

    $('.b-msr .users').slick({
      slidesToShow: 12,
      slidesToScroll: 1
    });
  }());

  // crop
  (function () {
    if (!$.fn.Jcrop) { return; }

    $('.b-gallery.mp_edit .photo').Jcrop({
      setSelect: [80, 80, 260, 260],
      aspectRatio: 1
    });
  }());


  (function () {
    var data, format;

    data = [
      {id: 1, ava: 'img/for_preview/img7.png', name: 'OlgaSmetanina', age: '24', mes: '105', mesMes: '2'},
      {id: 2, ava: 'img/for_preview/img11.png', name: 'OlgaSmetanina', age: '24', mes: '105', mesMes: '2'},
      {id: 3, ava: 'img/for_preview/img5.png', name: 'OlgaSmetanina', age: '24', mes: '105', mesMes: '2'},
      {id: 4, ava: 'img/for_preview/img11.png', name: 'OlgaSmetanina', age: '22', mes: '105', mesMes: '2'},
      {id: 5, ava: 'img/for_preview/img10.png', name: 'OlgaSmetanina', age: '24', mes: '105', mesMes: '2'},
      {id: 6, ava: 'img/for_preview/img13.png', name: 'Smetanina', age: '24', mes: '105', mesMes: '2'},
      {id: 7, ava: 'img/for_preview/img11.png', name: 'OlgaSmetanina', age: '24', mes: '105', mesMes: '2'},
      {id: 8, ava: 'img/for_preview/img14.png', name: 'Maria', age: '24', mes: '105', mesMes: '2'},
      {id: 9, ava: 'img/for_preview/img11.png', name: 'OlgaSmetanina', age: '24', mes: '10', mesMes: '2'},
      {id: 10, ava: 'img/for_preview/img11.png', name: 'OlgaSmetanina', age: '24', mes: '105', mesMes: '20'},
    ];

    format = function (state) {
      if (state.id) {
        return '<span class="item_chat "><img class="ava" src="' + state.ava
          + '" alt=""><span class="name_age">' + state.name + ' ' + state.age
          + '</span><span class="property">' + state.mes + ' messages <span class="sep">|</span> <span class="new">'
          + state.mesMes + ' new</span></span></span>';
      }
    };

    $('#chats').select2({
      minimumResultsForSearch: -1,
      placeholder: "Select chat",
      data: data,
      formatResult: format,
      formatSelection: format,
      dropdownCssClass: 'b-user_profile_chats',
      escapeMarkup: function (m) { return m; }
    });
  }());

});