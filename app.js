const categoriesDiv = document.getElementById("categories");
const coursesDiv = document.getElementById("courses");

//fetching categories from API
const getCategories = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await res.json();
    showCategories(data.data);
};

//showing categories in UI
showCategories = (categories) => {
    categories.forEach((category) => {
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
            <button id=${category.category_id}>${category.category}</button>
        `;
        categoriesDiv.appendChild(categoryDiv);
    });
};

getCategories();

//showing courses based on category
const showCourses = async (categoryid) => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${categoryid}`
    );
    const data = await res.json();
    showCoursesUI(data.data);
};

//convert posted time to minutes and hours ago


//showing courses in UI
showCoursesUI = (courses) => {
    coursesDiv.innerHTML = "";
    courses.length > 0
        ? courses.forEach((course) => {
            const courseDiv = document.createElement("div");
            courseDiv.innerHTML = `
            <p class="posted-date">${(course.others.posted_date / 3600).toFixed(2)} hrs ago</p>
            <img src=${course.thumbnail} alt=${course.title
                } class="course-thumbnail"/>
            <div class="course-info">
                <img src=${course.authors[0].profile_picture} alt=${course.authors[0].profile_name
                } class="author-img"/>
                <div>
                    <h3>${course.title}</h3>
                    <div class="author-info">
                        <div class="author-name">
                            <p>${course.authors[0].profile_name}</p>
                            <p class="verified">${course.authors[0].verified ? "✔" : ""
                }</p>
                        </div>
                        <p class="views">${course.others.views} views</p>
                    </div>
                </div>
            </div>
            <div></div>
        `;
            coursesDiv.appendChild(courseDiv);
        })
        : (coursesDiv.innerHTML = `
            <div class="not-available">
                <img src="images/not-available.png" alt="not-available"/>
                <h1>Oops!! Sorry, There is no content here</h1>
            </div>
            `);
};

//event listener for categories
categoriesDiv.addEventListener("click", (event) => {
    const categoryid = event.target.id;
    if (categoryid != "categories") {
        showCourses(categoryid);
    }
    //changing bg color of selected button
    const selectedCategory = document.getElementById(categoryid);
    if (selectedCategory.id != "categories") {
        selectedCategory.style.backgroundColor = "#ff1f3d";
        selectedCategory.style.color = "#fff";
    }
    //resetting unselected button bg color
    const notSelectedCategory = document.querySelectorAll("button");
    notSelectedCategory.forEach((category) => {
        if (category.id != categoryid) {
            category.style.backgroundColor = "#f1f1f1";
            category.style.color = "#000";
        }
    });
});

//by default showing all courses
showCourses(1000);

//sorting courses by views
const sortCourses = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/videos/category/1000"
    );
    const data = await res.json();
    console.log(data.data);
    const sortedCourses = data.data.sort((a, b) => parseInt(b.others.views) - parseFloat(a.others.views)
    );
    showCoursesUI(sortedCourses);
};
