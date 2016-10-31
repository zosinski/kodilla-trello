// ------ CARD

function Card(id, description) {
	var self = this;

	// this.id = randomString();
	this.id = id;
	this.description = description || '';
	this.$element = createCard();
	function createCard() {
		var $card = $('<li>').addClass('card').attr('id',self.id);
		var $cardId = $('<div>').addClass('id').text(self.id);
		var $cardDescription = $('<p>').addClass('card-description').text(self.description);
		var $btnCardEdit = $('<button>').addClass('btn btn-edit').text('edit');
		var $btnCardDelete = $('<button>').addClass('btn btn-delete').text('x');

		$btnCardDelete.click(function(){
			self.removeCard();
		});
		$btnCardEdit.click(function(){
			self.editCard();
		})

		$card.append($btnCardEdit)
			.append($btnCardDelete)
			.append($cardId)
			.append($cardDescription);

		return $card;
	};

};

Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function() {
				self.$element.remove();
			}
		});
	},
	editCard: function() {
		var self = this;
		var updatedDescription = modalEditCard(this);
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'PUT',
			data: {
				id: self.id,
				name: updatedDescription,
				bootcamp_kanban_column_id: self.bootcamp_kanban_column_id
			},
			success: function() {
				self.$cardDescription = updatedDescription;
				alert(self.description);
			},
			error: function(response) {
				//tymczasowa obsługa mimo błędu 500 serwera, żeby sprawdzić działania frontendu
				self.$cardDescription = updatedDescription;
				alert(self.description);	
			}
		});
	}
};

function modalEditCard(cardObj) {
	var $tempCard = $('<li>').addClass('pseudo-card');
	var $textareaEditCard = $('<textarea>').addClass('textarea-add-card')
		.attr('rows', 2)
		.attr('wrap', 'soft');
	var $textareaEditCard.text() = 'ddddd';
	var $btnSaveCard = $('<button>').addClass('btn btn-add-card').text(' + ');

	$btnSaveCard.click(function() {
		var cardDescription = $textareaEditCard.val();
		if (cardDescription !== '') {
			$.ajax({
				url: baseUrl + '/card',
				method: 'POST',
				data: {
					name: cardDescription,
					bootcamp_kanban_column_id: self.id
				},
				success: function(response){
					
				}
			});
			$textareaAddCard.val('');
			return true;
		};
		showAlert('Podaj treść karty', 'danger', 3000);
		return false;
	});

	$textareaEditCard.on('keydown', function(event) {
		if (event.keyCode === 13 && !event.shiftKey) {
			$btnSaveCard.click();
		}
	});

	$.append.$tempCard;
	return $textareaEditCard.val();
};


	
