(function () {

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

})();