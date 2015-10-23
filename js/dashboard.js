$(document).ready(function()
{
	dashboard.init();
});

var dashboard =
{
	imgArr: [],
	init: function()
	{
		this.initPorlets();
		this.initSharing();
		this.initFlickr();
		this.initReddit();
		this.setupWeather();
		this.setupImageSelector();
	},
	initPorlets: function()
	{
		$('.column').sortable(
		{
			connectWith: '.column',
			handle: '.porlet-handler',
			cancel: '.porlet-toggle',
			placeholder: 'portlet-placeholder ui-corner-all'
		});

		$('.portlet')
			.addClass('ui-widget ui-widget-content ui-helper-clearfix ui-corner-all')
			.find('.porlet-header')
			.addClass('ui-widget-header ui-corner-all')
			.prepend('<span class="ui-icon ui-icon-minusthick portlet-toggle"></span>');

		$('.portlet-toggle').click(function()
		{
			var $icon = $(this);
			icon.toggleClass('ui-icon-minusthick ui-icon-plusthick');
			icon.closet('.portlet').find('.porlet-content').toggle('fast');
		});
		$('#loadingWeather').hide();
		$('#weatherInfo').hide();
	},
	initSharing: function()
	{

	},
	initFlickr: function()
	{

	},
	initReddit: function()
	{

	},
	setupWeather: function()
	{

	},
	setupImageSelector: function()
	{

	}
};