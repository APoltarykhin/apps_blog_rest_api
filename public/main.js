
let postsId = null;

async function getPosts() {
    let res = await fetch('https://php-api.local/posts');
    let data = await res.json();



    const postsContainer = document.getElementById('posts-container');


    postsContainer.innerHTML = '';

    data.forEach((post) => {
        const postCard = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.description}</p>
                        <p class="card-text">${post.text}</p>
                        <a href="#" class="btn btn-primary" onclick="selectPost('${post.id}','${post.title}','${post.description}','${encodeURIComponent(post.text)}')">Изменить</a>
                        <a href="#" class="btn btn-primary" onclick="deletePost(${post.id})">Удалить</a>
                        
                    </div>
                </div>
            </div>`
        ;
        postsContainer.innerHTML += postCard; // Добавляем карточку в контейнер
    });
}


async function addPost(){
    const title = document.getElementById('inputTitle').value;
    const description = document.getElementById('inputDescription').value;
    const text = document.getElementById('inputText').value;

    let formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('text', text);



    const res = await fetch('https://php-api.local/posts', {
        method: 'POST',
        body: formData
    });

    const data = await res.json();

    if (data.status === true){
        await getPosts();
    }

}

async function deletePost(id){
    const res = await fetch(`https://php-api.local/posts/${id}`,{
        method: 'DELETE'
    })

    const data = await res.json();

    if(data.status === true){
        await getPosts();
    }

}


function selectPost(id,title,description,text) {

    const decodedText = decodeURIComponent(text);

    postsId = id;


    document.getElementById('selectTitle').value = title;
    document.getElementById('selectDescription').value = description;
    document.getElementById('selectText').value = decodedText;

}


async function updatePost() {


    const title = document.getElementById('selectTitle').value,
            description = document.getElementById('selectDescription').value,
            text = document.getElementById('selectText').value;

    const data = {
        title: title,
        description: description,
        text: text
    };

    const res = await fetch(`https://php-api.local/posts/${postsId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
        });

    const resData = await res.json();

    if (resData.status === true){
        await getPosts();
    }
}

getPosts();