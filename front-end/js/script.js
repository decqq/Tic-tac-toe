(function () {

	// Constants
	var DOMAIN = "";

	// checks if there is a winner
	function isWon (map) {
		var digit = 1
		for (var i = 0; i < 2; i++, digit = 2) {
			if((map[0][0] == digit && map[0][1] == digit && map[0][2] == digit)
			|| (map[1][0] == digit && map[1][1] == digit && map[1][2] == digit)
			|| (map[2][0] == digit && map[2][1] == digit && map[2][2] == digit)

			|| (map[0][0] == digit && map[1][0] == digit && map[2][0] == digit)
			|| (map[0][1] == digit && map[1][1] == digit && map[2][1] == digit)
			|| (map[0][2] == digit && map[1][2] == digit && map[2][2] == digit)

			|| (map[0][0] == digit && map[1][1] == digit && map[2][2] == digit)
			|| (map[0][2] == digit && map[1][1] == digit && map[2][0] == digit))
				return digit;
		}

		return 0;	// no one won so far
	}

	function isFull (map) {
		for (var i = 0; i < 3; i++)
			for (var j = 0; j < 3; j++)
				if(map[i][j] == 0)
					return false;
		return true;
	}
	
	// 0 - empty space
	// 1 - O (computer)
	// 2 - X (player)
	var map = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	];

	// map button event
	$("table button").on("click", function () {

		// disable buttons to prevent multiple clicks
		for (var i = 0; i < 9; i++) {
			$($("#map button")[i]).addClass("disabled");
		}

		// read id of clicked button
		var id = parseInt($(this).context.id);

		// map converted into vector
		var vector = [];

		// map => vector
		for (var i = 0; i < 3; i++)
			for (var j = 0; j < 3; j++)
				vector.push(map[i][j]);
		
		// add new click to vector
		if(vector[id] == 1 || vector[id] == 2){
			for (var i = 0; i < 9; i++)
				$($("#map button")[i]).removeClass("disabled");
			return;
		}
		else{
			vector[id] = 2;
			
			// map changes in vector into map
			for (var i = 0, x = 0; i < 3; i++)
				for (var j = 0; j < 3; j++, x++)
					map[i][j] = vector[x];

			// add glyphicon
			$("button#" + id.toString() + " span").addClass("glyphicon-remove");
		}

		if(isWon(map) == 2){
			alert("You have WON the game!");
		}
		else if(isWon(map) == 1){
			alert("You have LOST the game!");
		}
		else if(isFull(map)){
			alert("TIE! Nobody have won. Try again.");
		}
		else{
			// AJAX call
			$.ajax({
				type: "GET",
				url: DOMAIN + "/move",
				dataType: "jsonp",
				data: {
					array: map
				},
				success: function (res) {
					// update visual effects
					for (var i = 0, x = 0; i < 3; i++)
						for (var j = 0; j < 3; j++, x++)
							if(map[i][j] != res[i][j])
								$("button#" + x.toString() + " span").addClass("glyphicon-record");

					// update map
					map = res;

					// check if someone won
					if(isWon(map) == 2){
						alert("You have WON the game!");
					}
					else if(isWon(map) == 1){
						alert("You have LOST the game!");
					}
					else{
						for (var i = 0; i < 9; i++)
							$($("#map button")[i]).removeClass("disabled");
					}
				},
				error: function (error) {
					alert("Error occured while connecting server! See log for details.");
					console.log(error);
				}
			});
		}

	});

	// reset game button event
	$("button#reset").on("click", function () {
		// reload the page
		window.location.reload(true);
	});

})();