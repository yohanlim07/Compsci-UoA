let currentTab = "Home"
window.onload = function () {
         showHome();
      }
function showHome(){
	if (currentTab != "Home"){
		currentTab = "Home";
		showNoTabs();
		document.getElementById("home").style.display = "block";
	}
}

function showCourses(){
	if (currentTab != "Courses"){
		currentTab = "Courses";
		showNoTabs();
		document.getElementById("courses").style.display = "block";
	}
	
	const xhr = new XMLHttpRequest();
	const uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/courses";
	xhr.open("GET", uri, true);
	xhr.onload = function(){
		let JSONobj = JSON.parse(xhr.responseText);
		
		JSONobj.data.sort(function(a, b){
			const courseA = a.catalogNbr;
			const courseB = b.catalogNbr;
			let difference = 0;
			if(courseA > courseB){
				difference = 1;
			}
			else if(courseA < courseB){
				difference = -1;
			}
			return difference;
			});
		
		for(let i = 0; i < JSONobj.data.length; i++){
			let currentCourse = JSONobj.data[i];
			if(currentCourse.catalogNbr != "111G"){
				let newCourse = document.createElement("div");
				newCourse.className = "newCourse";
				
				let courseCodeTitle = document.createElement("p");
				if (currentCourse.catalogNbr == "111"){courseCodeTitle.innerHTML = currentCourse.subject + " " + currentCourse.catalogNbr + "/111G" + " - " + currentCourse.titleLong;}
				else{courseCodeTitle.innerHTML = currentCourse.subject + " " + currentCourse.catalogNbr + " - " + currentCourse.titleLong;}
				newCourse.appendChild(courseCodeTitle);
				
				let coursePoints = document.createElement("span");
				coursePoints.innerHTML = currentCourse.unitsAcadProg + " points"
				newCourse.appendChild(coursePoints);
				
				if (currentCourse.description != undefined){
					let courseDesc = document.createElement("p");
					courseDesc.innerHTML = currentCourse.description;
					courseDesc.className = "courseDesc";
					newCourse.appendChild(courseDesc);
				}
				
				if (currentCourse.rqrmntDescr != undefined && currentCourse.rqrmntDescr != "."){
					let courseReqs = document.createElement("p");
					courseReqs.innerHTML = currentCourse.rqrmntDescr;
					courseReqs.className = "courseReqs";
					newCourse.appendChild(courseReqs);
				}
				
				document.getElementById("courses").appendChild(newCourse);
				newCourse.appendChild(document.createElement("hr"));
			}
		}
	}
	xhr.send(null);
}
	
function showPeople(){
	if (currentTab != "People"){
		currentTab = "People";
		showNoTabs();
	document.getElementById("people").style.display = "block";
	}
	
	const xhr = new XMLHttpRequest();
	const uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/people";
	xhr.open("GET", uri, true);
	xhr.onload = function(){
		let JSONobj = JSON.parse(xhr.responseText);
		for (let i = 0; i < JSONobj.list.length; i++){
			let currentPerson = JSONobj.list[i];
			let newPerson = document.createElement("div");
			newPerson.className = "newPerson";
			
			let staffImage = document.createElement("img");
			if(currentPerson.imageId != undefined){
				staffImage.src = "https://unidirectory.auckland.ac.nz/people/imageraw/" + currentPerson.profileUrl[1] + "/" + currentPerson.imageId + "/small";
			}
			else{
				staffImage.src = "http://redsox.uoa.auckland.ac.nz/ups/logo-115x115.png";
			}
			staffImage.className = "staffImage";
			newPerson.appendChild(staffImage);
			
			
			let staffName = document.createElement("p");
			staffName.innerHTML = currentPerson.names[0];
			staffName.className = "staffName";
			newPerson.appendChild(staffName);
			
			let staffTitle = document.createElement("p");
			staffTitle.innerHTML = currentPerson.jobtitles[0];
			staffTitle.className = "staffTitle";
			newPerson.appendChild(staffTitle);
			
			let staffVCard = document.createElement("a");
			staffVCard.innerHTML = "vCard";
			staffVCard.href = "https://unidirectory.auckland.ac.nz/people/vcard/" + currentPerson.profileUrl[1];
			staffVCard.className = "staffVCard";
			newPerson.appendChild(staffVCard);
			
			let staffEmail = document.createElement("a");
			staffEmail.innerHTML = "Email";
			staffEmail.href = "mailto:" + currentPerson.emailAddresses[0];
			staffEmail.className = "staffEmail";
			newPerson.appendChild(staffEmail);
			
			if(currentPerson.extn != undefined){
				let staffPhone = document.createElement("a");
				staffPhone.innerHTML = "Phone";
				staffPhone.href = "tel:+6493737599," + currentPerson.extn;
				staffPhone.className = "staffPhone";
				newPerson.appendChild(staffPhone);
			}
			
			newPerson.appendChild(document.createElement("hr"));
			document.getElementById("people").appendChild(newPerson);
			
		}
	}
	xhr.send(null);
}

