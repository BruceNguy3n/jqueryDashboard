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
				shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + pageUrl;
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

		window.open(shareUrl, '', 'width=600,height=500');
	},
	initFlickr: function()
	{
		$.getJSON('https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?',
		{
			tags: 'cat',
			format: 'json'
		},
		function(data)
		{
			var str = '';
			var x = {data: data};
			console.log(x);
			$.each(data.items, function(i, item)
			{
				str += '<li>';
				str += '<a class="media" href="javascript:;" data-img="' + item.media.m + '">';
				str += '<img src="' + item.media.m + '">';
				str += '</a>';
				var permaLink = '<a href="' + item.link + '" target="_blank">link</a>';
				str += '<strong>' + item.title + '</strong>(' + permaLink + ')<br><br>tags : ' +
						item.tags;
			});
			$('#pics').html(str);
		});

		$('#pics').on('click', 'a.media', function()
		{
			var img = $(this).data('img');
			$('#dialog').html('<img src="' + img + '">').dialog({modal: true});
		});
	},
	initReddit: function()
	{

	},
	setupWeather: function()
	{
		var cities = ['Delhi,India', 'London, UK', 'New York,USA', 'Tokyo,Japan'];
		var strCity = '<option value=0>select a city</option>';
		$(cities).each(function(i, item))
		{
			strCity += '<option value="' + item + '">' + item + '</option>';
		};
		$('#selCity').html(strCity);

		$('#selCity').change(function()
		{
			var selection = $(this).val();
			if(selection == 0)
			{
				return;
			}

			dashboard.displayWeather(selection);
		});
	},
	displayWeather: function(city)
	{
		$('#loadingWeather').show();
		$('#weatherInfo').hide();
		var apiURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
		$.ajax(
		{
			url: apiURL,
			dataType: 'jsonp',
			jsonp: 'callback',
			success: function(weatherData)
			{
				var x = {data: weatherData};
				console.log(x);
				$('#temp').html((weatherData.main.temp - 273.15).toFixed(2) + 'degree celcius');
				$('#tempMin').html((weatherData.main.temp_min - 273.15).toFixed(2) + 'degree celcius');
				$('#tempMax').html((weatherData.main.temp_max - 273.15).toFixed(2) + ' degree celcius');
				$('#cloudiness').html((weatherData.clouds.all) + ' % cloudy');

				var googleUrl = 'https://www.google.com/maps?q=' + weatherData.coord.lat + ',' 
									+ weatherData.coord.lon;
				var googleLink = ' <a href="' + googleUrl + '" target="_blank">View on Google maps'
									+ '</a>';
				$('#location').html(weatherData.coord.lat + ', ' + weatherData.coord.lon + googleLink);

				$('#weatherInfo').show();
				$('#loadingWeather').hide();
			},
			error: function(a, b, c)
			{
				console.log('Error getting weather.');
			}
		});
	},
	setupImageSelector: function()
	{

	}
};