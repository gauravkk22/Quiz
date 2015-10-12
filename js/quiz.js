$(document).ready(function()
{
	createQuizLayout();
	initQuiz();

});

function createQuizLayout()
{
		//declare array of countries and their capitals

		var countries = ["USA","UK","India","Germany","Turkey","France","Nepal","Japan","South Africa","Maldives"];
		var capitals = ["Washington","London","Delhi","Berlin", "Istanbul","Paris","Kathmandu","Tokyo","Captown","Male"];
		var arrCountry =[];
		for (var i = 0; i < countries.length; i++) {
			arrCountry.push('<li data-index="' + (i+1) + '">' + countries[i] + '</li>');
		}
		

		var arrCapital = [];
		for(var i=0; i<capitals.length;i++)
		{
			arrCapital.push('<li data-index="' + (i+1) + '">' + capitals[i] + '</li>');

		}

		arrCountry = shuffle(arrCountry);
		arrCapital = shuffle(arrCapital);

		$('#source ').html(arrCountry.join(''));
		$('#target ').html(arrCapital.join(''));
};

function shuffle(o)
{
		for (var j,x,i = o.length; i; j=Math.floor(Math.random() * i) ,x = o[--i], o[i] = o[j],o[j] = x ); 
			
			return o;
};

function initQuiz()
{
	$('#source li').draggable(
	{
		revert:true,
		revertDuration: 200,
		cursor: "move"
	});


	var totalScore=0;
	$('#score').text(totalScore + ' points.');
	$('#target li').droppable(
	{
		accept:function(draggable)
		{
			if(parseInt(draggable.data('index'),10) === parseInt($(this).data('index'),10))
			{
				return true;
			}
			else
			{
				return false;
			}
		},
		drop: function(event, ui)
		{
			var that = $(this);
			that.addClass("ui-state-highlight").html('Correct!').effect('bounce');
			that.droppable('disable');
			ui.draggable.addClass('correct ui-state error');
			(ui.draggable).draggable('disable');

			totalScore++;
			$('#score').text(totalScore + 'points.');
			if($('li.correct').length == 10)
			{
				$("#dialog-complete").dialog({
					resizable:false,
					modal:true
				});
			}
		}
	});
}
