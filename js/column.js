// ------ COLUMN

function Column(id, name, backgroundColor) {
	var self = this;

	this.id = id;
	this.name = name;
	this.backgroundColor = backgroundColor || 'white';
	this.$element = createColumn();
	function createColumn() {
		var $column = $('<li>').addClass('column').attr('id', id);
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnId = $('<div>').addClass('id').text(self.id);
		// var $columnContainer = $('<div>').addClass('column-container');
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnNav = $('<div>').addClass('nav-column');
		var $btnColumnDelete = $('<button>').addClass('btn btn-delete').text('x');
		var $columnColorPicker = $('<input>').addClass('btn color-picker').attr('type', 'color');
		var $pseudoCard = $('<li>').addClass('pseudo-card');
		// var $inputAddCard = $('<input>').addClass('input-add-card')
		// 	.attr('placeholder', 'Dodaj kartę...');
		var $textareaAddCard = $('<textarea>').addClass('textarea-add-card')
			.attr('placeholder', 'Dodaj kartę...')
			.attr('rows', 2)
			.attr('cols', 34)
			.attr('wrap', 'soft');
		var $btnAddCard = $('<button>').addClass('btn btn-add-card').text(' + ');

		$btnColumnDelete.click(function() {
			self.removeColumn();
		});
	

		$btnAddCard.click(function() {
			// var cardDescription = $inputAddCard.val();
			var cardDescription = $textareaAddCard.val();
			if (cardDescription !== '') {
				$.ajax({
					url: baseUrl + '/card',
					method: 'POST',
					data: {
						name: cardDescription,
						bootcamp_kanban_column_id: self.id
					},
					success: function(response){
						self.addCard(new Card( response.id, cardDescription ));
					}
				});
				// $inputAddCard.val('');
				$textareaAddCard.val('');
				return true;
			};
			showAlert('Podaj treść karty', 'danger', 3000);
			return false;
		});

		// $inputAddCard.on('keydown', function(event) {
		$textareaAddCard.on('keydown', function(event) {
			if (event.keyCode === 13 && !event.shiftKey) {
				$btnAddCard.click();
			}
		});

		$columnColorPicker.on('change', function(event) {
			this.backgroundColor = $columnColor.val();
			self.$element.css('background-color', this.backgroundColor);
		});

		$columnNav.append($columnColorPicker).append($btnColumnDelete);
		// $pseudoCard.append($inputAddCard).append($btnAddCard);
		$pseudoCard.append($textareaAddCard).append($btnAddCard);
		$column.append($columnTitle)
			.append($columnId)
			.append($columnNav)
			.append($pseudoCard)
			.append($columnCardList);
		// $columnCardList.append($pseudoCard);
		return $column;
	};
};

Column.prototype = { 
	addCard: function(card) {
		this.$element.children('ul').append(card.$element);
	},
	
	removeColumn: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'DELETE',
			success: function(response){
				self.$element.remove();
			}
		});
	}
};




