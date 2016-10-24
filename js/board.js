// ------ BOARD

function Board(id, name) {
	var self = this;

	this.id = id;
	this.name = name;
	this.$element = createBoard();

	function createBoard() {
		var	$board = $('<div>').addClass('board');
		var $boardTitle = $('<h1>').addClass('board-title').text(self.name);
		var $boardColumnList = $('<ul>').addClass('board-column-list');
		var $pseudoColumn = $('<li>').addClass('pseudo-column');
		var $inputAddColumn = $('<input>').addClass('input-add-column')
			.attr('placeholder', 'Dodaj kolumnę...');
		var $btnAddColumn = $('<button>').addClass('btn btn-add-column').text(' + ');

		$btnAddColumn.click(function(){
			var columnName = $inputAddColumn.val();
			if (columnName !== '') {

				$.ajax({
					url: baseUrl + '/column',
					method: 'POST',
					data: {
						name: columnName
					},
					success: function(response) {
						self.addColumn(new Column( response.id, columnName ));
					}
				});
				$inputAddColumn.val('');
				return true;						

			}
			alert('Podaj nazwę');
			return false;
		});
		$inputAddColumn.on('keydown', function(event){
			if (event.keyCode === 13) {
				$btnAddColumn.click()
			}
		});

		$board.append($boardTitle)
			.append($boardColumnList);
		$boardColumnList.append($pseudoColumn)
		$pseudoColumn.append($inputAddColumn).append($btnAddColumn);
		return $board;
	};
};

Board.prototype = {
	addColumn: function(column) {
		this.$element.children('ul').children('.pseudo-column').before(column.$element);
		initSortable();
	}
};

function initSortable() {
	$('.column-card-list').sortable({
		connectWith: '.column-card-list',
		placeholder: 'card-placeholder',
		receive: function(event, ui) {
			console.log(ui.item);
			console.log(event.target);
			var cardId = ui.item.children('div.id').text();
			var targetColumn = $(event.target).parent();
			console.log(targetColumn);
			var targetColumnId = targetColumn.children('div.id').text();
			console.log(cardId);
			console.log(targetColumnId);	


			$.ajax({
				url: baseUrl + '/card/' + cardId,
				method: 'PUT',
				data: {
					id: cardId,
					name: ui.item.children('p.card-description').text(),
					bootcamp_kanban_column_id: targetColumnId
				}
			});
		}
	}).disableSelection();
};

