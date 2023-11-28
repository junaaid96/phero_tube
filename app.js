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

//showing courses in UI
showCoursesUI = (courses) => {
    coursesDiv.innerHTML = "";
    courses.length > 0
        ? courses.forEach((course) => {
            const courseDiv = document.createElement("div");
            courseDiv.innerHTML = `
            <img src=${course.thumbnail} alt=${course.title} style="width: 20rem; height: 15rem;"/>
            <div class="course-info">
                <img src=${course.authors[0].profile_picture} alt=${course.authors[0].profile_name} style="width: 3rem; height: 3rem; border-radius: 50%;"/>
                <h3>${course.title}</h3>
            </div>
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