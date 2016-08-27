$(document).ready(function () {
    'use strict';
    /*карусуель с фотками клиентов*/
    $('.clients_reviews_carousel').owlCarousel({
        animateOut: 'slideOutDown',
        animateIn: 'flipInX',
        items:3,
        nav: true,
        navText: ['', ''],
        margin: 100,
        stagePadding:0,
        smartSpeed:450,
        loop:true
    });
    /*обработка нажатия на клиента в карусели*/
    $('.client_review_block').click(function () {
        var $self = $(this);
        $('.client_review_block').removeClass('client_review_selected_block');
        $self.addClass('client_review_selected_block');
        var clientId = $self.attr('data-client-id');
        var selector = '.client_review_description_block[data-client-id='+clientId+']';
        $('.client_review_description_active_block').removeClass('client_review_description_active_block');
        $(selector).addClass('client_review_description_active_block');
    });
    /*маска телефона*/
    $(".phone_field").mask("+7 (999) 999-9999");
    /*отслеживание прокрутки*/
    var $topMenu = $('.nav_wrap');
    checkTopMenu();
    window.onscroll = function() {
        checkTopMenu();
    };
    function checkTopMenu () {
        var scrolled = getScrolledOffset();
        if (scrolled >= 80) {
            $topMenu.addClass('fixed_menu');
        } else  {
            $topMenu.removeClass('fixed_menu');
        }
    }
    function getScrolledOffset () {
        return +(window.pageYOffset || document.documentElement.scrollTop)
    }
    /*плавная прокрутка*/
    $('a[href^="#"]').click(function () {
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top - 40;
        $('html, body').stop().animate( { scrollTop: destination }, 1100 );
        return false;
    });
    /*обработка клика узнать где купить*/
    $('.js-learn-where-to-buy').click(function () {
        $('.where_can_i_buy_form').arcticmodal();
    });
    /*смена картинок в модальном окне подробнее о продукте*/
    $('.js-show-product-detail-preview').click(function () {
        var $self = $(this);
        var $smallPreviewImg = $self.closest('.product_detail_form_small_preview_block').find('.product_detail_form_small_preview_img');
        var src = $smallPreviewImg.attr('src');
        var $mainPreviewImg = $self.closest('.product_detail_form_previews').find('.product_detail_form_main_review_img');
        $mainPreviewImg.attr('src', src);
    });
    /*обработка клика на кнопку узнать больше на карточке продукта*/
    $('.js-show-product-detail').click(function () {
        var $self = $(this);
        var productId = $self.attr('data-product-id');
        var formSelector = '.product_detail_form[data-product-id='+productId+']';
        $(formSelector).arcticmodal();
    });
    /*нажатие кнопки зума на главной открывает окно детализации но с катинокй на главной в качестве начальной*/
    $('.js-show-product-detail-zoom').click(function () {
        var $self = $(this);
        var productId = $self.attr('data-product-id');
        var formSelector = '.product_detail_form[data-product-id='+productId+']';
        var src = $self.closest('.product_picture_block').find('.product_picture').attr('src');
        $(formSelector).find('.product_detail_form_main_review_img').attr('src', src);
        $(formSelector).arcticmodal();
    });
    /*изменине комбобокса выбора города*/
    $('.city_combobox').change(function () {
        var $self = $(this);
        var cityId = +$self.val();
        var $form = $self.closest('.shops_form');
        if (cityId === -1) {
            return;
        }
        var $shopList = $form.find('.shops_active_list');
        $shopList.removeClass('shops_active_list');
        var internetShopsListSelector = 'ul[data-city-id='+cityId+']';
        var $internetShopsList = $form.find(internetShopsListSelector);
        $internetShopsList.addClass('shops_active_list');
        var text = $form.find('.city_combobox option:selected').text();
        $form.find('.shops_form_city_name').html(text);
    });
    /*обработка кнопки купить онланй*/
    $('.js-by-online').click(function () {
        $('.internet_shops_form').arcticmodal();
    });
    $('.js-by-in-shop').click(function () {
        $('.physical_shops_form').arcticmodal();
    });
    /*показать на карте*/
    $('.js-show-map').click(function () {
        var $self = $(this);
        var $container = $self.closest('.physical_shop');
        var $map = $container.find('.physical_shop_map');
        $map.toggle(function () {
            if ($map.is(':visible')) {
                $container.addClass('physical_shop_with_map');
                $self.html('Скрыть карту');
            } else {
                $container.removeClass('physical_shop_with_map');
                $self.html('Показать на карте');
            }
        })
    });
    /*Отправка формы оптовикам*/
    function sendEmail (e) {
        e.preventDefault();

        var hasError = false;

        var $form = $(this);
        var valName = ($form.find('input[data-name="name"]').length > 0) ? $form.find('input[data-name="name"]').val() : '';
        var valPhone = ($form.find('input[data-name="phone"]').length > 0) ? $form.find('input[data-name="phone"]').val() : '';
        var valMail = ($form.find('input[data-name="mail"]').length > 0) ? $form.find('input[data-name="mail"]').val() : '';
        var valCompName = ($form.find('input[data-name="companyname"]').length > 0) ? $form.find('input[data-name="companyname"]').val() : '';
        var valQuestion = ($form.find('input[data-name="question"]').length > 0) ? $form.find('input[data-name="question"]').val() : '';

        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if (!pattern.test(valMail)){
            $form.find("[data-name='mail']").val('');
            $form.find('input[data-name="mail"]').attr("placeholder", "Пример test@test.ru ");
            $form.find('input[data-name="mail"]').addClass('invalid_text_field');
            hasError = true;
        }
        if (valPhone =='') {
            $form.find('input[data-name="phone"]').addClass('invalid_text_field');
            hasError = true;
        }
        setTimeout(function(){
            $form.find('.invalid_text_field').removeClass('invalid_text_field');
        }, 3000);
        
        if (hasError) {
            return false;
        }
        var obj = {
            phone: valPhone,
            name: valName,
            mail: valMail,
            companyname: valCompName,
            question: valQuestion
        };
        $.ajax({
            type: "POST",
            url: "mailpost.php",
            data: obj,
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            beforeSend: function(){
            },
            success: function(html){
                // yaCounter35374050.reachGoal('1');
                // ga('send', 'event', 'But', 'Click', 'Zayav');
                $.arcticmodal('close');
                // setTimeout(function() {
                //     $('.thanks_form').arcticmodal();
                // }, 3000);
                $form.find('input[data-name="name"]').val("");
                $form.find('input[data-name="phone"]').val("");
                $form.find('input[data-name="mail"]').val("");
                $form.find('input[data-name="companyname"]').val("");
                $form.find('input[data-name="question"]').val("");
            },
        });
    }
    $('form').on('submit', sendEmail);
    /*смена светильников*/
    $('.type_of_lighting_img_wrap').click(function () {
        var $self = $(this);
        var $section = $self.closest('.section-4_bgw');
        var bgwId = $self.attr('data-bgw-id');
        var selector = '.section_4_light_bgw[data-bgw-id='+bgwId+']';
        var $bgw = $section.find(selector);
        if ($bgw.hasClass('section_4_light_bgw_active')) {
            return;
        }
        var $activeBgw = $('.section_4_light_bgw_active');
        $activeBgw.removeClass('section_4_light_bgw_active');
        $bgw.addClass('section_4_light_bgw_active');
        $bgw.fadeIn(1000, function () {
            $activeBgw.hide();
        });
    });
    /*задать вопрос*/
    $('.js-ask-question').click(function () {
        $('.ask_question_form').arcticmodal();
    });
});