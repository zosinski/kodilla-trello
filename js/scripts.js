$(function(){

	// ----- TOOLS
	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = '';
		var i = 0;
		for (i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		};
		return str;
	};


	// ------ COLUMN
	function Column(name, backgroundColor) {
		var self = this;

		this.id = randomString();
		this.name = name;
		this.backgroundColor = backgroundColor || 'white';
		this.$element = createColumn();
		function createColumn() {
			var $column = $('<li>').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
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
				if ($inputAddCard.val() !== '') {
					self.addCard(new Card( $inputAddCard.val() ));
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
			$column.append($columnTitle)
				.append($columnNav)
				.append($columnCardList);
			$pseudoCard.append($inputAddCard).append($btnAddCard)
			$columnCardList.append($pseudoCard);
			return $column;
		};
	};

	Column.prototype = { 
		addCard: function(card) {
			this.$element.children('ul').children('.pseudo-card').after(card.$element);
		},
		
		removeColumn: function() {
			this.$element.remove();
		}
	};

	// ------ CARD
	function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description || '';
		this.$element = createCard();
		function createCard() {
			var $card = $('<li>').addClass('card');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn btn-delete').text('x');

			$cardDelete.click(function(){
				self.removeCard();
			});

			$card.append($cardDelete)
				.append($cardDescription);

			return $card;
		};
	};

	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	};

	// ------ BOARD

	function Board(name) {
		var self = this;

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
				if ($inputAddColumn.val() !== '') {
					self.addColumn($inputAddColumn.val());
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
		addColumn: function(name) {
			var column = new Column(name);
			this.$element.children('ul').children('.pseudo-column').before(column.$element);
			initSortable();
		}
	};

	function initSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder'
		}).disableSelection();
	};


	// DASHBOARD 

	initialize();

	function initialize() {
		var dashboard = $('section.main');
		var inputAddBoard = $('<input>').addClass('add-board').attr('placeholder', 'Dodaj tablicę...');
		var btnAddBoard = $('<button>').addClass('btn btn-add-board').text(' + ');

		btnAddBoard.click(function() {
			if (inputAddBoard.val() !== '') {
				addBoard();
				inputAddBoard.val('');				
				return true;
			}
			alert('Podaj nazwę');
			return false;
		});
		
		inputAddBoard.on('keydown', function(event){
			if (event.keyCode === 13) {
				btnAddBoard.click();
			}
		});

		function addBoard(){
				var board = new Board(inputAddBoard.val());
				dashboard.append(board.$element);
		};

		dashboard.append(inputAddBoard).append(btnAddBoard);
		inputAddBoard.focus();
	}

});

