// button load
const loadButton = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json();
    const cetagory = data.data;

    // dynamic button 
    const buttonContainer = document.getElementById('dynamic-button');
    cetagory.forEach(element => {
        const div = document.createElement('div');
        // console.log(element.category_id)
        div.innerHTML =`<button onclick= laodCard(${element.category_id}) class="btn btn-ghost bg-slate-300 focus:bg-red-600 focus-within:text-white ">
        ${element.category}</button>`;
        buttonContainer.appendChild(div);
    });

}

// load card
const laodCard = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const cardData = data.data;
    console.log(cardData);
    // id collect
    const cardContainer = document.getElementById('card-container');
    const errorContainer = document.getElementById('error-container');
    const sortButton1 = document.getElementById('sort1');
    const sortButton2 = document.getElementById('sort2');
    cardContainer.innerHTML = '';

    if(cardData.length == 0){
        
        errorContainer.innerHTML = `       
        <div class="flex  justify-center items-center mt-28 ">
        <div class=" mx-auto text-center">
           <div class="mb-6 w-44 mx-auto">
           <img class="w-full" src="images/icon.png" alt="" />
           </div>
           <div>
           <h2 class="font-bold text-5xl">Oops!! Sorry, <br> There is no content here</h2>
           </div>
        </div>
        </div>`;
    }else{
        errorContainer.innerHTML = '';
    }

    cardData.forEach(i => {
        const div = document.createElement('div');
        let time = ``;
        if(i.others.posted_date){
            const sec = parseFloat(i.others.posted_date);
            let hours   = Math.floor(sec / 3600); // get hours
            let minutes = Math.floor((sec - (hours * 3600)) / 60);
            time = `
            <div class="flex justify-end -mt-12">
                <div>
                    <P class="bg-black text-white text-[10px] rounded py-1 px-2 end-0">${hours} hrs ${minutes} min ago<p/>
                </div>
            </div>
            `;

        }           
        div.innerHTML = `
        <div id="card" class="card card-compact bg-base-100 shadow-xl w-80 my-10 ">
          <figure class="w-80 h-[200px]">
            <img class="w-full h-full" src="${i.thumbnail}" />
          </figure>
          <div class="card-body">
          ${time}
            <div class="flex gap-4 items-start mt-5">
              <div class="avatar">
                <div class="w-10 rounded-full">
                  <img src="${i.authors[0].profile_picture}"/>
                </div>
              </div>

              <div>
                <h2 class="text-base font-bold mb-2">${i.title}</h2>
                <div class="flex gap-2 mb-2">
                  <div class="text-sm font-normal">
                    ${i?.authors[0].profile_name}
                  </div>
                  <div clas>
                    ${i.authors[0].verified ? '<img src="./images/verified.png" class="w-5 h-5" alt="" />' : ""}         
                  </div>
                </div>

                <p class='mb-2 text-sm font-normal'><span>${i.others.views}</span> views</p>
              </div>
            </div>
          </div>
        </div>
        `;
        cardContainer.appendChild(div);
    })

    const sortCard = () =>{
        cardContainer.innerHTML='';
        const sorted = data.data.sort((a, b) => parseFloat(b.others.views) - parseFloat(a.others.views));
        sorted.forEach(i => {
            const div = document.createElement('div');
            let time = ``;
            if(i.others.posted_date){
                const sec = parseFloat(i.others.posted_date);
                let hours   = Math.floor(sec / 3600); // get hours
                let minutes = Math.floor((sec - (hours * 3600)) / 60);
                time = `
                <div class="flex justify-end -mt-12">
                    <div>
                        <P class="bg-black text-white text-[10px] rounded py-1 px-2 end-0">${hours} hrs ${minutes} min ago<p/>
                    </div>
                </div>
                `;

            }           
            div.innerHTML = `
            <div id="card" class="card card-compact bg-base-100 shadow-xl w-80 my-10 ">
            <figure class="w-80 h-[200px]">
                <img class="w-full h-full" src="${i.thumbnail}" />
            </figure>
            <div class="card-body">
            ${time}
                <div class="flex gap-4 items-start mt-5">
                <div class="avatar">
                    <div class="w-10 rounded-full">
                    <img src="${i.authors[0].profile_picture}"/>
                    </div>
                </div>

                <div>
                    <h2 class="text-base font-bold mb-2">${i.title}</h2>
                    <div class="flex gap-2 mb-2">
                    <div class="text-sm font-normal">
                        ${i?.authors[0].profile_name}
                    </div>
                    <div clas>
                        ${i.authors[0].verified ? '<img src="./images/verified.png" class="w-5 h-5" alt="" />' : ""}         
                    </div>
                    </div>

                    <p class='mb-2 text-sm font-normal'><span>${i.others.views}</span> views</p>
                </div>
                </div>
            </div>
            </div>
        `   ;
            cardContainer.appendChild(div);
        })
    
    }
    sortButton2.addEventListener('click', sortCard);
    sortButton1.addEventListener('click', sortCard);




}

const blogButton = () => {
    window.location.href = './blog.html';
}
addEventListener




loadButton();
laodCard(1000);