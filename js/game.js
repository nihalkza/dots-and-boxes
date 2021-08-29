function start(){
	const gameArea = document.getElementById('gameArea');
	let limit = prompt("Enter Total Box Number\n(1 to 6)");
	(limit && limit > 6 )?limit = 6:null;
	(limit)?null:limit = 1
	let p1 = prompt("Enter First Player Name");
	(p1)?null:p1 = "Player 1";
	let p2 = prompt("Enter Second Player Name");
	(p2)?null:p2= "Player 2"
	window.localStorage.setItem("BoxGameData",JSON.stringify({
		"countdown":(limit * limit) * 2 + (limit * 2), // (a*a)*2 + a*2
		"p1": {
				"name": p1,
				"score": 0,
				"turn": true,
			},
		"p2": {
				"name": p2,
				"score": 0,
			},
		"turn": "p1"	
		
	}))
	document.getElementById("turn").innerHTML = p1 + " Turn";
	let newData = JSON.parse(window.localStorage.getItem('BoxGameData'))
	// console.log(newData)

	for(let i=0; i<=limit;i++){
			gameArea.innerHTML +=`<br/>`
		for(let j=0; j<=limit;j++){
			let flag = 1;
			if(i != limit){
				flag =0;	
				gameArea.innerHTML += `<div id=h_${i}_${j} class="hLine" onclick="mark(this)"></div>`
			}
			let dotClassName = (flag == 1)?"flagDotMargin":"dot";
			gameArea.innerHTML += `<div id=dot_${i}_${j} class="${dotClassName}"></div>`
			let lastVLineClasss = (i == limit)?"flagLineMargin":"vLine"

			if(j != limit){
				lastVLineFlag = 0;
				gameArea.innerHTML += `<div id=v_${i}_${j} class="${lastVLineClasss}" onclick="mark(this)"></div>`
			}
		}
	}
}

function mark(e){
	
	document.getElementById(e.id).onclick = null;
	document.getElementById(e.id).style.background = "#FF5733";
	document.getElementById(e.id).style.cursor = "not-allowed";
	document.getElementById(e.id).value = 1;

	let newData = JSON.parse(window.localStorage.getItem('BoxGameData'))
	// console.log(e,newData)
	newData.countdown = newData.countdown - 1;
	newData.p1.turn = !(newData.p1.turn);
	(newData.p1.turn)?newData.turn="p1":newData.turn="p2";
	
	// (newData.turn==='p1')?document.getElementById(e.id).style.background = "#FF5733"
	// :document.getElementById(e.id).style.background = "green";

	// console.log(newData)
	document.getElementById("turn").innerHTML = newData[newData.turn].name + " Turn";
	window.localStorage.setItem('BoxGameData',JSON.stringify(newData))
		

	let checkAngel = e.id.charAt(0);
	if(checkAngel == "v"){
		checkVertical(e.id.split("_"));
	}else if(checkAngel == "h"){
		checkHorizontal(e.id.split("_"));
	}
	if(newData.countdown == 0){
		setTimeout(()=>{
			let finalData = JSON.parse(window.localStorage.getItem('BoxGameData'))
			if(finalData.p1.score > finalData.p2.score){
				alert(`${finalData.p1.name} Winner !!\n\n${finalData.p1.name}: ${finalData.p1.score}\n${finalData.p2.name}: ${finalData.p2.score}`);
			}else if(finalData.p2.score > finalData.p1.score){
				alert(`${finalData.p2.name} Winner !!\n\n${finalData.p1.name}: ${finalData.p1.score}\n${finalData.p2.name}: ${finalData.p2.score}`);
			}else{
				alert(`Draw !!\n\n${finalData.p1.name}: ${finalData.p1.score}\n${finalData.p2.name}: ${finalData.p2.score}`);
			}
		},500)
	}
}

