// ------- API CONFIG
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
	'X-Client-Id': 88,
	'X-Auth-Token': 'f5fd0923173f9fbc73da8a6ee51c1007'
};
$.ajaxSetup({
	headers: myHeaders
});

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



	// DASHBOARD 

	initialize();

	function initialize() {
		var dashboard = $('section.main');
		var inputAddBoard = $('<input>').addClass('add-board').attr('placeholder', 'Dodaj tablicę...');
		var btnAddBoard = $('<button>').addClass('btn btn-add-board').text(' + ');

		$.ajax({
			url: baseUrl + '/board',
			method: 'GET',
			success: function(response) {
				console.log(response);
				setupBoards(response);
			}
		});

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

		function setupBoards(item) {
			// boards.forEach(function(item){
				var board = new Board(item.id, item.name);
				dashboard.append(board.$element);
				setupColumns(board, item.columns);
			// });
		};

		function setupColumns(board, columns) {
			columns.forEach(function(item) {
				var column = new Column(item.id, item.name);
				board.addColumn(column);
				setupCards(column, item.cards);
			});
		};


		function setupCards(column, cards){ // ustawia kolumny na podstawie request do API
			cards.forEach(function(item) {
				console.log(item);
				var card = new Card(item.id, item.name);
				column.addCard(card);
			});
		};

		dashboard.append(inputAddBoard).append(btnAddBoard);
		inputAddBoard.focus();
	}


});

