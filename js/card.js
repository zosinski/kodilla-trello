// ------ CARD

function Card(id, description) {
	var self = this;

	// this.id = randomString();
	this.id = id;
	this.description = description || '';
	this.$element = createCard();
	function createCard() {
		var $card = $('<li>').addClass('card');
		var $cardId = $('<div>').addClass('id').text(self.id);
		var $cardDescription = $('<p>').addClass('card-description').text(self.description);
		var $cardDelete = $('<button>').addClass('btn btn-delete').text('x');

		$cardDelete.click(function(){
			self.removeCard();
		});

		$card.append($cardDelete)
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
	}
};