function checkVertical(e){
	let axis = "h"
	let x = parseInt(e[1]);
	let y = parseInt(e[2]);
	let case_2 = `${axis}_${x-1}_${y}`; //upperLeft
	let case_1 = `${e[0]}_${x-1}_${y}`; //upperLine
	let case_3 = `${axis}_${x-1}_${y+1}`; //upperRight
	let mainLine = `${e[0]}_${x}_${y}`; //maineLine
	let case_5 = `${axis}_${x}_${y}`; //bottomLeft
	let case_4 = `${e[0]}_${x+1}_${y}`; //bottomLine
	let case_6 = `${axis}_${x}_${y+1}`; //bottomRight

	let upperLine = document.getElementById(case_1);
	let upperLeft = document.getElementById(case_2);
	let upperRight = document.getElementById(case_3);
	let clickedLine = document.getElementById(mainLine);
	let bottomLine = document.getElementById(case_4);
	let bottomLeft = document.getElementById(case_5);
	let bottomRight = document.getElementById(case_6);

	// Picking Data from Local Storage & updating their key(which player Turn) 
	let updatedData = JSON.parse(window.localStorage.getItem('BoxGameData'))
	
	// console.log(upperLeft,upperLine,upperRight,bottomLeft,bottomLine,bottomRight)
	if( clickedLine.style.background == (upperLeft && upperLeft.style.background) && 
		clickedLine.style.background == (upperLine && upperLine.style.background) && 
		clickedLine.style.background == (upperRight && upperRight.style.background)){
			// alert("Upper Box Grouped")
			// console.log(updatedData.p1.turn);
			updatedData.p1.turn = !(updatedData.p1.turn);
			// console.log(updatedData.p1.turn);
			
			(updatedData.p1.turn)?updatedData.turn="p1":updatedData.turn="p2";
			
			updatedData[updatedData.turn].score += 1;
			// console.log(updatedData)

			document.getElementById("turn").innerHTML = updatedData[updatedData.turn].name + " Turn";
			upperLeft.innerHTML = `<span class="l_style">${updatedData[updatedData.turn].name.charAt(0)}</span>`

			if( clickedLine.style.background == (bottomLeft && bottomLeft.style.background) &&
				clickedLine.style.background == (bottomLine && bottomLine.style.background) &&
				clickedLine.style.background == (bottomRight && bottomRight.style.background)){
					// alert("Bootoom Box Also Grouped")
					updatedData[updatedData.turn].score += 1;				
					bottomLeft.innerHTML = `<span class="l_style">${updatedData[updatedData.turn].name.charAt(0)}</span>`
			}
	}else if( clickedLine.style.background == (bottomLeft && bottomLeft.style.background) &&
		clickedLine.style.background == (bottomLine && bottomLine.style.background) &&
		clickedLine.style.background == (bottomRight && bottomRight.style.background)){
			updatedData.p1.turn = !updatedData.p1.turn;
			(updatedData.p1.turn)?updatedData.turn="p1":updatedData.turn="p2";
			updatedData[updatedData.turn].score += 1;
			
			document.getElementById("turn").innerHTML = updatedData[updatedData.turn].name + " Turn";
			// alert("Bootoom Box Grouped")
			bottomLeft.innerHTML = `<span class="l_style">${updatedData[updatedData.turn].name.charAt(0)}</span>`
			if( clickedLine.style.background == (upperLeft && upperLeft.style.background) && 
				clickedLine.style.background == (upperLine && upperLine.style.background) && 
				clickedLine.style.background == (upperRight && upperRight.style.background)){
					// alert("Upper Box Also Grouped")
					updatedData[updatedData.turn].score += 1;

					document.getElementById("turn").innerHTML = updatedData[updatedData.turn].name + " Turn";
					upperLeft.innerHTML = `<span class="l_style">${updatedData[updatedData.turn].name.charAt(0)}</span>`
			}
	}
	window.localStorage.setItem('BoxGameData',JSON.stringify(updatedData))

}