function showNews(){
	if (currentTab != "News"){
		currentTab = "News";
		showNoTabs();
		document.getElementById("news").style.display = "block";
	}
	
	const xhr = new XMLHttpRequest();
	const uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/news";
	xhr.open("GET", uri, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.onload = function(){
		let JSONobj = JSON.parse(xhr.responseText);
		for(let i = 0; i < JSONobj.length; i++){
			let currentNews = JSONobj[i];
			let newNews = document.createElement("div");
			newNews.className = "newNews";
			
			let newsTitle = document.createElement("a");
			newsTitle.innerHTML = currentNews.titleField;
			newsTitle.href = currentNews.linkField;
			newsTitle.className = "newsTitle";
			newNews.appendChild(newsTitle);
			
			let newsDesc = document.createElement("p");
			newsDesc.innerHTML = currentNews.descriptionField;
			newsDesc.className = "newsDesc";
			newNews.appendChild(newsDesc);
			
			let newsDate = document.createElement("p");
			newsDate.innerHTML = "Posted: " + currentNews.pubDateField;
			newsDate.className = "newsDate";
			newNews.appendChild(newsDate);
			
			newNews.appendChild(document.createElement("hr"));
			document.getElementById("news").appendChild(newNews);
			
		}
	}
	xhr.send(null);
}

function showNotices(){
	if (currentTab != "Notices"){
		currentTab = "Notices";
		showNoTabs();
		document.getElementById("notices").style.display = "block";
	}
	
	const xhr = new XMLHttpRequest();
	const uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/notices";
	xhr.open("GET", uri, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.onload = function(){
		let JSONobj = JSON.parse(xhr.responseText);
		for(let i = 0; i < JSONobj.length; i++){
			let currentNotice = JSONobj[i];
			let newNotice = document.createElement("div");
			
			let noticeTitle = document.createElement("a");
			noticeTitle.innerHTML = currentNotice.titleField;
			noticeTitle.href = currentNotice.linkField;
			noticeTitle.className = "noticeTitle";
			newNotice.appendChild(noticeTitle);
			
			let noticeDesc = document.createElement("p");
			noticeDesc.innerHTML = currentNotice.descriptionField;
			noticeDesc.className = "noticeDesc";
			newNotice.appendChild(noticeDesc);
			
			let noticeDate = document.createElement("p");
			noticeDate.innerHTML = "Posted: " + currentNotice.pubDateField;
			noticeDate.className = "noticeDate";
			newNotice.appendChild(noticeDate);
			
			newNotice.appendChild(document.createElement("hr"));
			document.getElementById("notices").appendChild(newNotice);
		}
			
	}
	xhr.send(null);
}

function showGuestBook(){
	if (currentTab != "Guest Book"){
		currentTab = "Guest Book";
		showNoTabs();
		document.getElementById("guestbook").style.display = "block";
	}
}

function postComment(){
	let name = document.getElementById("GBname").value;
	let comment = document.getElementById("GBcomment").value;
	xhr = new XMLHttpRequest();
	let uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/comment?name=" + name;
	xhr.open("POST", uri, true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onload = function () {
		document.getElementById("GBname").value = "";
		document.getElementById("GBcomment").value = "";
	}
	xhr.send("\"" +comment+ "\""); 
}

function showNoTabs(){
	document.getElementById("home").style.display="none";
	document.getElementById("courses").style.display="none";
	document.getElementById("people").style.display="none";
	document.getElementById("news").style.display="none";
	document.getElementById("notices").style.display="none";
	document.getElementById("guestbook").style.display="none";
}
