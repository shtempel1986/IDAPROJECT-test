'use strict';

(function ($) {

	$(function () {

		$('.payment-form-date select').selectmenu();

		//	=============================================
		//	=ВАЛИДАЦИЯ ФОРМЫ НАЧАЛО
		//	=============================================

		Inputmask.extendDefinitions({
			'A': {
				validator: "[A-Za-z/ ]",
				cardinality: 1,
				casing: "upper" //auto uppercasing
			} });

		$('.payment__input').focus(function () {
			$(this).removeClass('payment__input_invalid');
		});

		var $cvvInput = $('.payment-cvv input').on('keypress', function () {
			if ($(this).val().length > 1) {
				$cardHolderInput.focus();
			}
		});

		var $cardHolderInput = $('.payment-form__cardholder input');

		$cardHolderInput.inputmask({
			placeholder: '',
			mask: 'A',
			repeat: 100
		});

		var $cardInputs = $('.payment-form__card input').each(function (idx) {
			$(this).on('keyup keydown', function () {
				if ($(this).val().length > 3) {
					if (idx !== 3) {
						$cardInputs.eq(idx + 1).focus();
					} else {
						$cvvInput.focus();
					}
				}
			});
		});

		$cardInputs.inputmask({
			mask: '9999',
			placeholder: ''
		});

		$cvvInput.inputmask({
			mask: '999',
			placeholder: ''
		});

		$('.payment-form').submit(function (e) {

			var data = $(this).serialize();

			$(this).find('input').each(function () {
				if ($(this).val() === '') {
					$(this).addClass('payment__input_invalid');
				}
			}).blur(function () {
				if ($(this).val() === '') {
					$(this).addClass('payment__input_invalid');
				}
			});

			if ($cardHolderInput.val().length < 4) {
				$cardHolderInput.addClass('payment__input_invalid');
			}

			if ($(this).find('.payment__input_invalid').length) {

				e.preventDefault();
			}
		});

		//	=============================================
		//	=ВАЛИДАЦИЯ ФОРМЫ КОНЕЦ
		//	=============================================
	});
})(jQuery);