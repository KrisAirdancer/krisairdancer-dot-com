const path = require('path');
const fs = require('fs');
const multer = require('multer')

/***** AUTHENTICATION *****/

// This function prevents non-logged in users from accessing protected pages.
const checkAuthenticated = function(req, res, next) // Next is a function that is called after the user has been authenticated.
{
    if (req.isAuthenticated())
    {
        return next()
    }
    else
    {
        return res.redirect('/admin/admin-login')
    }
}

// This function prevents logged in users from accessing certain pages. Such as the login page.
const checkNotAuthenticated = function(req, res, next)
{
    if (req.isAuthenticated())
    {
        return res.redirect('/admin/home')
    }
    next() // Continue with the call if the user is not authenticated. Allow them to access the page they accessed.
}

/***** POST MANAGEMENT *****/

const editPost = function(req, res, postID)
{
    let blogContent = undefined;

    try
    {
        let blogContentRAW = fs.readFileSync(path.join(__dirname, 'public', 'blog-content', 'posts.json'), 'utf-8');
        blogContent = JSON.parse(blogContentRAW);

        for (let i = 0; i < blogContent.length; i++) // For each year in the blog content.
        {
            let posts = blogContent[i].posts
            for (let j = 0; j < posts.length; j++) // For each post in the current year.
            {
                if (posts[j].id == postID)
                {
                    let post = posts[j]
                    
                    post.title = req.body.title
                    post.content = req.body.content
                    post.author = req.body.author
                    
                    fs.writeFileSync(path.join(__dirname, 'public', 'blog-content', 'posts.json'), JSON.stringify(blogContent));

                    return res.redirect(`/admin/post-editor/${postID}`);
                }
            }
        }
        // If we make it to this point, the postID was not found.
        res.redirect('/404');
    }
    catch(error)
    {
        res.redirect('/404');
    }
}

const deletePost = function(req, res, postID)
{
    let blogContent = undefined;

    try
    {
        let blogContentRAW = fs.readFileSync(path.join(__dirname, 'public', 'blog-content', 'posts.json'), 'utf-8');
        blogContent = JSON.parse(blogContentRAW);

        for (let i = 0; i < blogContent.length; i++) // For each year in the blog content.
        {
            let posts = blogContent[i].posts
            for (let j = 0; j < posts.length; j++)
            {
                if (posts[j].id == postID)
                {
                    posts.splice(j, 1) // Remove the post.
                    
                    if (posts.length == 0) // If the year of the deleted post now has no posts, delete that year.
                    {
                        blogContent.splice(i, 1) // Remove the year.
                    }
                    fs.writeFileSync(path.join(__dirname, 'public', 'blog-content', 'posts.json'), JSON.stringify(blogContent));
                    
                    return res.redirect('/admin/post-manager');
                }
            }
        }
        // If we make it this far, the post wasn't found. 404 - Not Found
        res.redirect('/404');
    }
    catch(error)
    {
        console.log(error)
        res.redirect('/404');
    }
}

const createPost = function(req, res)
{
    let blogContent = undefined;

    try
    {
        let blogContentRAW = fs.readFileSync(path.join(__dirname, 'public', 'blog-content', 'posts.json'), 'utf-8');
        blogContent = JSON.parse(blogContentRAW);
    
        let date = new Date()
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        
        // Get the content list for the current year from the JSON file.
        let currentYearsContent = undefined
        let currentYear = date.getFullYear()
        for (let i = 0; i < blogContent.length; i++) {
            if (blogContent[i].year == currentYear) {
                currentYearsContent = blogContent[i].posts;
                break
            }
        }
        // If the current year doesn't have an entry in the JSON file, make a new entry for it.
        if (!currentYearsContent)
        {
            let newYear = {
                year: currentYear,
                posts: []
            }
    
            blogContent.unshift(newYear)
            currentYearsContent = newYear.posts
        }

        // Generate random ID for new post.
        
        // Get all current IDs
        let currentIDs = new Set()
        for (let i = 0; i < blogContent.length; i++) // For each year in the posts JSON.
        {
            let year = blogContent[i].posts
            for (let j = 0; j < year.length; j++) // For each post in the current year.
            {
                currentIDs.add(year[j].id)
            }
        }

        // Generate a new ID and ensure that it is unique.
        let postID = generateID()
        while (currentIDs.has(postID))
        {
            postID = generateID()
        }

        // Generate the post object.
        let postDate = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
        let newPost = {
            id: `${postID}`,
            date: `${postDate}`,
            title: `${req.body.title}`,
            author: `${req.body.author}`,
            content: `${req.body.content}`
        };
        
        // Insert the post object to the beginning of the current year's JSON (this goes directly into the whole JSON object b/c we have a reference to a subset of the whole JSON object).
        currentYearsContent.unshift(newPost);
    
        fs.writeFileSync(path.join(__dirname, 'public', 'blog-content', 'posts.json'), JSON.stringify(blogContent));
    
        res.redirect('/admin/post-creator');
    }
    catch (error)
    {
        console.log(error)
        res.redirect('/404');
    }
}

