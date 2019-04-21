const shoppingCartContent=document.querySelector('#cart-content tbody');
const courses=document.querySelector('#courses-list');
const clearCartBtn=document.querySelector('#clear-cart');

function eventListener(){
	courses.addEventListener('click',buyCourse);
	document.addEventListener('DOMContentLoaded',getFromStorage);
	clearCartBtn.addEventListener('click',removeAll);
	shoppingCartContent.addEventListener('click',removeCourse);
}
eventListener();


function buyCourse(e){
	e.preventDefault();
	if(e.target.classList.contains('add-to-cart')){
		const course=e.target.parentElement.parentElement;
		getCourseInfo(course);
	}
}
function getCourseInfo(course){
	courseInfo={
		img:course.querySelector('img').src,
		title:course.querySelector('h4').textContent,
		price:course.querySelector('span').textContent,
		id:course.querySelector('a').getAttribute('data-id')
	}
	addIntoCart(courseInfo);
	saveIntoStorage(courseInfo);
}
function addIntoCart(course){
	const row=document.createElement('tr');
	row.innerHTML=`
		<tr>
			<td>
				<img src="${course.img}" width="100">
			</td>
			<td>${course.title}</td>
			<td>${course.price}</td>
			<td>
				<a href="#" class="remove" data-id="${course.id}">X</a>
			</td>
		</tr>	
	`;
	shoppingCartContent.appendChild(row);
}
function saveIntoStorage(course){
	const courses=getCoursesFromStorage();
	courses.push(course);
	localStorage.setItem('courses',JSON.stringify(courses));
}
function getCoursesFromStorage(){
	let courses;
	if(localStorage.getItem('courses')===null){
		courses=[];
	}else{
		courses=JSON.parse(localStorage.getItem('courses'));
	}
	return courses
}
function getFromStorage(){
	const courses = getCoursesFromStorage();
	courses.forEach(course=>{
		const row=document.createElement('tr');
		row.innerHTML=`
			<tr>
				<td>
					<img src="${course.img}" width="100">
				</td>
				<td>${course.title}</td>
				<td>${course.price}</td>
				<td>
					<a href="#" class="remove" data-id="${course.id}">X</a>
				</td>
			</tr>	
		`;
		shoppingCartContent.appendChild(row);
	})

}
function removeAll(){
	while(shoppingCartContent.firstChild){
		shoppingCartContent.firstChild.remove();
	}
	localStorage.clear();
}
function removeCourse(e){
	e.preventDefault();
	if(e.target.classList.contains('remove')){
		e.target.parentElement.parentElement.remove();
		const course=e.target;
		removeCourseFromStorage(course);
	}
}
function removeCourseFromStorage(course){
	const courses = getCoursesFromStorage();
	courses.forEach((data,index)=>{
		if(data.id===course.getAttribute('data-id')){
			courses.splice(index,1);
		}
	})
	localStorage.setItem('courses',JSON.stringify(courses));
}