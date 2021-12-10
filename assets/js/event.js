function UserStorage(role){
	if(role == "login"){
		// Login event
		FormLoginUserName = document.getElementsByClassName("login_username")[0]
		FormLoginPassWord = document.getElementsByClassName("login_password")[0]

		status = UserLogin(
			FormLoginUserName.value,
			FormLoginPassWord.value
		)

		FormLoginUserName.value = ''
		FormLoginPassWord.value = ''

		if(status == 3){
			LoadElementTodoList()
			alert('성공적으로 로그인이 되었습니다.')
		}else if(status == 2){
			alert('존재하지 않는 유저입니다.')
		}else{
			alert('알 수 없는 에러가 발생했습니다.')
		}

	}else if(role == "register"){
		// register event
		FormRegisterUserName = document.getElementsByClassName("register_username")[0]
		FormRegisterPassWord = document.getElementsByClassName("register_password")[0]

		status = UserRegister(
			FormRegisterUserName.value,
			FormRegisterPassWord.value
		)

		FormRegisterUserName.value = ''
		FormRegisterPassWord.value = ''

		if(status == 3){
			alert('성공적으로 가입이 되었습니다. 로그인을 해주세요.')
		}else{
			alert('이미 존재하는 유저입니다.')
		}


	}else{
		// not found role
	}
	return false
}
function LoadElementList(){
	todo_box = document.getElementsByClassName("todo")[0];
	done_box = document.getElementsByClassName("done")[0];
	todo_box.innerHTML = '';
	done_box.innerHTML = '';
	LoadElementTodoList()
	LoadElementDoneList()
}
function LoadElementTodoList(){
	list = LoadTodoList()
	add_todo_box = document.getElementsByClassName("todo")[0];
	if(list){
		for(const Todo of list){
			add_todo_box.innerHTML += `<div class="list-box">
				<p>${Todo.ToDo}</p>
 				<span>${Todo.date}</span><br>
 				<button class="btn clear" onclick="movelist('todo','${Todo.ToDo}','${Todo.date}')">완료</button><br>
 				<button class="btn remove" onclick="removelist('todo','${Todo.ToDo}', '${Todo.date}')">삭제</button>
 			</div>
 			`
		}
	}
}
function LoadElementDoneList(){
	list = LoadDoneList()
	add_done_box = document.getElementsByClassName("done")[0];
	if(list){
		for(const Done of list){
			add_done_box.innerHTML += `<div class="list-box">
				<p>${Done.Done}</p>
 				<span>${Done.date}</span><br>
 				<button class="btn clear" onclick="movelist('done','${Done.Done}', '${Done.date}')">ToDo로 이동</button><br>
 				<button class="btn remove" onclick="removelist('done','${Done.Done}', '${Done.date}')">삭제</button>
 			</div>
 			`
		}
	}

}

function listadd(){
	if(getusername() == ''){
		alert('로그인 해주세요!')
		return
	}
	addinput = document.getElementsByClassName("add_input")[0];
	if(addinput.value != ''){
		AddTodoList(addinput.value);
		addinput.value = ''
		LoadElementList()
	}else{
		alert('값이 비어 있습니다!')
	}
}

function removelist(target, name, date){
	SetValueForKeyLocalStorage("list", data2json2base(find_list(target, name, date)))
	LoadElementList()
}

document.addEventListener('keydown', function(e){
  	const keyCode = e.keyCode;
  	if(keyCode == 13){ // Enter key
  		if(document.getElementsByClassName("add_input")[0].value != ''){
  	  		document.getElementsByClassName("add_bth")[0].click()
  	  	}
  	}
})