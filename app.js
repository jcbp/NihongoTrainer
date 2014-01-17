
ko.bindingHandlers.popover = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var options = valueAccessor();
        var defaultOptions = { trigger: 'hover', html: true, placement: "bottom", delay: { show: 800, hide: 100 } };
        options = $.extend(true, {}, defaultOptions, options);
        $(element).popover(options);
        if (options.highlightWord) {
			$(element).on('shown.bs.popover', function() {
				$(element).addClass("word-selected");
			});
        }
    }
};

ko.bindingHandlers.wanakana = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
		wanakana.bind(element);
    }
};

ko.bindingHandlers.wanakanaValue = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
    	$(element).on("keyup", function() {
    		valueAccessor()(wanakana.toRomaji(element.value));
    	});
    }
};

ko.bindingHandlers.clickIfEnable = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
    	$(element).on("click", function() {
    		if (!$(element).hasClass("disabled") && !$(element.parentNode).hasClass("disabled")) {
				valueAccessor().call(viewModel, element);
			}
    	});
    }
};

var getPercent = function(total, index) {
	return (index / total * 100) + "%";
};

var AppViewModel = function() {

	var lessonIndex = 0;
	var lastCardSelected = null;
	var that = this;

	this.units = ko.observable(Units);
	this.valid = ko.observable(false);
	this.validationEnabled = ko.observable(true);
	this.continueEnabled = ko.observable(false);
	this.showResult = ko.observable(false);
	this.answer = ko.observable("");
	this.unit = ko.observable();
	this.lesson = ko.observable();
	this.progress = ko.observable();
	this.remaining = ko.observable();
	this.attempts = ko.observable(3);

	this.selectWord = function(element, data) {
		//$(element).addClass("word-selected");
	};

	this.selectCard = function(element, data) {
		if (lastCardSelected) {
			$(lastCardSelected).removeClass("card-selected");
		}
		lastCardSelected = element;
		$(element).addClass("card-selected");
		this.answer(data.reading || data.text);
	};

	this.getCardPopoverContent = function(data) {
		var html = "<b><i>" + data.reading + "</i></b>";
		return html;
	};

	this.getWordPopoverContent = function(data) {
		var html = "<b><i>" + data.word + "</i></b><br />";
		if (data.reading) {
			html += "<div style='font-size: 11px'>(" + data.reading + ")</div>";
		}
		html += this.replaceHiragana(data.dic);
		return html;
	};

	this.getHiragana = function(text) {
		return wanakana.toHiragana(text);
	};

	this.replaceHiragana = function(text) {
		return text.replace(/%(.*?)%/g, function($0, $1) {
			return wanakana.toHiragana($1);
		});
	};

	this.validate = function() {
		if (this.answer()) {
			this.validationEnabled(false);
			var regexp = new RegExp(this.lesson().validation[0].replace(/ /g, " +"), "i");
			this.valid(this.answer().replace(regexp, "") === "");
			this.showResult(true);
			if (!this.valid()) {
				this.attempts(this.attempts() - 1);
			}
			this.continueEnabled(true);
		}
	};

	this.startUnit = function(data) {
		$.get(data.source, null, function(unitData) {
			unitData = eval("(" + unitData + ")");
			that.unit(unitData);
			lessonIndex = 0;
			that.lesson(unitData[lessonIndex]);
			that.progress(getPercent(unitData.length, lessonIndex));
			that.remaining(unitData.length - lessonIndex);
			$('#mainModal').modal("show");
		}, "text");
	};

	this.next = function() {
		lessonIndex++;
		this.valid(false);
		this.showResult(false);
		this.lesson(this.unit()[lessonIndex]);
		this.progress((lessonIndex / this.unit().length * 100) + "%");
		this.remaining(this.unit().length - lessonIndex);
		this.answer("");
		this.continueEnabled(false);
		this.validationEnabled(true);
		$(".thumbnail").popover({
			placement: "bottom",
			html: true,
			trigger: "hover",
			content: "<b><i>bla</i></b>"
		});
	};

	this.closeLesson = function() {
		$('#mainModal').modal("hide");
	};
};

$(document).ready(function() {
	ko.applyBindings(new AppViewModel());
	$('#mainModal').modal({
		backdrop: "static",
		show: false
	});
});
