function LocaLocalStorage(){
	return localStorage;
}
function LoadKeyLocalStorage(key){
	return localStorage.getItem(key);
}
function SetValueForKeyLocalStorage(key, value){
	return localStorage.setItem(key, value);
}
function UserLogin(username, password){
	let user = LoadList("user", false)[0];
	
	if(!user) return 1;

	for(const _user of user){
		if(_user.username === username && _user.password === password){
			SetValueForKeyLocalStorage("username", username);
			let list = LoadList("list")[0]
			check = 0
			if(list){
				check = 1
				for(const _do of list){
					if(_do.username == username){
						check = 2
					}
				}
			}
			if(check == 2){
				temp = list
			}else if(check == 1){
				list.push({"username":username, "LIST_todo":[], "LIST_done":[]})
				temp = list
			}else{
				temp = [{"username":username, "LIST_todo":[], "LIST_done":[]}]
			}
			SetValueForKeyLocalStorage("list", data2json2base(temp))
			LoadElementList()
			return 3;
		}
	}
	return 2;
}
function UserRegister(username, password){

	let user = LoadKeyLocalStorage("user");
	if(user){
		user = base2json2data(user);
		for(const _user of user){
			if(_user.username == username){
				return 1;
			}
		}
	}else{
		user = [];
	}

	user.push({"username": username, "password": password})

	SetValueForKeyLocalStorage("user", data2json2base(user));
	return 3;
}
function getusername(){
	let username = LoadKeyLocalStorage("username");
	if(!username){
		return '';
	}

	return username;
}

function LoadList(key, user = true){

	let list = LoadKeyLocalStorage(key);
	let username = getusername();
	if(user){
		if(!username){
			return [{}, username]
		}
	}
	if(!list){
		list = []
	}else{
		list = base2json2data(list)
	}
	return [list, username]

}



function AddTodoList(name){
	let list = LoadList("list");
	if(!list[1]){
		return false
	}
	for(i = 0; i < list[0].length; i++){
		if(list[0][i]?.username == list[1]){
			list[0][i]["LIST_todo"].push(
				{"ToDo":name, "date":now_date()}
			)
		}
	}
	SetValueForKeyLocalStorage("list",data2json2base(list[0]))
	return true
}

function AddDoneList(name){
	let list = LoadList("list");
	if(!list[1]){
		return false
	}
	for(i = 0; i < list[0].length; i++){
		if(list[0][i]?.username == list[1]){
			list[0][i]["LIST_done"].push(
				{"Done":name, "date":now_date()}
			)
		}
	}
	// list = btoa(encodeURIComponent(JSON.stringify(list[0])))
	SetValueForKeyLocalStorage("list",data2json2base(list[0]))
	return true
}

/**********************************************************************/

function LoadTodoList(){
	let list = LoadList("list")
	let temp = []
	if(list[0]){
		for(i = 0; i < list[0].length; i++){
			if(list[0][i]?.username == list[1]){
				return list[0][i]["LIST_todo"]
			}
		}
		return temp
	}
	return []
}

function LoadDoneList(){
	let list = LoadList("list")
	let temp = []
	if(list[0]){
		for(i = 0; i < list[0].length; i++){
			if(list[0][i]?.username == list[1]){
				return list[0][i]["LIST_done"]
			}
		}
		return temp
	}
	return []
}

/**********************************************************************/

function movelist(target, name, date){
	test = find_list(target, name, date)
	SetValueForKeyLocalStorage("list", data2json2base(test))
	if(target == 'todo'){
		AddDoneList(name)
	}else if(target == 'done'){
		AddTodoList(name)
	}else{
		alert('잘못된 리스트 Move 이벤트가 발생 했습니다.')
		return
	}
	LoadElementList()
}

function find_list(target, name, date){
	let list = LoadList("list")
	let username = getusername();

	let key = `LIST_${target}`
	if(target == 'todo'){
		_name = 'ToDo'
	}else{
		_name = 'Done'
	}

	for(i = 0; i < list[0].length; i++){
		if(list[0][i].username == username){
			for(j = 0; j < list[0][i][key].length; j++){
				if(list[0][i][key][j][_name] == name && list[0][i][key][j].date == date){
					console.log(list[0][i][key])
					list[0][i][key].splice(j,1)
					console.log(list[0][i][key])
					return list[0]
				}
			}
		}
	}

	return list[0]
}

function now_date(){
	let year = new Date();
	return year.toLocaleString();
}

function clears(){
	localStorage.removeItem("username")
	localStorage.removeItem("user")
	localStorage.removeItem("list")
	LoadElementList()
	clear()
}

/**********************************************************************/

function data2json2base(value){
	return btoa(
		encodeURIComponent(
			JSON.stringify(
				value
			)
		)
	).replaceAll("=","")
}
function base2json2data(value){
	return JSON.parse(
			decodeURIComponent(
			atob(
				value
			)
		)
	)
}