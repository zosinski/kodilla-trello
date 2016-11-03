// ------ COLUMN

function Column(id, name, backgroundColor) {
	var self = this;

	this.id = id;
	this.name = name;
	this.backgroundColor = backgroundColor || 'white';
	this.$element = createColumn();
	function createColumn() {
		const $column = $('<li>').addClass('panel panel-default column').attr('id', id);
		const $columnBody = $('<div>').addClass('panel-body');
		const $columnTitle = $('<h2>').addClass('column-title').text(name);
		const $columnId = $('<div>').addClass('id').text(id);
		const $columnCardList = $('<ul>').addClass('column-card-list');
		const $columnNav = $('<div>').addClass('nav-column');
		const $btnColumnDelete = $('<button>').addClass('btn btn-delete').text('x');
		// const $columnColorPicker = $('<input>').addClass('btn color-picker').attr('type', 'color');
		const $pseudoCard = $('<li>').addClass('pseudo-card');
		const $textareaAddCard = $('<textarea>').addClass('textarea-add-card')
			.attr('placeholder', 'Dodaj kartę...')
			.attr('rows', 2)
			.attr('wrap', 'soft');
		const $btnAddCard = $('<button>').addClass('btn btn-add-card').text(' + ');

		$btnColumnDelete.click( () => self.removeColumn() );
	

		$btnAddCard.click( () => {
			const cardDescription = $textareaAddCard.val();
			const data = {
						name: cardDescription,
						bootcamp_kanban_column_id: self.id
					};
			console.log(data);
			if (cardDescription !== '') {
				$.ajax({
					url: baseUrl + '/card',
					method: 'POST',
					data: data,
					success: response => {
						self.addCard(new Card( response.id, cardDescription, self.id ));
					}
				});
				console.log('$textareaAddCard: ', $textareaAddCard)
				$textareaAddCard.val('');
				return true;
			};
			showAlert('Podaj treść karty', 'danger', 3000);
			return false;
		});

		// $inputAddCard.on('keydown', function(event) {
		$textareaAddCard.on('keydown', event => {
			if (event.keyCode === 13 && !event.shiftKey) {
				$btnAddCard.click();
				event.preventDefault();
			}
		});

		// $columnColorPicker.on('change', function(event) {
		// 	this.backgroundColor = $columnColor.val();
		// 	self.$element.css('background-color', this.backgroundColor);
		// });

		// $columnNav.append($columnColorPicker).append($btnColumnDelete);
		$columnNav.append($btnColumnDelete);
		$pseudoCard.append($textareaAddCard).append($btnAddCard);
		$column.append($columnBody);
		$columnBody
			.append($columnTitle)
			.append($columnId)
			.append($columnNav)
			.append($pseudoCard)
			.append($columnCardList);

		return $column;
	};
};

Column.prototype = { 
	addCard: function(card) {
		this.$element.find('.column-card-list').append(card.$element);
	},
	
	removeColumn: function() {
		// var self = this;
		$.ajax({
			url: baseUrl + '/column/' + this.id,
			method: 'DELETE',
			success: response => {
				this.$element.remove();
			}
		});
	}
};




