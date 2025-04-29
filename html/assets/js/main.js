$(function () {
	$("#option-list")
		.sortable({
			items: ".droppable-slot",
		})
		.disableSelection();

	$(".draggable").draggable({
		connectToSortable: "#option-list",
		cursor: "move",
		revert: "invalid",
	});
});

// Event onchange;
$("#select-lineup").on("change", function () {
	let _this = $(this);
	let lineup = _this.val();
	let [DF, MF, FW] = lineup.split("-");
	
	addDesc('desc-lineup-number', lineup);
	createLineUp("DF", DF);
	createLineUp("MF", MF);
	createLineUp("FW", FW);
	createLineUp("GK", 1);
});

$("#select-team").on("change", function () {
	let _this = $(this);
	let team = _this.val();
	addDesc('desc-logo-title', team);
})

const createLineUp = (id, positionLineUp) => {
	$(`#${id}`).empty();
	for (let i = 1; i <= positionLineUp; i++) {
		$(`#${id}`).append(dropElement);
	}

	initDroppable("droppable-slot", "draggable");
};

const dropElement = `<div
						class="droppable-slot flex justify-center items-center relative w-full h-full after:bg-amber-400 after:opacity-50 after:rounded-full after:absolute after:content-[''] after:w-[24px] after:h-[24px] after:top-[50%] after:left-[50%] after:-translate-1/2">
					</div>`;

const initDroppable = (className, acceptDrag) => {
	$(`.${className}`).droppable({
		accept: `.${acceptDrag}`,
		tolerance: "fit",
		drop: function (event, ui) {
			console.log(1);
			let _this = event.target;
			let draglement = ui.draggable;
			let swapChildElement = _this.firstElementChild;
			let droppedPrev = draglement.parent()[0];

			if (swapChildElement) {
				if (!draglement.hasClass("dropped")) {
					$(swapChildElement)
						.removeClass("dropped")
						.attr("style", "position:relative;");
					$("#option-list").append(swapChildElement);
				} else {
					$(droppedPrev)
						.addClass("after:hidden")
						.append($(swapChildElement));
				}
			}
			$(_this)
				.addClass("after:hidden")
				.append(
					draglement
						.addClass("dropped")
						.removeAttr("style")
						.attr("style", "position:relative;")
				);
		},
		out: function (event, ui) {
			let _this = event.target;

			setTimeout(() => {
				if (_this.children.length === 0) {
					$(_this).removeClass("after:hidden");
				}
			}, 1000);
		},
	});
};

const addDesc = (id, content) => {

  $(`#${id}`).empty().append(content);
}
