function find_letter(grd)
{
	var lgrd;
	switch(grd)
	  {		  
		  case '4':
		  lgrd = "A";
		  break;
		  
		  case '3.7':
		  lgrd = "A-";
		  break;
		  
		  case '3.3':
		  lgrd = "B+";
		  break;
		  
		  case '3':
		  lgrd = "B";
		  break;
		  
		  case '2.7':
		  lgrd = "B-";
		  break;
		  
		  case '2.3':
		  lgrd = "C+";
		  break;
		  
		  case '2':
		  lgrd = "C";
		  break;
		  
		  case '1.7':
		  lgrd = "C-";
		  break;
		  
		  case '1.3':
		  lgrd = "D+";
		  break;
		  
		  case '1':
		  lgrd = "D";
		  break;
		  
		  case '0.7':
		  lgrd = "D-";
		  break;
		  
		  case '0':
		  lgrd = "F";
		  break;
		  
		  case '-1':
		  lgrd = "NA";
		  break;
	  };
	  
	  return lgrd;	   
}

function addTable()
{	 
  var course_data = document.getElementById("coursestable");
  
  while (course_data.firstChild)   
    course_data.removeChild(course_data.firstChild);

  var table = document.createElement('TABLE');

  var tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);
  
  var heads = ["Course Code", "Course Name", "Credits", "Grade"];
  for (var h = 0; h<heads.length; h++) 
  {
	var th = document.createElement('TH');
	th.innerHTML = heads[h];
	tableBody.appendChild(th);
  }
  
  for (var i = 0; i < ccodes.length; i++) 
  {
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);

      var td1 = document.createElement('TD');
      td1.width = '100';
	  td1.innerHTML = ccodes[i];
      tr.appendChild(td1);
	  
	  var td2 = document.createElement('TD');
      td2.width = '280';
	  td2.innerHTML = cnames[i];
      tr.appendChild(td2);
	  
	  var td3 = document.createElement('TD');
      td3.width = '70';	  
	  td3.className = 'center';
	  td3.innerHTML = credits[i];
      tr.appendChild(td3);
	  
	  var td4 = document.createElement('TD');
      td4.width = '70';
	  td4.className = 'center';
	  td4.innerHTML = find_letter(grades[i]);
      tr.appendChild(td4)
  }
  
  course_data.appendChild(table);  
  
  calc_cgpa();
}

function calc_cgpa()
{
  // CGPA CALCULATION //////////////////////////////////////////
  var cur_crd;
  var cur_coll;
  var totalcredits = 0;
  var collected = 0;
  var cgpa;
  
  document.getElementById('p1').innerHTML = null;
  for(var i=0; i<credits.length; i++)
  {
		cur_crd = parseInt(credits[i],10);
		
		if(grades[i].localeCompare("-1") == 0)
			cur_col = cur_crd * 0;
		else
			cur_col = cur_crd * parseFloat(grades[i]);
		
		totalcredits += cur_crd;
		collected += cur_col;
  }
  
  cgpa = collected / totalcredits;
  
  // CGPA DISPLAY //////////////////////////////////////////
  document.getElementById('p1').innerHTML = null;
  document.getElementById('p1').innerHTML += "Total Credits : " + totalcredits + "<br>";
  document.getElementById('p1').innerHTML += "Collected Crd.: " + collected.toFixed(2) + "<br>";
  document.getElementById('p1').innerHTML += "CGPA          : " + cgpa + "<br>";
}


function fetchvalues(prev_form)
{
	var oForm = document.getElementById(prev_form);	
	
	document.getElementById('p1').innerHTML = null;	
			
	for(var i=0; i<oForm.elements.length; i++)
		switch(oForm.elements[i].name)
		{
			case 'ccode':
				ccodes.push(oForm.elements[i].value);								
			break;
			
			case 'cname':
				cnames.push(oForm.elements[i].value);
			break;
			
			case 'credits':
				if(oForm.elements[i].checked)
					credits.push(oForm.elements[i].value);
			break;
			
			case 'lgrade':
				grades.push(oForm.elements[i].value);				
			break;
		};
		
		addTable();		
}
