(function($) {
  var _options;
  var _self;

  var _boundingBoxes;
  var _zoneCentroids = {};
  var _selectedRegionKey;
  var _selectedPolygon;
  var _mapper;
  var _mapZones = {};
  var _transitions = {};

  var _currentHoverRegion;
  var _hoverRegions = {};
  var _hoverPolygons = [];

  var _loader;
  var _loaderGif;
  var _maskPng;
  var _needsLoader = 0;
  
  var _tzGroupedByOffset = {"+00:00":["Africa/Abidjan","Africa/Accra","Africa/Bamako","Africa/Banjul","Africa/Bissau","Africa/Casablanca","Africa/Conakry","Africa/Dakar","Africa/El_Aaiun","Africa/Freetown","Africa/Lome","Africa/Monrovia","Africa/Nouakchott","Africa/Ouagadougou","Africa/Sao_Tome","Africa/Timbuktu","America/Danmarkshavn","Antarctica/Troll","Atlantic/Canary","Atlantic/Faeroe","Atlantic/Faroe","Atlantic/Madeira","Atlantic/Reykjavik","Atlantic/St_Helena","Eire","Etc/GMT","Etc/GMT+0","Etc/GMT0","Etc/GMT-0","Etc/Greenwich","Etc/UCT","Etc/Universal","Etc/UTC","Etc/Zulu","Europe/Belfast","Europe/Dublin","Europe/Guernsey","Europe/Isle_of_Man","Europe/Jersey","Europe/Lisbon","Europe/London","GB","GB-Eire","GMT","GMT+0","GMT0","GMT-0","Greenwich","Iceland","Portugal","UCT","Universal","UTC","WET","Zulu"],"+03:00":["Africa/Addis_Ababa","Africa/Asmara","Africa/Asmera","Africa/Dar_es_Salaam","Africa/Djibouti","Africa/Juba","Africa/Kampala","Africa/Khartoum","Africa/Mogadishu","Africa/Nairobi","Antarctica/Syowa","Asia/Aden","Asia/Baghdad","Asia/Bahrain","Asia/Kuwait","Asia/Qatar","Asia/Riyadh","Etc/GMT-3","Europe/Kirov","Europe/Minsk","Europe/Moscow","Europe/Simferopol","Europe/Volgograd","Indian/Antananarivo","Indian/Comoro","Indian/Mayotte","W-SU"],"+01:00":["Africa/Algiers","Africa/Bangui","Africa/Brazzaville","Africa/Ceuta","Africa/Douala","Africa/Kinshasa","Africa/Lagos","Africa/Libreville","Africa/Luanda","Africa/Malabo","Africa/Ndjamena","Africa/Niamey","Africa/Porto-Novo","Africa/Tunis","Africa/Windhoek","Arctic/Longyearbyen","Atlantic/Jan_Mayen","CET","Etc/GMT-1","Europe/Amsterdam","Europe/Andorra","Europe/Belgrade","Europe/Berlin","Europe/Bratislava","Europe/Brussels","Europe/Budapest","Europe/Busingen","Europe/Copenhagen","Europe/Gibraltar","Europe/Ljubljana","Europe/Luxembourg","Europe/Madrid","Europe/Malta","Europe/Monaco","Europe/Oslo","Europe/Paris","Europe/Podgorica","Europe/Prague","Europe/Rome","Europe/San_Marino","Europe/Sarajevo","Europe/Skopje","Europe/Stockholm","Europe/Tirane","Europe/Vaduz","Europe/Vatican","Europe/Vienna","Europe/Warsaw","Europe/Zagreb","Europe/Zurich","MET","Poland"],"+02:00":["Africa/Blantyre","Africa/Bujumbura","Africa/Cairo","Africa/Gaborone","Africa/Harare","Africa/Johannesburg","Africa/Kigali","Africa/Lubumbashi","Africa/Lusaka","Africa/Maputo","Africa/Maseru","Africa/Mbabane","Africa/Tripoli","Asia/Amman","Asia/Beirut","Asia/Damascus","Asia/Gaza","Asia/Hebron","Asia/Istanbul","Asia/Jerusalem","Asia/Nicosia","Asia/Tel_Aviv","EET","Egypt","Etc/GMT-2","Europe/Athens","Europe/Bucharest","Europe/Chisinau","Europe/Helsinki","Europe/Istanbul","Europe/Kaliningrad","Europe/Kiev","Europe/Mariehamn","Europe/Nicosia","Europe/Riga","Europe/Sofia","Europe/Tallinn","Europe/Tiraspol","Europe/Uzhgorod","Europe/Vilnius","Europe/Zaporozhye","Israel","Libya","Turkey"],"-10:00":["America/Adak","America/Atka","Etc/GMT+10","HST","Pacific/Honolulu","Pacific/Johnston","Pacific/Rarotonga","Pacific/Tahiti","US/Aleutian","US/Hawaii"],"-09:00":["America/Anchorage","America/Juneau","America/Metlakatla","America/Nome","America/Sitka","America/Yakutat","Etc/GMT+9","Pacific/Gambier","US/Alaska"],"-04:00":["America/Anguilla","America/Antigua","America/Aruba","America/Asuncion","America/Barbados","America/Blanc-Sablon","America/Boa_Vista","America/Campo_Grande","America/Caracas","America/Cuiaba","America/Curacao","America/Dominica","America/Glace_Bay","America/Goose_Bay","America/Grand_Turk","America/Grenada","America/Guadeloupe","America/Guyana","America/Halifax","America/Kralendijk","America/La_Paz","America/Lower_Princes","America/Manaus","America/Marigot","America/Martinique","America/Moncton","America/Montserrat","America/Port_of_Spain","America/Porto_Velho","America/Puerto_Rico","America/Santiago","America/Santo_Domingo","America/St_Barthelemy","America/St_Kitts","America/St_Lucia","America/St_Thomas","America/St_Vincent","America/Thule","America/Tortola","America/Virgin","Antarctica/Palmer","Atlantic/Bermuda","Brazil/West","Canada/Atlantic","Chile/Continental","Etc/GMT+4"],"-03:00":["America/Araguaina","America/Argentina/Buenos_Aires","America/Argentina/Catamarca","America/Argentina/ComodRivadavia","America/Argentina/Cordoba","America/Argentina/Jujuy","America/Argentina/La_Rioja","America/Argentina/Mendoza","America/Argentina/Rio_Gallegos","America/Argentina/Salta","America/Argentina/San_Juan","America/Argentina/San_Luis","America/Argentina/Tucuman","America/Argentina/Ushuaia","America/Bahia","America/Belem","America/Buenos_Aires","America/Catamarca","America/Cayenne","America/Cordoba","America/Fortaleza","America/Godthab","America/Jujuy","America/Maceio","America/Mendoza","America/Miquelon","America/Montevideo","America/Paramaribo","America/Recife","America/Rosario","America/Santarem","America/Sao_Paulo","Antarctica/Rothera","Atlantic/Stanley","Brazil/East","Etc/GMT+3"],"-05:00":["America/Atikokan","America/Bogota","America/Cancun","America/Cayman","America/Coral_Harbour","America/Detroit","America/Eirunepe","America/Fort_Wayne","America/Guayaquil","America/Havana","America/Indiana/Indianapolis","America/Indiana/Marengo","America/Indiana/Petersburg","America/Indiana/Vevay","America/Indiana/Vincennes","America/Indiana/Winamac","America/Indianapolis","America/Iqaluit","America/Jamaica","America/Kentucky/Louisville","America/Kentucky/Monticello","America/Lima","America/Louisville","America/Montreal","America/Nassau","America/New_York","America/Nipigon","America/Panama","America/Pangnirtung","America/Port-au-Prince","America/Porto_Acre","America/Rio_Branco","America/Thunder_Bay","America/Toronto","Brazil/Acre","Canada/Eastern","Cuba","EST","EST5EDT","Etc/GMT+5","Jamaica","US/Eastern","US/East-Indiana","US/Michigan"],"-06:00":["America/Bahia_Banderas","America/Belize","America/Chicago","America/Costa_Rica","America/El_Salvador","America/Guatemala","America/Indiana/Knox","America/Indiana/Tell_City","America/Knox_IN","America/Managua","America/Matamoros","America/Menominee","America/Merida","America/Mexico_City","America/Monterrey","America/North_Dakota/Beulah","America/North_Dakota/Center","America/North_Dakota/New_Salem","America/Rainy_River","America/Rankin_Inlet","America/Regina","America/Resolute","America/Swift_Current","America/Tegucigalpa","America/Winnipeg","Canada/Central","Canada/East-Saskatchewan","Canada/Saskatchewan","Chile/EasterIsland","CST6CDT","Etc/GMT+6","Mexico/General","Pacific/Easter","Pacific/Galapagos","US/Central","US/Indiana-Starke"],"-07:00":["America/Boise","America/Cambridge_Bay","America/Chihuahua","America/Creston","America/Dawson_Creek","America/Denver","America/Edmonton","America/Fort_Nelson","America/Hermosillo","America/Inuvik","America/Mazatlan","America/Ojinaga","America/Phoenix","America/Shiprock","America/Yellowknife","Canada/Mountain","Etc/GMT+7","Mexico/BajaSur","MST","MST7MDT","Navajo","US/Arizona","US/Mountain"],"-08:00":["America/Dawson","America/Ensenada","America/Los_Angeles","America/Santa_Isabel","America/Tijuana","America/Vancouver","America/Whitehorse","Canada/Pacific","Canada/Yukon","Etc/GMT+8","Mexico/BajaNorte","Pacific/Pitcairn","PST8PDT","US/Pacific","US/Pacific-New"],"-02:00":["America/Noronha","Atlantic/South_Georgia","Brazil/DeNoronha","Etc/GMT+2"],"-01:00":["America/Scoresbysund","Atlantic/Azores","Atlantic/Cape_Verde","Etc/GMT+1"],"-03:30":["America/St_Johns","Canada/Newfoundland"],"+08:00":["Antarctica/Casey","Asia/Brunei","Asia/Choibalsan","Asia/Chongqing","Asia/Chungking","Asia/Harbin","Asia/Hong_Kong","Asia/Irkutsk","Asia/Kuala_Lumpur","Asia/Kuching","Asia/Macao","Asia/Macau","Asia/Makassar","Asia/Manila","Asia/Shanghai","Asia/Singapore","Asia/Taipei","Asia/Ujung_Pandang","Asia/Ulaanbaatar","Asia/Ulan_Bator","Australia/Perth","Australia/West","Etc/GMT-8","Hongkong","PRC","ROC","Singapore"],"+07:00":["Antarctica/Davis","Asia/Bangkok","Asia/Barnaul","Asia/Ho_Chi_Minh","Asia/Hovd","Asia/Jakarta","Asia/Krasnoyarsk","Asia/Novokuznetsk","Asia/Novosibirsk","Asia/Phnom_Penh","Asia/Pontianak","Asia/Saigon","Asia/Tomsk","Asia/Vientiane","Etc/GMT-7","Indian/Christmas"],"+10:00":["Antarctica/DumontDUrville","Asia/Ust-Nera","Asia/Vladivostok","Australia/ACT","Australia/Brisbane","Australia/Canberra","Australia/Currie","Australia/Hobart","Australia/Lindeman","Australia/Melbourne","Australia/NSW","Australia/Queensland","Australia/Sydney","Australia/Tasmania","Australia/Victoria","Etc/GMT-10","Pacific/Chuuk","Pacific/Guam","Pacific/Port_Moresby","Pacific/Saipan","Pacific/Truk","Pacific/Yap"],"+11:00":["Antarctica/Macquarie","Asia/Magadan","Asia/Sakhalin","Asia/Srednekolymsk","Etc/GMT-11","Pacific/Bougainville","Pacific/Efate","Pacific/Guadalcanal","Pacific/Kosrae","Pacific/Norfolk","Pacific/Noumea","Pacific/Pohnpei","Pacific/Ponape"],"+05:00":["Antarctica/Mawson","Asia/Aqtau","Asia/Aqtobe","Asia/Ashgabat","Asia/Ashkhabad","Asia/Dushanbe","Asia/Karachi","Asia/Oral","Asia/Samarkand","Asia/Tashkent","Asia/Yekaterinburg","Etc/GMT-5","Indian/Kerguelen","Indian/Maldives"],"+12:00":["Antarctica/McMurdo","Antarctica/South_Pole","Asia/Anadyr","Asia/Kamchatka","Etc/GMT-12","Kwajalein","NZ","Pacific/Auckland","Pacific/Fiji","Pacific/Funafuti","Pacific/Kwajalein","Pacific/Majuro","Pacific/Nauru","Pacific/Tarawa","Pacific/Wake","Pacific/Wallis"],"+06:00":["Antarctica/Vostok","Asia/Almaty","Asia/Bishkek","Asia/Dacca","Asia/Dhaka","Asia/Kashgar","Asia/Omsk","Asia/Qyzylorda","Asia/Thimbu","Asia/Thimphu","Asia/Urumqi","Etc/GMT-6","Indian/Chagos"],"+04:00":["Asia/Baku","Asia/Dubai","Asia/Muscat","Asia/Tbilisi","Asia/Yerevan","Etc/GMT-4","Europe/Astrakhan","Europe/Samara","Europe/Ulyanovsk","Indian/Mahe","Indian/Mauritius","Indian/Reunion"],"+05:30":["Asia/Calcutta","Asia/Colombo","Asia/Kolkata"],"+09:00":["Asia/Chita","Asia/Dili","Asia/Jayapura","Asia/Khandyga","Asia/Seoul","Asia/Tokyo","Asia/Yakutsk","Etc/GMT-9","Japan","Pacific/Palau","ROK"],"+04:30":["Asia/Kabul"],"+05:45":["Asia/Kathmandu","Asia/Katmandu"],"+08:30":["Asia/Pyongyang"],"+06:30":["Asia/Rangoon","Indian/Cocos"],"+03:30":["Asia/Tehran","Iran"],"+09:30":["Australia/Adelaide","Australia/Broken_Hill","Australia/Darwin","Australia/North","Australia/South","Australia/Yancowinna"],"+08:45":["Australia/Eucla"],"+10:30":["Australia/LHI","Australia/Lord_Howe"],"-11:00":["Etc/GMT+11","Pacific/Midway","Pacific/Niue","Pacific/Pago_Pago","Pacific/Samoa","US/Samoa"],"-12:00":["Etc/GMT+12"],"+13:00":["Etc/GMT-13","Pacific/Apia","Pacific/Enderbury","Pacific/Fakaofo","Pacific/Tongatapu"],"+14:00":["Etc/GMT-14","Pacific/Kiritimati"],"+12:45":["NZ-CHAT","Pacific/Chatham"],"-09:30":["Pacific/Marquesas"]}
  
  var _getSameOffsetZones = function(name){
    for (var key in _tzGroupedByOffset) {
      if (_tzGroupedByOffset[ key].indexOf(name) >= 0) {
         return _tzGroupedByOffset[key];
      }
    }
    return [];
  }
  
  var LeafletMapper = function(el, mouseClickHandler, mouseMoveHandler, mapOptions) {
    var _map = L.map('mapid',{
      center: [mapOptions.centerLat, mapOptions.centerLng], 
      zoom: mapOptions.zoom,
      zoomControl: false,
      // dragging: false
    });

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGFnaW5oYSIsImEiOiJjaXJ6MG9zd28wMDIzMnlwZGU4OTBsY3l5In0.qe_lgiEahn-i4iOnd3ix3Q', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        minZoom: mapOptions.minZoom,
        maxZoom: mapOptions.maxZoom,
    }).addTo(_map);
    _map.on('click', mouseClickHandler);
    if (mouseMoveHandler) {
      _map.on('mousemove', mouseMoveHandler);
    }
    
    var addPolygon = function(coords, stroke, fill, clickHandler, mouseMoveHandler) {
      var polygon = L.polygon(coords,{
        color: stroke.color,
        opacity: stroke.opacity,
        weight: stroke.width,
        fillColor: fill.color,
        fillOpacity: fill.opacity
      }).addTo(_map);
      polygon.on('click', clickHandler);
      if (mouseMoveHandler) {
        polygon.on('mousemove', mouseMoveHandler);
      }
      return polygon;
    };
    var createPoint = function(lat, lng) {
      return L.latLng(lat, lng);
    };
    var hideInfoWindow = function() {
      _map.closePopup();
    };
    var removePolygon = function(mapPolygon) {
      mapPolygon.removeFrom(_map);
    };
    var showInfoWindow = function(pos, content, callback) {
      return;
    };
    return {
      addPolygon: addPolygon,
      createPoint: createPoint,
      hideInfoWindow: hideInfoWindow,
      removePolygon: removePolygon,
      showInfoWindow: showInfoWindow
    };
  }
 
  // Forward declarations to satisfy jshint
  var hideLoader, hitTestAndConvert, selectPolygonZone,
    showInfoWindow, slugifyName;

  var clearHover = function() {
    $.each(_hoverPolygons, function(i, p) {
      _mapper.removePolygon(p);
    });

    _hoverPolygons = [];
  };

  var clearZones = function() {
    $.each(_mapZones, function(i, zone) {
      $.each(zone, function(j, polygon) {
        _mapper.removePolygon(polygon);
      });
    });

    _mapZones = {};
  };

  var drawZone = function(name, lat, lng, callback) {
    if (_mapZones[name]) {
      return;
    }

    $.get(_options.jsonRootUrl + 'polygons/' + slugifyName(name) + '.json', function(data) {
      _needsLoader--;
      if (_needsLoader === 0 && _loader) {
        hideLoader();
      }

      if (callback) {
        callback();
      }

      data = typeof data === 'string' ? JSON.parse(data) : data;

      _mapZones[name] = [];
      $.extend(_transitions, data.transitions);

      var result = hitTestAndConvert(data.polygons, lat, lng);

      if (result.inZone) {
        
        var allHoverZones = _getSameOffsetZones( name );
        for (var i = 0; i < allHoverZones.length; i++) {
          var _region = _hoverRegions[ allHoverZones[i] ];
          if (!_region) {
            continue;
          }
          var _result = hitTestAndConvert(_region.hoverRegion, lat, lng);
          $.each(_result.allPolygons, function(i, polygonInfo) {
            var mapPolygon = _mapper.addPolygon(polygonInfo.coords, {
              color: '#ff0000',
              opacity: 0.7,
              width: 1
            }, {
              color: '#ffcccc',
              opacity: 0.5
            }, function() {
              selectPolygonZone(polygonInfo.polygon);
            }, clearHover);

            _mapZones[name].push(mapPolygon);
          });
          
          selectPolygonZone(result.selectedPolygon);
        }
      }
    }).error(function() {
      console.warn(arguments);
    });
  };

  var getCurrentTransition = function(transitions) {
    if (transitions.length === 1) {
      return transitions[0];
    }

    var now = _options.date.getTime() / 1000;
    var selected = null;
    $.each(transitions, function(i, transition) {
      if (transition[0] < now && i < transitions.length - 1 &&
          transitions[i + 1][0] > now) {
        selected = transition;
      }
    });

    // If we couldn't find a matching transition, just use the first one
    // NOTE: This will sometimes be wrong for events in the past
    if (!selected) {
      selected = transitions[0];
    }

    return selected;
  };

  var hideInfoWindow = function() {
    _mapper.hideInfoWindow();
  };

  hideLoader = function() {
    _loader.remove();
    _loader = null;
  };

  hitTestAndConvert = function(polygons, lat, lng) {
    var allPolygons = [];
    var inZone = false;
    var selectedPolygon;
    $.each(polygons, function(i, polygon) {
      // Ray casting counter for hit testing.
      var rayTest = 0;
      var lastPoint = polygon.points.slice(-2);

      var coords = [];
      var j = 0;
      for (j = 0; j < polygon.points.length; j += 2) {
        var point = polygon.points.slice(j, j + 2);

        coords.push(_mapper.createPoint(point[0], point[1]));

        // Ray casting test
        if ((lastPoint[0] <= lat && point[0] >= lat) ||
          (lastPoint[0] > lat && point[0] < lat)) {
          var slope = (point[1] - lastPoint[1]) / (point[0] - lastPoint[0]);
          var testPoint = slope * (lat - lastPoint[0]) + lastPoint[1];
          if (testPoint < lng) {
            rayTest++;
          }
        }

        lastPoint = point;
      }

      allPolygons.push({
        polygon: polygon,
        coords: coords
      });

      // If the count is odd, we are in the polygon
      var odd = (rayTest % 2 === 1);
      inZone = inZone || odd;
      if (odd) {
        selectedPolygon = polygon;
      }
    });

    return {
      allPolygons: allPolygons,
      inZone: inZone,
      selectedPolygon: selectedPolygon
    };
  };

  var mapClickHandler = function(e) {
    if (_needsLoader > 0) {
      return;
    }
    
    hideInfoWindow();
    
    if (e.latLng) {
      var lat = e.latLng.lat();
      var lng = e.latLng.lng();
    } else {
      var lat = e.latlng.lat;
      var lng = e.latlng.lng;
    }
    

    var candidates = [];
    $.each(_boundingBoxes, function(i, v) {
      var bb = v.boundingBox;
      if (lat > bb.ymin && lat < bb.ymax &&
      lng > bb.xmin &&
      lng < bb.xmax) {
        candidates.push(v.name);
        // candidates.push(slugifyName(v.name));
      }
    });

    _needsLoader = candidates.length;
    setTimeout(function() {
      if (_needsLoader > 0) {
        showLoader();
      }
    }, 500);

    clearZones();
    $.each(candidates, function(i, v) {
      drawZone(v, lat, lng, function() {
        $.each(_hoverPolygons, function(i, p) {
          _mapper.removePolygon(p);
        });
        _hoverPolygons = [];
        _currentHoverRegion = null;
      });
    });
  };

  var mouseMoveHandler = function(e) {
    if (e.latLng) { // google and overlayer
      var lat = e.latLng.lat();
      var lng = e.latLng.lng();
    } else {
      var lat = e.latlng.lat;
      var lng = e.latlng.lng;
    }

    $.each(_boundingBoxes, function(i, v) {
      var bb = v.boundingBox;
      if (lat > bb.ymin && lat < bb.ymax &&
      lng > bb.xmin &&
      lng < bb.xmax) {
        var hoverRegion = _hoverRegions[v.name];
        if (!hoverRegion) {
          return;
        }
                        
        var result = hitTestAndConvert(hoverRegion.hoverRegion, lat, lng);
        var slugName = slugifyName(v.name);
        if (result.inZone && slugName !== _currentHoverRegion &&
          slugName !== _selectedRegionKey) {

          clearHover();
          
          var allHoverZones = _getSameOffsetZones( v.name );
          
          _currentHoverRegion = slugName;
          
          for (var i = 0; i < allHoverZones.length; i++) {
            var _region = _hoverRegions[ allHoverZones[i] ];
            if (!_region) {
              continue;
            }
            var _result = hitTestAndConvert(_region.hoverRegion, lat, lng);
            $.each(_result.allPolygons, function(i, polygonInfo) {
              var mapPolygon = _mapper.addPolygon(polygonInfo.coords, {
                color: '#444444',
                opacity: 0.7,
                width: 1
              }, {
                color: '#888888',
                opacity: 0.5
              }, mapClickHandler, null);

              _hoverPolygons.push(mapPolygon);
            });
            
            if (_options.onHover) {
              var transition = getCurrentTransition(_region.transitions);
              _options.onHover(transition[1], transition[2]);
            }
          }
        }
      }
    });
  };

  selectPolygonZone = function(polygon) {
    _selectedPolygon = polygon;

    var transition = getCurrentTransition(
      _transitions[polygon.name]);

    var olsonName = polygon.name;
    var utcOffset = transition[1];
    var tzName = transition[2];

    if (_options.onSelected) {
      _options.onSelected(olsonName, utcOffset, tzName);
    }
    else {
      var pad = function(d) {
        if (d < 10) {
          return '0' + d;
        }
        return d.toString();
      };

      var now = new Date();
      var adjusted = new Date();
      adjusted.setTime(adjusted.getTime() +
        (adjusted.getTimezoneOffset() + utcOffset) * 60 * 1000);

      showInfoWindow('<h2>' +
        olsonName + ' ' +
        '(' + tzName + ')</h2>' +
        '<div class="metadata">' +
        '<div>Current Time: ' +
        pad(adjusted.getHours()) + ':' +
        pad(adjusted.getMinutes()) + ':' +
        pad(adjusted.getSeconds()) + '</div>' +
        '<div>Your Time: ' +
        pad(now.getHours()) + ':' +
        pad(now.getMinutes()) + ':' +
        pad(now.getSeconds()) + '</div>' +
        '<div>UTC Offset (in hours): ' +
        (utcOffset / 60) + '</div>' +
        '</div>');
    }
  };

  showInfoWindow = function(content, callback) {
    // Hack to get the centroid of the largest polygon - we just check
    // which has the most edges
    var centroid;
    var maxPoints = 0;
    if (_selectedPolygon.points.length > maxPoints) {
      centroid = _selectedPolygon.centroid;
      maxPoints = _selectedPolygon.points.length;
    }

    hideInfoWindow();

    _mapper.showInfoWindow(_mapper.createPoint(centroid[1], centroid[0]), content,
          callback);
  };

  var showLoader = function() {
    _loader = $('<div style="background: url(' + _maskPng +
    ');z-index:10000;position: absolute;top:0;left:0;">' +
    '<img style="position:absolute;' +
    'top:50%; left:50%;margin-top:-8px;margin-left:-8px" ' +
    'src="' +
    _loaderGif +
    '" /></div>');
    _loader.height(_self.height()).width(_self.width());
    _self.append(_loader);
  };

  slugifyName = function(name) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  };

  var methods = {
    init: function(options) {
      _self = this;

      // Populate the options and set defaults
      _options = options || {};
      _options.initialZoom = _options.initialZoom || 2;
      _options.initialLat = _options.initialLat || 0;
      _options.initialLng = _options.initialLng || 0;
      _options.strokeColor = _options.strokeColor || '#ff0000';
      _options.strokeWeight = _options.strokeWeight || 2;
      _options.strokeOpacity = _options.strokeOpacity || 0.7;
      _options.fillColor = _options.fillColor || '#ffcccc';
      _options.fillOpacity = _options.fillOpacity || 0.5;
      _options.jsonRootUrl = _options.jsonRootUrl || 'tz_json/';
      _options.date = _options.date || new Date();

      _options.mapOptions = $.extend({
        zoom: _options.initialZoom,
        centerLat: _options.initialLat,
        centerLng: _options.initialLng
      }, _options.mapOptions);

      if (typeof _options.hoverRegions === 'undefined') {
        _options.hoverRegions = true;
      }
      
      
      _mapper = new LeafletMapper(_self.get(0),
        mapClickHandler,
        _options.hoverRegions ? mouseMoveHandler : null,
        _options.mapOptions
      );

      // Load the necessary data files
      var loadCount = _options.hoverRegions ? 2 : 1;
      var checkLoading = function() {
        loadCount--;
        if (loadCount === 0) {
          hideLoader();

          if (_options.onReady) {
            _options.onReady();
          }
        }
      };

      showLoader();
      $.get(_options.jsonRootUrl + 'bounding_boxes.json', function(data) {
        _boundingBoxes = typeof data === 'string' ? JSON.parse(data) : data;
        $.each(_boundingBoxes, function(i, bb) {
          $.extend(_zoneCentroids, bb.zoneCentroids);
        });
        checkLoading();
      });

      if (_options.hoverRegions) {
        $.get(_options.jsonRootUrl + 'hover_regions.json', function(data) {
          var hoverData = typeof data === 'string' ? JSON.parse(data) : data;
          $.each(hoverData, function(i, v) {
            _hoverRegions[v.name] = v;
          });
          checkLoading();
        });
      }
    },
    setDate: function(date) {
      hideInfoWindow();
      _options.date = date;
    },
    hideInfoWindow: hideInfoWindow,
    showInfoWindow: function(content, callback) {
      showInfoWindow(content, callback);
    },
    selectZone: function(olsonName) {
      var centroid = _zoneCentroids[olsonName];
      if (centroid) {
        mapClickHandler({
          latLng: {
            lat: function() {
              return centroid[1];
            },
            lng: function() {
              return centroid[0];
            }
          }
        });
      }
    }
  };

  $.fn.timezonePicker = function(method) {

    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    }
    else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    }
    else {
      $.error('Method ' + method + ' does not exist on jQuery.timezonePicker.');
    }
  };

  _loaderGif = "data:image/gif;base64,R0lGODlhEAAQAPIAAKqqqv///729vejo6P///93d3dPT083NzSH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==";
  _maskPng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJDgA6CHKQBUUAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAADUlEQVQI12NgYGDwAQAAUQBNbrgEdAAAAABJRU5ErkJggg==";
})(jQuery);