function checkHorizontal(e){
	let axis = "v"
	let x = parseInt(e[1]);
	let y = parseInt(e[2]);
	let case_2 = `${axis}_${x}_${y-1}`; //upperLeft
	let case_1 = `${e[0]}_${x}_${y-1}`; //sideLeft
	let case_3 = `${axis}_${x+1}_${y-1}`; //bottomLeft
	let mainLine = `${e[0]}_${x}_${y}`; //maineLine
	let case_5 = `${axis}_${x}_${y}`; //topRight
	let case_4 = `${e[0]}_${x}_${y+1}`; //sideRight
	let case_6 = `${axis}_${x+1}_${y}`; //bottomRight

	let sideLeft = document.getElementById(case_1);
	let upperLeft = document.getElementById(case_2);
	let bottomLeft = document.getElementById(case_3);
	let clickedLine = document.getElementById(mainLine);
	let sideRight = document.getElementById(case_4);
	let topRight = document.getElementById(case_5);
	let bottomRight = document.getElementById(case_6);
	
	// Picking Data from Local Storage & updating their key(which player Turn) 
	let updatedData = JSON.parse(window.localStorage.getItem('BoxGameData'))
	// console.log(sideLeft,upperLeft,bottomLeft,clickedLine,sideRight,topRight,bottomRight)
	if(	clickedLine.style.background == (sideLeft && sideLeft.style.background) &&
	 	clickedLine.style.background == (upperLeft && upperLeft.style.background) && 
	 	clickedLine.style.background == (bottomLeft && bottomLeft.style.background)){
		// alert("Left Box Group")
		// console.log(updatedData);
		updatedData.p1.turn = !(updatedData.p1.turn);
		(updatedData.p1.turn)?updatedData.turn="p1":updatedData.turn="p2";
		// console.log(updatedData)
		
		updatedData[updatedData.turn].score += 1;
			
			document.getElementById("turn").innerHTML = updatedData[updatedData.turn].name + " Turn";
		sideLeft.innerHTML = `<span class="l_style">${updatedData[updatedData.turn].name.charAt(0)}</span>`
		if( clickedLine.style.background == (sideRight && sideRight.style.background) &&
		 	clickedLine.style.background == (topRight && topRight.style.background) && 
		 	clickedLine.style.background == (bottomRight && bottomRight.style.background)){
			updatedData[updatedData.turn].score += 1;
				document.getElementById("turn").innerHTML = updatedData[updatedData.turn].name + " Turn";
				clickedLine.innerHTML = `<span class="l_style">${updatedData[updatedData.turn].name.charAt(0)}</span>`
		}
	}else if( clickedLine.style.background == (sideRight && sideRight.style.background) &&
	 	clickedLine.style.background == (topRight && topRight.style.background) && 
	 	clickedLine.style.background == (bottomRight && bottomRight.style.background)){
		// console.log(updatedData)
		updatedData.p1.turn = !updatedData.p1.turn; 
		(updatedData.p1.turn)?updatedData.turn="p1":updatedData.turn="p2";
		// console.log(updatedData)
		// alert("Right Box Group")
		updatedData[updatedData.turn].score += 1;
			
			document.getElementById("turn").innerHTML = updatedData[updatedData.turn].name + " Turn";
			clickedLine.innerHTML = `<span class="l_style">${updatedData[updatedData.turn].name.charAt(0)}</span>`


			if(	clickedLine.style.background == (sideLeft && sideLeft.style.background) &&
			 	clickedLine.style.background == (upperLeft && upperLeft.style.background) && 
			 	clickedLine.style.background == (bottomLeft && bottomLeft.style.background)){
				// alert("Left Box Group")
				updatedData[updatedData.turn].score += 1;	
				// console.log("?")	
				document.getElementById("turn").innerHTML = updatedData[updatedData.turn].name + " Turn";
				sideLeft.innerHTML = `<span class="l_style">${updatedData[updatedData.turn].name.charAt(0)}</span>`
			}
	}
	window.localStorage.setItem('BoxGameData',JSON.stringify(updatedData))
}



