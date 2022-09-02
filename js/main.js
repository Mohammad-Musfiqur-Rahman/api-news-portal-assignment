// console.log('connected')

const newApi = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data.news_category);
    displayCategoryMenu(data.data.news_category);
}

const displayCategoryMenu = categories =>{
    const categoryUl = document.getElementById('catogory-ul');
    for(let category of categories){
        // console.log(category);
        const li = document.createElement('li');
        li.classList.add('nav-item', 'm-3');
        li.innerHTML=`
        <a class="nav-link active fs-5" aria-current="page" href="#" onclick="categoryApi(${category ? category.category_id : 'no data found'})">${category.category_name}</a>
        `
        categoryUl.appendChild(li);

    }
}

const categoryApi = async(category_id) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(category_id , data.data[0]);
    // console.log(category_id , url);
    categoryPost(data.data);
}

const categoryPost = (posts) =>{
    
    const displayCard = document.getElementById('display-card');    
    displayCard.textContent = '';
    for(let post of posts){
        // console.log(post)
        const div = document.createElement('div');
        div.classList.add('row', 'g-4');
        div.innerHTML=`
          <div class="col-md-4">
            <img src="${post.image_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.details.substring(0, 350) + '.....'}</p>
              <img style="height: 40px;" src="${post.author.img}" class="rounded-circle float-start" alt="..."><p class="card-text"><small class="text-muted">${post.author.name}</small></p>
              <div class="text-end">  
                
                <a class="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggle" role="button">More Details</a>
              </div> 
              <p class="text-center">View: ${post ? post.total_view : 'no data found' }</p>
                
              </div>
          </div>
        `
        displayCard.appendChild(div)
        const postFound = document.getElementById('news-found');
        postFound.innerText = posts.length;
    }
}


const modalApi = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
}

const showModal = () => {
     
  
}





modalApi();




newApi();