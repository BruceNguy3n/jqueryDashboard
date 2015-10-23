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
			handle: '.portlet-handler',
			cancel: '.portlet-toggle',
			placeholder: 'portlet-placeholder ui-corner-all'
		});

		$('.portlet')
			.addClass('ui-widget ui-widget-content ui-helper-clearfix ui-corner-all')
			.find('.portlet-header')
			.addClass('ui-widget-header ui-corner-all')
			.prepend('<span class="ui-icon ui-icon-minusthick portlet-toggle"></span>');

		$('.portlet-toggle').click(function()
		{
			var $icon = $(this);
			$icon.toggleClass('ui-icon-minusthick ui-icon-plusthick');
			$icon.closet('.portlet').find('.portlet-content').toggle('fast');
		});
		$('#loadingWeather').hide();
		$('#weatherInfo').hide();
	},
	initSharing: function()
	{
		$('.shareBox a').on('click', function()
		{
			var type = $(this).prop('type');
			dashboard.sharePage(type);
		});
	},
	sharePage: function(shareType)
	{
		var pageUrl = encodeURIComponent(document.location);
		var shareUrl;

		switch(shareType)
		{
			case 'fb':
				shareUrl = 'https://www.facebook.com/share/sharer.php?u=' + pageUrl;
				break;
			case 'tweet':
				shareUrl = 'https://twitter.com/intent/tweet?text=Check out my page&url=' + pageUrl
					+ '&via=v08i';
				break;
			case 'reddit':
				shareUrl = 'http://reddit.com/submit?url=' + pageUrl;
				break;
			case 'gplus':
				shareUrl = 'https://plus.google.com/share?url=' + pageUrl;
				break;
			default:
				return false;
		}

		window.open(shareUrl, '', 'width=600,height:500');
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