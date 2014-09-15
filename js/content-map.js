$(document).ready(function () {
    if (!EUScreenXL) {
        throw "EUScreenXL required libraries not there!";
    }
    
    // map data
    var mapData = {},
    	mapSize = {};

    EUScreenXL.ContentMapPage = function () {
        EUScreenXL.Page.apply(this, arguments);
        this.$navElement = jQuery('#navpanel');
        this.$navbarElement = jQuery('.navbar-header');
        this.$formElement = jQuery('#headerform');
        
        // nav panel
        this.$navElement.slidePanelJS({
            openButton: '#menubutton',
            pageSection:'#page',
            navbarSection:'#navbar',
            speed:200
        });

        // get vmap size
        mapSize.width = $('.maps').outerWidth(); // 30 is the padding
        mapSize.height =  (mapSize.width * 3) / 4 + 15;

        // set map size
        $('#vmap').css({
	        width: mapSize.width +'px',
	        height: mapSize.height +'px'
        });

        // load interactive map
        // using jqvmap (MIT License)
        $('#vmap').vectorMap({
            map: 'europe_en',
            enableZoom: false,
            showTooltip: true,
            backgroundColor: '#fff',
            borderColor: '#fff',
            color: '#dedede',
            onRegionOver: function(element, code, region) {
	            
	            // show info
	            showMapInfo(element, code, region);
            },
            onRegionClick: function(element, code, region) {
            
                // show info
	            showMapInfo(element, code, region);
            }
        });

        // retrieve providers data (country, the amount of videos, audios etc.) from json file
        // file has to be updated
        $.getJSON( "js/libs/jqvmap/data/euscreen.provider.data.json", function( data ) {
            
            // set variable
            mapData = data;

            // highlight countries in euscreen
            // for easier search on the map
            var colorsST = {},
                highlightColor = "#c0c1c5";

            // loop
            for (var item in data) {
                colorsST[item] = highlightColor;
            }

            // set
            $('#vmap').vectorMap('set', 'colors', colorsST);
        });
    };
    
    // show map info
    var showMapInfo = function(element, code, region){
	    // on region click
        // get region data
        if(mapData[code] != undefined) {

            // show result section
            if($('.results-section').css('display') != "block") {
                $('.results-section').css({'display': 'block'});
            }
            
            // variables
            var countryData = mapData[code],
                countryProvider = countryData['providers'],
                mediaAmount = {'videos': 0, 'audios': 0, 'images': 0, 'texts': 0, 'series': 0},
                providerLink = "",
                providerList = "";
        
            // count
            for (var item in countryProvider) {
                
                // set url
                providerList += "<span class='provider-list'>"+countryProvider[item].name+ " ("+item.toUpperCase()+") <a href='search-results.html?provider="+item+"' class='box-link'>SEARCH "+item.toUpperCase()+" CONTENT</a></span>";
                
                // add the media
                mediaAmount['videos'] += countryProvider[item].videos;
                mediaAmount['audios'] += countryProvider[item].audios;
                mediaAmount['images'] += countryProvider[item].images;
                mediaAmount['texts'] += countryProvider[item].texts;
                mediaAmount['series'] += countryProvider[item].series;
            }

            // get general info like country name
            $('#selected-country').html(mapData[code].country);

            // set amount of medias
            $('#selected-videos').html(mediaAmount['videos']);
            $('#selected-audios').html(mediaAmount['audios']);
            $('#selected-images').html(mediaAmount['images']);
            $('#selected-texts').html(mediaAmount['texts']);
            $('#selected-series').html(mediaAmount['series']);

            // set providers info
            //$('#selected-searchlink').html(providerLink);
            $('#selected-providers').html(providerList);
        } else {

            // reset info
            $('#selected-country').html("No EUscreen provider from "+region);
            $('.results-section').css({'display': 'none'});
            
        }
    }

    EUScreenXL.ContentMapPage.prototype = Object.create(EUScreenXL.Page.prototype);
    EUScreenXL.ContentMapPage.prototype.searchButton = jQuery("#searchbutton");
    EUScreenXL.ContentMapPage.prototype.menuButton = jQuery("#menubutton");
    EUScreenXL.ContentMapPage.prototype.name = "content-map";
    EUScreenXL.ContentMapPage.prototype.events = {
    	'click #searchbutton': function(event) {
            if(this.searchButton.hasClass("active")) {
                this.searchButton.removeClass("active"); // toggle style
                this.$navbarElement.removeClass('searchOpened');
                this.menuButton.show();
            } else {
                this.searchButton.addClass("active"); // toggle style
                this.$navbarElement.addClass('searchOpened');
                this.$formElement.find('input[type="text"]').focus();
                this.menuButton.hide();
            }
        }
    }

    new EUScreenXL.ContentMapPage();
});
