// console.log('connected')

const newApi = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try{
      const res = await fetch(url);
      const data = await res.json();
      // console.log(data.data.news_category);
      displayCategoryMenu(data.data.news_category);
    }
    catch(error){
      console.log(error)
    }
    
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
              <button onclick="showModal('${post._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">More details</button>
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


const modalApi = async(news_id) =>{
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    showModal(data.data)
    // console.log(data.data)
}

const showModal = (modals) => {
     const modalArea = document.getElementById('modal-div');     
     console.log(modals);

     const div = document.createElement('div');
     div.classList.add('modal-content');
     div.innerHTML=`
     <div class="modal-header">
     <h5 class="modal-title" id="exampleModalLabel">${modals[0].title}</h5>
     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
   </div>
   <div class="modal-body">
     ${modals[0].details}
   </div>
   <img style="height: 40px; width: 50px;" src="${modals[0].author.img}" class="rounded-circle float-start" alt="..."><p class="card-text"><small class="text-muted">${modals[0].author.name}</small></p>
   <p class="text-center">View: ${modals[0].author ? modals[0].author.published_date : 'no data found' }</p>
   <div class="modal-footer">   
     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
   </div>
     `
   modalArea.appendChild(div);


    // for(let modal of modals){
    //   console.log(modal)
    // }
     
    //  modals.forEach(modal => {
    //   console.log(modal, modals);      
    //  });

}
// showModal();

modalApi('0282e0e58a5c404fbd15261f11c2ab6a');
newApi();