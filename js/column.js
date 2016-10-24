// ------ COLUMN

function Column(id, name, backgroundColor) {
	var self = this;

	// this.id = randomString();
	this.id = id;
	this.name = name;
	this.backgroundColor = backgroundColor || 'white';
	this.$element = createColumn();
	function createColumn() {
		var $column = $('<li>').addClass('column');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnId = $('<div>').addClass('id').text(self.id);
		// var $columnContainer = $('<div>').addClass('column-container');
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnNav = $('<div>').addClass('nav-column');
		var $columnDelete = $('<button>').addClass('btn btn-delete').text('x');
		var $columnColor = $('<input>').addClass('btn color-picker').attr('type', 'color');
		var $pseudoCard = $('<li>').addClass('pseudo-card');
		var $inputAddCard = $('<input>').addClass('input-add-card')
			.attr('placeholder', 'Dodaj kartę...');
		var $btnAddCard = $('<button>').addClass('btn btn-add-card').text(' + ');

		$columnDelete.click(function() {
			self.removeColumn();
		});
	

		$btnAddCard.click(function() {
			var cardDescription = $inputAddCard.val();
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
				$inputAddCard.val('');
				return true;
			};
			alert('Podaj nazwę');
			return false;
		});

		$inputAddCard.on('keydown', function(event) {
			if (event.keyCode === 13) {
				$btnAddCard.click();
			}
		});

		$columnColor.on('change', function(event) {
			this.backgroundColor = $columnColor.val();
			self.$element.css('background-color', this.backgroundColor);
		});

		$columnNav.append($columnColor).append($columnDelete)
		$pseudoCard.append($inputAddCard).append($btnAddCard);
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




