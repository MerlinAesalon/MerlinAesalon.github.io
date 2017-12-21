window.onload = function(e) {
	// Hide Javascript disabled notice
	document.getElementById('javascriptnotice').style.display = 'none';
};

function process() {
	var roles = $( '#roles' ).val();                // Get dirty role data
	roles = tswRollForRole.roleExtracter( roles );  // Extract

	var rolls = $( '#rolls' ).val();        // Get raw data
	rolls = tswrollsorter.extract( rolls ); // Extract
	rolls = tswrollsorter.filter( rolls );  // Filter
	rolls = tswrollsorter.sort( rolls );    // Sort

	var rolls_con = tswrollsorter.condense( rolls );
	var rolls_str = tswrollsorter.format( rolls_con );
	$( 'form .roll-results' ).text( rolls_str );

	var people = [];
	for (var i = 0; i < rolls.length; i++) {
		people.push( rolls[i].person );
	}

	var assignments = tswRollForRole.assigner( roles, people );
	assignments = tswRollForRole.format( assignments );
	$( '#output' ).val( assignments );
}

$( document ).ready(function() {
	// Populate Presets dropdown
	var $rolePresets = $( '#role-presets' );
	$.each( tswRollForRole.rolePresets, function(key, value) {
		var option = $( '<option />' ).val(key).text(key);
		$rolePresets.append(option);
	});

	// Submit button clicked
	$( 'form' ).on('submit', function( event ) {
		event.preventDefault();
		process();
	});

	// Something pasted to rolls
	$( '#rolls' ).on('paste', function( event ) {
		// Brief delay since paste event triggers before content is updated.
		setTimeout(function(){
			process();
		}, 0);
	});

	// Populate Roles textarea on dropdown change
	$( '#role-presets' ).on('change', function( event ) {
		var value = $( this ).val();
		var data = tswRollForRole.roleData( value );
		$( '#roles' ).val( data );

		process();
	});
});