const getPostData = function(req, res, postID)
{
    let blogContent = undefined;

    try
    {
        let blogContentRAW = fs.readFileSync(path.join(__dirname, 'public', 'blog-content', 'posts.json'), 'utf-8');
        blogContent = JSON.parse(blogContentRAW);

        for (let i = 0; i < blogContent.length; i++) // For each year in the blog content.
        {
            let posts = blogContent[i].posts
            for (let j = 0; j < posts.length; j++) // For each post in the current year.
            {
                if (posts[j].id == postID)
                {
                    return posts[j]
                }
            }
        }

        return null
    }
    catch(error)
    {
        return null
    }
}

/***** GUESTBOOK MANAGEMENT *****/

const createGuestbookEntry = function(req, res)
{
    let guestbook = undefined;

    try
    {
        let guestbookData = fs.readFileSync(path.join(__dirname, 'public', 'guestbook.json'), 'utf-8');
        guestbook = JSON.parse(guestbookData);
    }
    catch (error)
    {
        res.redirect('/404');
    }

    if (!guestbook)
    {
        res.redirect('/404')
    }

    // Code from here: https://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript
    // Generates a string containing today's date
    Date.prototype.today = function () { 
        // return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
        return (((this.getUTCMonth()+1) < 10)?"0":"") + (this.getUTCMonth()+1) + "/" +((this.getUTCDate() < 10)?"0":"") + this.getUTCDate() + "/" + this.getUTCFullYear();
    }

    // Generates a string containing the current time
    Date.prototype.timeNow = function () {
        return ((this.getUTCHours() < 10)?"0":"") + this.getUTCHours() +":"+ ((this.getUTCMinutes() < 10)?"0":"") + this.getUTCMinutes() +":"+ ((this.getUTCSeconds() < 10)?"0":"") + this.getUTCSeconds();
    }

    let entryDate = new Date();

    // Trim Whitespace

    req.query.handle = req.query.handle.trim();
    req.query.yourWebsite = req.query.yourWebsite.trim();
    req.query.favWebsite = req.query.favWebsite.trim();
    req.query.message = req.query.message.trim();

    // Validate submitted URLs

    if (!req.query.yourWebsite.includes('https://') && !req.query.yourWebsite.includes('http://') && req.query.yourWebsite !== '' && req.query.yourWebsite !== undefined && req.query.yourWebsite !== null)
    {
        req.query.yourWebsite = `https://${req.query.yourWebsite}`;
    }

    if (!req.query.favWebsite.includes('https://') && !req.query.favWebsite.includes('http://') && req.query.favWebsite !== '' && req.query.favWebsite !== undefined && req.query.favWebsite !== null)
    {
        req.query.favWebsite = `https://${req.query.favWebsite}`;
    }

    // Generate Guestbook Entry JSON object

    let guestbookEntry = {
        handle: `${req.query.handle}`,
        yourWebsite: `${req.query.yourWebsite}`,
        favWebsite: `${req.query.favWebsite}`,
        message: `${req.query.message}`,
        timestamp: `${entryDate.today()} ${entryDate.timeNow()}`
    };

    guestbook.push(guestbookEntry);

    fs.writeFileSync(path.join(__dirname, 'public', 'guestbook.json'), JSON.stringify(guestbook));

    res.redirect('/guestbook');
}

