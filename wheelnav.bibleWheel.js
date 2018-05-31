
bibleWheel = function (divId) {
    this.divId = divId;
    this.wheelnavYear = null;
    this.wheelnavMonth = null;
    this.wheelnavDay = null;
    this.wheelnavHour = null;
    this.wheelnavMin = null;
    this.wheelnavSec = null;
    this.selectionEnable = true;
    this.timeVisible = true;
    this.fixDate = false;
    this.fixTime = false;
    this.slicePathType = "Donut";
    this.percentYearMin = 0.1;
    this.percentYearMax = 0.15;
    this.percentMonthMin = 0.15;
    this.percentMonthMax = 0.3;
    this.percentDayMin = 0.3;
    this.percentDayMax = 0.4;
    this.percentHourMin = 0.4;
    this.percentHourMax = 0.6;
    this.percentMinMin = 0.6;
    this.percentMinMax = 0.8;
    this.percentSecMin = 0.8;
    this.percentSecMax = 0.97;
};

bibleWheel.prototype.initWheelNav = function (wheelnav, minPercent, maxPercent, sliceType, fixed) {
    wheelnav.slicePathCustom = new slicePathCustomization();
    wheelnav.sliceSelectedPathCustom = new slicePathCustomization();
    wheelnav.sliceHoverPathCustom = new slicePathCustomization();
    wheelnav.slicePathFunction = slicePath().DonutSlice;
    wheelnav.slicePathCustom.minRadiusPercent = minPercent;
    wheelnav.slicePathCustom.maxRadiusPercent = maxPercent;
    wheelnav.sliceSelectedPathCustom.minRadiusPercent = minPercent;
    wheelnav.sliceSelectedPathCustom.maxRadiusPercent = maxPercent;    
	wheelnav.titleRotateAngle = 90;

    wheelnav.slicePathAttr = {
        fill: "black",
        stroke: "gold",
        "stroke-width": 1,
        cursor: 'pointer',
        opacity: 0.35
    };

    wheelnav.titleAttr = { 
    	fill: "gold"
    };
    
    wheelnav.titleSelectedAttr = { 
    	fill: "white"
    };

    wheelnav.animateeffect = "linear";
    wheelnav.navAngle = -98;
    wheelnav.animatetime = 2000;
};

bibleWheel.prototype.createWheelNav = function () {
    this.wheelnavYear = new wheelnav(this.divId);
    this.initWheelNav(this.wheelnavYear, this.percentYearMin, this.percentYearMax, this.slicePathType, this.fixDate);
    this.wheelnavDay = new wheelnav(this.divId + "Day", this.wheelnavYear.raphael);
    this.initWheelNav(this.wheelnavDay, this.percentDayMin, this.percentDayMax, this.slicePathType, this.fixDate);
    
    var letters = [];

    for (var i = 1487 + 27; i > 1487; i--) {
        if ([1498, 1501, 1503, 1507, 1509].indexOf(i) !== -1) continue;
        letters.push(String.fromCharCode(i));
    }

    var books = [
        "GEN", "EXO", "LEV", "NUM", "DEU",
        "JOS", "JDG", "RUT", "1SA", "2SA",
        "1KI", "2KI", "1CH", "2CH", "EZR",
        "NEH", "EST", "JOB", "PSA", "PRO",
        "ECC", "SOS", 

        "ISA", "JER", "LAM", "EZE", "DAN", 
        "HOS", "JOE", "AMO", "OBA", "JON",
        "MIC", "NAH", "HAB", "ZEP", "HAG",
        "ZEC", "MAL", "MAT", "MAR", "LUK",
        "JOH", "ACT", 

        "ROM", "1CO", "2CO", "GAL", "EPH", 
        "PHI", "COL", "1TH", "2TH", "1TI",
        "2TI", "TIT", "PHL", "HEB", "JAM",
        "1PE", "2PE", "1JO", "2JO", "3JO",
        "JUD", "REV" 
    ];

    var rbooks = [];

    for (var i = 65; i >= 0; i--) {
        rbooks.push(books[i]);
    }

    books = rbooks;

    this.wheelnavHour = new wheelnav(this.divId + "Hour", this.wheelnavDay.raphael);
    this.initWheelNav(this.wheelnavHour, this.percentHourMin, this.percentHourMax, this.slicePathType, this.fixTime);

    this.wheelnavMin = new wheelnav(this.divId + "Min", this.wheelnavDay.raphael);
    this.initWheelNav(this.wheelnavMin, this.percentMinMin, this.percentMinMax, this.slicePathType, this.fixTime);

    this.wheelnavSec = new wheelnav(this.divId + "Sec", this.wheelnavDay.raphael);
    this.initWheelNav(this.wheelnavSec, this.percentSecMin, this.percentSecMax, this.slicePathType, this.fixTime);

    this.wheelnavDay.createWheel(books.slice(0, 22));
    this.wheelnavHour.createWheel(books.slice(22, 44));
    this.wheelnavMin.createWheel(books.slice(44, 66));
    this.wheelnavSec.createWheel(letters.slice(0, 22));

	var ns = this.wheelnavSec;
	var nm = this.wheelnavMin;
	var nh = this.wheelnavHour;
	var nd = this.wheelnavDay;
	var ws = [ns, nm, nh, nd];
	
	function move(i) {
		for (var wx in ws) {
			if (w === wx) {
				w = null;
				continue;				
			}
			wx = ws[wx];
			wx.navigateWheel(i);
            wx.refreshWheel();
		}
	}

	for (var w in ws) {
		var n = ws.indexOf(w);
		w = ws[w];
		for (var i = 0; i < 22; i++) {
			w.navItems[i].navigateFunction = move.bind(this, i);
		}		
		w.navigateWheel(21);
	}

};
