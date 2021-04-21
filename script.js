var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function doUpdate() {
	var rand = Math.floor( Math.random() * 26 );
	var myData = letters.slice(0, rand).split(''); 
    var input = document.getElementById("input").value
	if (input) {
        myData = input
    }
    update(myData);
}

function update(data) {
	var u = d3.select('#content')
	  .selectAll('div')
	  .data(data);

	u.enter()
	  .append('div')
	  .merge(u)
		.text(function(d) {
			return d;
		});

	u.exit().remove();
}

doUpdate();