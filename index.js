const body = document.body;
const inp = document.querySelector('#inp')
const btn = document.querySelector('#btn')
const form = document.querySelector('#form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
})

btn.addEventListener('click', ()=> {
    post(inp.value)
    inp.value = ''
})
async function get() {
  try {
    const adres = await fetch("https://jsonplaceholder.typicode.com/todos");
    const format = await adres.json();
    console.log(format);
    for (let i = 0; i < format.length; i++) {
      const items = format[i];
      const inp = document.createElement('input')
      inp.type = 'checkbox'
      inp.checked = items.completed
      const div = document.createElement("div");
      div.append(items.id, items.title, items.completed);
      div.prepend(inp)
      body.append(div);

      inp.addEventListener('click', ()=> {
        path(items.id, items.completed)
      })
    }
  } catch (error) {
    console.log(error);
  }
}

async function post(text) {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos = await res.json();
    const user = todos [todos.length - 1].userId + 1
   

    
    const zapros = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        userId: user,
        title: text,
        completed: false,
      }),
      headers: { "Content-type": "application/json" },
    });
    const formatPost = await zapros.json();
    console.log(formatPost);
  } catch (error) {
    console.log(error);
  }
}

async function path(id, completed){
    try {
        const zapros = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                completed: !completed
            }),
            headers: {'Content-type': 'application/json'}
        })
        const formatPatch = await zapros.json()
        console.log(formatPatch);
    } catch (error) {
       console.log(error); 
    }
}

async function delet(id){
    try {
        await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE'
        })
        console.log('удален');
    } catch (error) {
       console.log(error); 
    }
}

get();
delet()