/***** OTHER *****/

const alphanumeric = function()
{
    return Array.from(Array(10), () => Math.floor(Math.random() * 36).toString(36)).join('')
}

const generateID = function()
{
    return `${alphanumeric()}-${alphanumeric()}-${alphanumeric()}`
}

const getFileList = function()
{
    let fileList = []
    fs.readdirSync('./public/blog-content/images').forEach(fileName => {
        fileList.push([fileName, fs.statSync(`./public/blog-content/images/${fileName}`).birthtime])
    })
    return fileList
}

const generateFileListHTML = function()
{
    let fileList = getFileList()

    if (fileList.length == 0)
    {
        return "No files were received from the server."
    }

    fileList.sort((file1, file2) => {
        return file2[1] - file1[1]
    }) // Sort by date created (which is the upload date - date created on the server).

    let fileListHTML = ""
    fileList.forEach(file => {
        fileListHTML += `<div class="fileEntry"><img src=\"http://localhost:11001/blog-content/images/${file[0]}\"><p>${file[0]}</p></div>`
    })

    return fileListHTML
}

const generatePostManagementListHTML = function()
{
    let postsJSON = undefined
    try
    {
        postsJSON = JSON.parse(fs.readFileSync('./public/blog-content/posts.json', 'utf8'))
    }
    catch (error)
    {
        return "No posts were received from the server."
    }
    
    if (postsJSON === undefined || postsJSON.length === 0)
    {
        return "No posts were received from the server."
    }
    
    let postManagementListHTML = []

    postsJSON.forEach(year => {
        postManagementListHTML.push(`<p class="yearHeader"><strong>${year.year}</strong></p>`)

        year.posts.forEach(post => {
            let postHTML = `
                <button class="post-card collapsible-button post-card-font" data-postid="${post.id}">
                    <strong>${post.title}</strong>
                    <p>${post.author} - ${post.date}</p>
                </button>

                <div class="postManagementButtons">
                    <form action="http://localhost:11001/admin/post-editor/${post.id}" method="GET">
                        <button class="btn">edit</button>
                    </form>
                    <form action="http://localhost:11001/admin/delete-post/${post.id}?_method=DELETE" method="POST">
                        <button class="btn">delete</button>
                    </form>
                </div>

                <div class="collapsible-content" id="newPostContent">
                    <p class="post-content">${post.content}</p>
                </div>
            `
            postManagementListHTML.push(postHTML)
        })
    })

    return postManagementListHTML.join("")
}

const generatePostListHTML = function()
{
    let postsJSON = undefined
    try
    {
        postsJSON = JSON.parse(fs.readFileSync('./public/blog-content/posts.json', 'utf8'))
    }
    catch (error)
    {
        return "No posts were received from the server."
    }
    
    if (postsJSON === undefined || postsJSON.length === 0)
    {
        return "No posts were received from the server."
    }
    
    let postListHTML = []

    postsJSON.forEach(year => {
        postListHTML.push(`<p class="yearHeader"><strong>${year.year}</strong></p>`)

        year.posts.forEach(post => {
            let postHTML = `
            <button class="post-card collapsible-button post-card-font">
                <strong>${post.title}</strong>
                <p>${post.author} - ${post.date}</p>
            </button>
            
            <div class="collapsible-content" id="newPostContent">
                <p class="post-content">${post.content}</p>
            </div>`
            postListHTML.push(postHTML)
        })
    })

    return postListHTML.join("")
}

/***** CONFIGURING MULTER (file uploads) *****/

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/blog-content/images')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileUpload = multer({ storage: storage })

/***** EXPORTS *****/

module.exports = {
    checkAuthenticated,
    checkNotAuthenticated,
    generateID,
    createPost,
    deletePost,
    createGuestbookEntry,
    editPost,
    getPostData,
    generateFileListHTML,
    generatePostManagementListHTML,
    generatePostListHTML,
    fileUpload
}